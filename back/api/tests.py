from django.test import TestCase, Client
from api.models import User, Teacher, Student, Classroom


class TeacherTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="admin", password="root")
        Teacher.objects.create(
            user=User.objects.get(username="admin"),
            first_name="sully",
            last_name="lebg",
            gender="Homme",
        )

    def test_database(self):
        teacher = Teacher.objects.get(user__username="admin")
        self.assertIsInstance(teacher, Teacher)
        self.assertEqual(str(teacher), "admin")

    def test_api_register(self):
        c = Client()
        response = c.post(
            path="/teacher/register/",
            data={
                "user": {"username": "boubounou", "password": "pass"},
                "first_name": "toto",
                "last_name": "tata",
                "gender": "Femme",
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

    def test_api_login(self):
        self.test_api_register()
        c = Client()
        response = c.post(
            path="/teacher/login/", data={"username": "boubounou", "password": "pass"}
        )
        print(response)
        self.assertEqual(response.status_code, 200)


class StudentTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="student", password="root")
        User.objects.create(username="admin", password="root")
        Teacher.objects.create(user=User.objects.get(username="admin"))
        Classroom.objects.create(
            room_id=666, teacher=Teacher.objects.get(user__username="admin")
        )
        Student.objects.create(
            user=User.objects.get(username="student"),
            classroom=Classroom.objects.get(room_id=666),
        )

    def test_database_Teacher(self):
        student = Student.objects.get(user__username="student")
        self.assertIsInstance(student, Student)
        self.assertEqual(str(student), "student")


# class StudentTestCase(TestCase):
#     def setUp(self):
#         Student.objects.create(username='Sullivan')

#     def test_assert_username(self):
#         sullivan = Student.objects.get(username="Sullivan")
#         self.assertEqual(str(sullivan), "Sullivan")

# class TeacherTestCase(TestCase):
#     def setUp(self):
#         Teacher.objects.create(username='Sullivan')

#     def test_assert_username(self):
#         sullivan = Teacher.objects.get(username="Sullivan")
#         self.assertEqual(str(sullivan), "Sullivan")

# class ExerciseTestCase(TestCase):
#     def setUp(self):
#         Exercise.objects.create(statement='Fonction carré',
#             solution="def f(x):\n   return x**2", test_input="[0, 1, 2, 3, 4, 5]",
#             correct_output="[0, 1, 4, 9, 16, 25]")
#         Exercise.objects.create(statement='Fonction cube',
#             solution="def f(x):\n   return 2*x**3\n", test_input="[0, 1, 2, 3, 4, 5]",
#             correct_output="[0, 1, 8, 27, 64, 125]")

#     def test_assert_exercise(self):
#         exercise1 = Exercise.objects.get(statement='Fonction carré')
#         self.assertEqual(str(exercise1), 'Fonction carré')
#         self.assertEqual(exercise1.run(), "[0, 1, 4, 9, 16, 25]\n")
#         self.assertEqual(exercise1.check_sol(exercise1.run()), True)
#         exercise2 = Exercise.objects.get(statement='Fonction cube')
#         self.assertNotEqual(exercise2.run(), "[0, 1, 8, 27, 64, 125]\n")
#         self.assertEqual(exercise2.check_sol(exercise2.run()), False)
