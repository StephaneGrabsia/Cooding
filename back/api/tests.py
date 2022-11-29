from django.test import TestCase
from api.models import *
import os

# Create your tests here.
class MemberTestCase(TestCase):
    def setUp(self):
        Member.objects.create(username='Sullivan')

    def test_assert_username(self):
        sullivan = Member.objects.get(username="Sullivan")
        self.assertEqual(str(sullivan), "Sullivan")

class ExerciseTestCase(TestCase):
    def setUp(self):
        Exercise.objects.create(subject='Fonction carré', 
            solution="def f(x):\n   return x**2", test_input="[0, 1, 2, 3, 4, 5]", 
            correct_output="[0, 1, 4, 9, 16, 25]")
        Exercise.objects.create(subject='Fonction cube', 
            solution="def f(x):\n   return x**2\n", test_input="[0, 1, 2, 3, 4, 5]", 
            correct_output="[0, 1, 8, 27, 1, 125]")
    
    def test_assert_exercise(self):
        exercise1 = Exercise.objects.get(subject='Fonction carré')
        self.assertEqual(str(exercise1), 'Fonction carré')
        self.assertEqual(os.system("python3 test_file.py"), "True")