from django.test import TestCase, Client
from api.models import User, Teacher, Student, Classroom, Exercise


class TeacherTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="admin", password="root")
        Teacher.objects.create(
            user=User.objects.get(username="admin"),
            first_name="sully",
            last_name="lebg",
            gender="Homme",
        )

    def test_database_Teacher(self):
        teacher = Teacher.objects.get(user__username="admin")
        self.assertIsInstance(teacher, Teacher)
        self.assertEqual(str(teacher), "admin")

    def test_api_Teacher_login(self):
        c = Client()
        response = c.post(
            "/teacher/register/",
            {
                "user": {"username": "bibo", "password": "pass"},
                "first_name": "toto",
                "last_name": "tata",
                "gender": "Femme",
            },
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        response = c.post(
            "/teacher/login/",
            {
                "username": "bibo", 
                "password": "pass"
            }
        )
        self.assertEqual(response.status_code, 200)


class StudentTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="teacher", password="root")
        User.objects.create(username="student", password="osef")
        Teacher.objects.create(
            user=User.objects.get(username="teacher"),
            first_name="sully",
            last_name="lebg",
            gender="Homme",
        )
        Classroom.objects.create(
            room_id=666, teacher=Teacher.objects.get(user__username="teacher")
        )
        Student.objects.create(
            user=User.objects.get(username="student"),
            classroom=Classroom.objects.get(room_id=666),
        )

    def test_database_Student(self):
        student = Student.objects.get(user__username="student")
        self.assertIsInstance(student, Student)
        self.assertEqual(str(student), "student")

    def test_api_Student(self):
        c = Client()
        response = c.post(
            "/student/register/",
            {
                "user": {"username": "chouchou", "password": "osef"},
                "classroom": "666"
            },
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        response = c.post(
            "/student/login/",
            {
                "username": "chouchou",
                "password": "666"
            },
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        response = c.get(
            "/student/",
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        response = c.get(
            "/logout/",
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)


class RoomTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="admin", password="root")
        teacher = Teacher.objects.create(
            user=User.objects.get(username="admin"),
            first_name="sully",
            last_name="lebg",
            gender="Homme",
        )
        Classroom.objects.create(
            room_id = 666,
            teacher = teacher
        )

    def test_database_Classroom(self):
        room = Classroom.objects.get(room_id=666)
        self.assertIsInstance(room, Classroom)
        self.assertEqual(str(room), "666")

    def test_api_Classroom_create_fetch_delete(self):
        c = Client()
        c.post(
            "/teacher/register/",
            {
                "user": {"username": "bibo", "password": "pass"}, 
                "first_name": "toto", 
                "last_name": "tata", 
                "gender": "Femme"
            },
            content_type="application/json"
        )
        c.post(
            "/teacher/login/",
            {"username": "bibo", "password": "pass"}
        )
        response = c.post(
            "/room/create/", 
            {
                "room_id":999,
                "teacher":1
            }, 
            content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response = c.get(
            "/room/?id=999"
        )
        self.assertEqual(response.status_code, 200)
        response = c.post(
            "/room/delete/", 
            {
                "id":999
            }, 
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)


class ExerciseTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="admin", password="root")
        teacher = Teacher.objects.create(
            user=User.objects.get(username="admin"),
            first_name="lina",
            last_name="theblg",
            gender="Femme",
        )
        room = Classroom.objects.create(
            room_id = 79,
            teacher = teacher
        )
        Exercise.objects.create(
            statement = "Fontion carrée",
            solution = "def f(x):\n return x**2",
            test_input = "[0, 1, 2, 3, 4, 5]", 
            correct_output = "[0, 1, 8, 27, 64, 125]",
            classroom = room
        )

    def test_database_Exercise(self):
        exercise = Exercise.objects.get(statement="Fonction carrée")
        self.assertIsInstance(exercise, Exercise)
        self.assertEqual(str(exercise), "Fonction carrée")

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

