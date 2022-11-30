from django.db import models
import os
import subprocess

# Create your models here.

"""Lina s'occupe de l'authentification et des classes Student et Teacher
ici Member peut être un Student ou un Teacher"""

class Member(models.Model):
    username = models.CharField(null=True, blank=True, max_length = 255)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.username[0:50]

class Exercise(models.Model):
    """ Exercise composed of the statement (in markdown) and the solution 
    (in Python) written by the teacher. The test_input set  (defined by 
    the teacher) and the correct_output which is the output expected after 
    execution of the correct solution on test_input."""
    statement = models.TextField(null=True)
    solution = models.TextField(null=True)
    test_input = models.CharField(null=True, max_length = 255)
    correct_output = models.TextField(null=True)

    def run(self):
        with open('test_file.py', 'w') as f:
            f.write(self.solution + "\n")
            f.write("test_input = "+ self.test_input + "\n")
            f.write("output, test = [], 0\n")
            f.write("for input in test_input:\n")
            f.write("   output.append(f(input))\n")
            f.write("print(output)")
        os.system("python3 test_file.py > answer.txt")
        with open("answer.txt", 'r') as out:
            test_output = out.read()
        os.remove("test_file.py")
        os.remove("answer.txt")
        return test_output

    def check_sol(self, test_output):
        return test_output == self.correct_output+"\n"

    def __str__(self) -> str:
        return self.statement

class Classroom(models.Model):
    """ A classroom is identified by its primary key (room_id). 
    A class is created by a teacher and joined by several students. 
    It also consists of several exercises."""
    room_id = models.IntegerField(null=True, default=None)
    teacher = models.ForeignKey(Member, on_delete=models.PROTECT, default=None, related_name="teacher_admin")
    students = models.ForeignKey(Member, on_delete=models.CASCADE, default=[], related_name="students_on_classroom")
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
    student = models.OneToOneField(Member, on_delete=models.PROTECT, default=None, related_name="student_submit")

    def __str__(self) -> str:
        return self.source
