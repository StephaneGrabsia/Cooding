import os

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(blank=False, max_length=255, unique=True)
    password = models.CharField(blank=False, max_length=255)

    REQUIRED_FIELD = []


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
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


class Classroom(models.Model):
    """A classroom is identified by its primary key (room_id).
    A class is created by a teacher and joined by several students.
    It also consists of several exercises."""

    room_id = models.IntegerField(null=True, default=None)
    teacher = models.ForeignKey(
        Teacher, on_delete=models.PROTECT, related_name="teacher_of_the_classroom"
    )

    def __str__(self) -> str:
        return self.room_id


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    classroom = models.ForeignKey(
        Classroom, on_delete=models.CASCADE, related_name="students_on_classroom"
    )

    def __str__(self):
        return self.user.username


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
        Classroom, on_delete=models.PROTECT, related_name="subjects_of_classroom"
    )

    def __str__(self) -> str:
        return self.statement


class Solution(models.Model):
    """A solution is associated with an exercise and a student.
    It contains the code submitted by a Student (source). Output
    is the source output in JSON."""

    exercise = models.OneToOneField(
        Exercise, on_delete=models.PROTECT, default=None, related_name="exercise_done"
    )
    source = models.TextField(null=True)
    output = models.TextField(null=True)
    student = models.OneToOneField(
        Student, on_delete=models.PROTECT, default=None, related_name="student_submit"
    )

    def run(self):
        with open("test_file.py", "w") as f:
            f.write(self.solution + "\n")
            f.write("test_input = " + self.test_input + "\n")
            f.write("output, test = [], 0\n")
            f.write("for input in test_input:\n")
            f.write("   output.append(f(input))\n")
            f.write("print(output)")
        os.system("python3 test_file.py > answer.txt")
        with open("answer.txt", "r") as out:
            test_output = out.read()
        os.remove("test_file.py")
        os.remove("answer.txt")
        return test_output

    def check_sol(self, test_output):
        return test_output == self.correct_output + "\n"

    def __str__(self) -> str:
        return self.source
