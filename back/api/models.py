import os, sys, subprocess

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class User(AbstractUser):
    username = models.CharField(blank=False, max_length=255, unique=True)
    password = models.CharField(blank=False, max_length=255)

    class Role(models.TextChoices):
        INACTIVE = "INACTIVE", "Inactive"
        STUDENT = "STUDENT", "Student"
        TEACHER = "TEACHER", "Teacher"

    base_role = Role.INACTIVE
    role = models.CharField(max_length=8, choices=Role.choices, default=Role.INACTIVE)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
            return super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.username


# =========== TEACHER ===========


class TeacherManager(BaseUserManager):
    """Personalized manager for user type Teacher"""

    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.TEACHER)


class Teacher(User):
    """user type Teacher"""

    base_role = User.Role.TEACHER
    objects = TeacherManager()

    class Meta:
        proxy = True


class TeacherProfile(models.Model):
    """Profile of user type Teacher"""

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="teacher_profile"
    )
    first_name = models.CharField(blank=False, max_length=255)
    last_name = models.CharField(blank=False, max_length=255)

    class Gender(models.TextChoices):
        F = "Femme"
        M = "Homme"

    gender = models.CharField(max_length=5, choices=Gender.choices)

    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


# =========== CLASSROOM ===========


class Classroom(models.Model):
    """A classroom is identified by its primary key (room_id).
    A class is created by a teacher and joined by several students.
    It also consists of several exercises."""

    room_id = models.IntegerField(primary_key=True)
    teacher = models.ForeignKey(
        Teacher, on_delete=models.PROTECT, related_name="teacher_of_the_classroom"
    )

    def __str__(self) -> str:
        return f"classroom {self.room_id}"


# =========== EXERCISE ===========


class Exercise(models.Model):
    """Exercise composed of the statement (in markdown) and the solution
    (in Python) written by the teacher. The test_input set  (defined by
    the teacher) and the correct_output which is the output expected after
    execution of the correct solution on test_input."""

    statement = models.TextField(null=True)
    solution = models.TextField(null=True)
    test_input = models.CharField(null=True, max_length=255)
    correct_output = models.TextField(null=True)
    classroom = models.ForeignKey(
        Classroom, on_delete=models.CASCADE, related_name="subjects_of_classroom"
    )

    def __str__(self) -> str:
        return self.statement


# =========== STUDENT ===========


class StudentManager(BaseUserManager):
    """Personalized manager for user type Student"""

    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.STUDENT)


class Student(User):
    """user type Student"""

    base_role = User.Role.STUDENT
    objects = StudentManager()

    class Meta:
        proxy = True


class StudentProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="student_profile"
    )
    classroom = models.ForeignKey(
        Classroom, on_delete=models.CASCADE, related_name="students_on_classroom"
    )

    def __str__(self):
        return self.user.username


# =========== SOLUTION ===========


class Solution(models.Model):
    """A solution is associated with an exercise and a student.
    It contains the code submitted by a Student (source). Output
    is the source output in JSON."""

    exercise = models.ForeignKey(
        Exercise, on_delete=models.CASCADE, default=None, related_name="exercise_done"
    )
    source = models.TextField(null=True)
    student = models.ForeignKey(
        Student, on_delete=models.PROTECT, default=None, related_name="student_submit"
    )

    def run(self):
        with open("test_file.py", "w") as f:
            f.write(self.source + "\n")
            f.write("test_input = " + self.exercise.test_input + "\n")
            f.write("correct_output = " + self.exercise.correct_output + "\n")
            f.write("output, test = [], 0\n")
            f.write("for input in test_input:\n")
            f.write("   output.append(f(input))\n")
            f.write("print(output)")
        result = subprocess.run(
            ["python", "test_file.py"], capture_output=True, text=True
        )
        test_output = result.stdout
        test_errors = result.stderr
        os.remove("test_file.py")

        return test_output, test_errors

    def check_sol(self, test_output):
        return test_output == self.exercise.correct_output + "\n"

    def __str__(self) -> str:
        return self.source
