from django.db import models
import os
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    username = models.CharField(null=True, blank=True, max_length = 255, unique=True)
    password = models.CharField(null=True, blank=True, max_length = 255)

    REQUIRED_FIELD = []


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user.username


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user.username


class Exercise(models.Model):
    """ Exercise composed of the statement (in markdown) and the solution 
    (in Python) written by the teacher. The test_input set  (defined by 
    the teacher) and the correct_output which is the output expected after 
    execution of the correct solution on test_input."""
    statement = models.TextField(null=True)
    solution = models.TextField(null=True)
    test_input = models.CharField(null=True, max_length = 255)
    correct_output = models.TextField(null=True)

    def __str__(self) -> str:
        return self.statement

class Classroom(models.Model):
    """ A classroom is identified by its primary key (room_id). 
    A class is created by a teacher and joined by several students. 
    It also consists of several exercises."""
    room_id = models.IntegerField(null=True, default=None)
    students = models.ForeignKey(Student, on_delete=models.CASCADE, default=[], related_name="students_on_classroom")
    subjects = models.ForeignKey(Exercise, on_delete=models.PROTECT, default=[], related_name="subjects_of_classroom")

    def __str__(self) -> str:
        return self.room_id


class Solution(models.Model):
    """ A solution is associated with an exercise and a student. 
    It contains the code submitted by a Student (source). Output 
    is the source output in JSON. """
    exercise = models.OneToOneField(Exercise, on_delete=models.PROTECT, default=None, related_name="exercise_done")
    source = models.TextField(null=True)
    output = models.TextField(null=True)
    student = models.OneToOneField(Student, on_delete=models.PROTECT, default=None, related_name="student_submit")

    def __str__(self) -> str:
        return self.source
