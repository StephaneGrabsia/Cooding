from django.db import models
import os

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
    """ Exerices composé de l'énoncé, de la solution écrite par le professeur,
    des test à lancer (défini par le professeur) et des output de sortie qu'il
    doit ressortir (pas forcément défini par le professeur)"""
    subject = models.CharField(null=True, max_length = 255)
    solution = models.CharField(null=True, max_length = 255)
    test_input = models.CharField(null=True, max_length = 255)
    correct_output = models.CharField(null=True, max_length = 255)

    def test_solution(self):
        with open('test_file.py', 'w') as f:
            f.write(self.solution + "\n")
            f.write("test_input "+ self.test_input + "\n")
            f.write("correct_output =" + self.correct_output + "\n")
            f.write("output, test = True, 0\n")
            f.write("while(test< len(test_input) and output):\n")
            f.write("   if f(test) != correct_output[test]:\n")
            f.write("       output = False\n")
            f.write("   test += 1\n")
            f.write("print(output)")
        return os.system("python3 test_file.py")


    def __str__(self) -> str:
        return self.subject

class Classroom(models.Model):
    """ Une classroom est identifiée par sa clé primaire (room_id) et de l'url
    vers la salle (room_url). Une classe est crée par un Teacher et rejoint par
    plusieurs students. Elle est aussi composée de plusieurs exercices."""
    room_id = models.IntegerField(null=True, default=None)
    room_url = models.URLField(null=True, default=None)
    teacher = models.OneToOneField(Member, on_delete=models.PROTECT, default=None, related_name="teacher_admin")
    students = models.ForeignKey(Member, on_delete=models.CASCADE, default=[], related_name="students_on_classroom")
    subjects = models.ForeignKey(Exercise, on_delete=models.PROTECT, default=[], related_name="subjects_of_classroom")

    def __str__(self) -> str:
        return self.room_id


class Solution(models.Model):
    """ Une solution est associé à un exercice et un élève. Elle comporte le code soumis
    par un Student (source). Output est la sortie de source en JSON"""
    exercise = models.OneToOneField(Exercise, on_delete=models.PROTECT, default=None, related_name="exercise_done")
    source = models.CharField(null=True, max_length = 255, default=None)
    output = models.CharField(null=True, max_length = 255, default=None)
    student = models.OneToOneField(Member, on_delete=models.PROTECT, default=None, related_name="student_submit")

    def __str__(self) -> str:
        return self.source
