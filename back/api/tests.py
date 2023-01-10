from django.test import TestCase, Client
from api.models import (
    User,
    Teacher,
    TeacherProfile,
    Student,
    StudentProfile,
    Classroom,
    Exercise,
    Solution,
)


class TeacherTestCase(TestCase):
    def setUp(self):
        Teacher.objects.create(username="admin", password="root")
        TeacherProfile.objects.create(
            user=User.objects.get(username="admin"),
            first_name="sully",
            last_name="lebg",
            gender="Homme",
        )

    def test_database_Teacher(self):
        teacher = Teacher.objects.get(username="admin")
        teacher_profile = TeacherProfile.objects.get(user__username="admin")
        self.assertIsInstance(teacher, Teacher)
        self.assertIsInstance(teacher_profile, TeacherProfile)
        self.assertEqual(str(teacher), "admin")
        self.assertEqual(teacher_profile.first_name, "sully")
        self.assertEqual(teacher_profile.last_name, "lebg")

    def test_api_Teacher_login(self):
        c = Client()
        response = c.post(
            "/teacher/register/",
            {
                "username": "sully",
                "password": "sully",
                "teacher_profile": {
                    "first_name": "sully",
                    "last_name": "lebg",
                    "gender": "Femme",
                },
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        response = c.post(
            "/login/",
            {"username": "sully", "password": "sully"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)


class StudentTestCase(TestCase):
    def setUp(self):
        Teacher.objects.create(username="teacher", password="root")
        Student.objects.create(username="student", password="osef")
        TeacherProfile.objects.create(
            user=User.objects.get(username="teacher"),
            first_name="sully",
            last_name="lebg",
            gender="Homme",
        )
        Classroom.objects.create(
            room_id=666, teacher=Teacher.objects.get(username="teacher")
        )
        StudentProfile.objects.create(
            user=User.objects.get(username="student"),
            classroom=Classroom.objects.get(room_id=666),
        )

    def test_database_Student(self):
        teacher = Teacher.objects.get(username="teacher")
        student = Student.objects.get(username="student")
        student_profile = StudentProfile.objects.get(user__username="student")
        self.assertIsInstance(student, Student)
        self.assertEqual(str(student), "student")
        self.assertEqual(student_profile.classroom.room_id, 666)
        self.assertEqual(student_profile.classroom.teacher, teacher)

    def test_api_Student(self):
        c = Client()
        response = c.post(
            "/student/register/",
            {
                "username": "toto",
                "student_profile": {"classroom": "666"},
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        response = c.post(
            "/login/",
            {"username": "toto", "password": "666"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)


class RoomTestCase(TestCase):
    def setUp(self):
        teacher = Teacher.objects.create(username="admin", password="root")
        teacher_profile = TeacherProfile.objects.create(
            user=teacher,
            first_name="sully",
            last_name="lebg",
            gender="Homme",
        )
        Classroom.objects.create(room_id=666, teacher=teacher)

    def test_database_Classroom(self):
        room = Classroom.objects.get(room_id=666)
        self.assertIsInstance(room, Classroom)
        self.assertEqual(room.room_id, 666)

    def test_api_Classroom_create_fetch_delete(self):
        c = Client()
        c.post(
            "/teacher/register/",
            {
                "username": "sully",
                "password": "sully",
                "teacher_profile": {
                    "first_name": "sully",
                    "last_name": "lebg",
                    "gender": "Femme",
                },
            },
            content_type="application/json",
        )
        c.post("/login/", {"username": "sully", "password": "sully"})
        teacher_id = Teacher.objects.get(username="sully").id
        response = c.post(
            "/room/create/",
            {"room_id": 999, "teacher": teacher_id},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        response = c.get("/room/?id=999")
        self.assertEqual(response.status_code, 200)
        response = c.post("/room/delete/", {"id": 999}, content_type="application/json")
        self.assertEqual(response.status_code, 200)


class ExerciseTestCase(TestCase):
    def setUp(self):
        teacher = Teacher.objects.create(username="admin", password="root")
        TeacherProfile
        TeacherProfile.objects.create(
            user=teacher,
            first_name="lina",
            last_name="theblg",
            gender="Femme",
        )
        room = Classroom.objects.create(room_id=77, teacher=teacher)
        Exercise.objects.create(
            statement="Fonction carrée",
            solution="def f(x):\n return x**2",
            test_input="[0, 1, 2, 3, 4, 5]",
            correct_output="[0, 1, 8, 27, 64, 125]",
            classroom=room,
        )

    def test_database_Exercise(self):
        exercise = Exercise.objects.get(statement="Fonction carrée")
        self.assertIsInstance(exercise, Exercise)
        self.assertEqual(str(exercise), "Fonction carrée")

    def test_api_Exercise_create_fetch_delete(self):
        c = Client()
        c.post(
            "/teacher/register/",
            {
                "username": "help",
                "password": "please",
                "teacher_profile": {
                    "first_name": "help",
                    "last_name": "help",
                    "gender": "Femme",
                },
            },
            content_type="application/json",
        )
        c.post("/login/", {"username": "help", "password": "please"})
        teacher_id = Teacher.objects.get(username="help").id
        c.post(
            "/room/create/",
            {"room_id": 85, "teacher": teacher_id},
            content_type="application/json",
        )
        response = c.post(
            "/exercise/create/",
            {
                "statement": "Fonction double",
                "solution": "def f(x):\n return 2*x",
                "test_input": "[0, 1, 2, 3, 4, 5]",
                "correct_output": "[0, 2, 4, 6, 8, 10]",
                "classroom": 85,
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        response = c.post(
            "/exercise/",
            {"statement": "Fonction double"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        response = c.post(
            "/exercise/delete/",
            {"statement": "Fonction double"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)


class SolutionTestCase(TestCase):
    def setUp(self):
        teacher = Teacher.objects.create(username="admin", password="root")
        student = Student.objects.create(username="saveme", password="78")
        teacher_profile = TeacherProfile.objects.create(
            user=teacher,
            first_name="lina",
            last_name="theblg",
            gender="Femme",
        )
        room = Classroom.objects.create(room_id=78, teacher=teacher)
        StudentProfile.objects.create(user=student, classroom=room)
        exercise = Exercise.objects.create(
            statement="Fonction carrée",
            solution="def f(x):\n return x**2",
            test_input="[0, 1, 2, 3, 4, 5]",
            correct_output="[0, 1, 4, 9, 16, 25]",
            classroom=room,
        )
        Solution.objects.create(
            student=student,
            exercise=exercise,
            output="[0, 1, 8, 27, 64, 125]",
            source="def f(x):\n return x**2",
        )

    def test_database_Solution(self):
        solution = Solution.objects.get(source="def f(x):\n return x**2")
        self.assertIsInstance(solution, Solution)
        self.assertEqual(str(solution), "def f(x):\n return x**2")

    def test_model_Solution(self):
        solution = Solution.objects.get(source="def f(x):\n return x**2")
        self.assertEqual(solution.run()[0], "[0, 1, 4, 9, 16, 25]\n")
        self.assertEqual(solution.check_sol(solution.run()[0]), True)

    def test_api_Solution_create_delete(self):
        c = Client()
        c.post(
            "/teacher/register/",
            {
                "username": "help",
                "password": "please",
                "teacher_profile": {
                    "first_name": "help",
                    "last_name": "help",
                    "gender": "Femme",
                },
            },
            content_type="application/json",
        )
        c.post("/login/", {"username": "help", "password": "please"})
        teacher_id = Teacher.objects.get(username="help").id
        c.post(
            "/room/create/",
            {"room_id": 44, "teacher": teacher_id},
            content_type="application/json",
        )
        c.post(
            "/exercise/create/",
            {
                "statement": "Fonction double",
                "solution": "def f(x):\n return 2*x",
                "test_input": "[0, 1, 2, 3, 4, 5]",
                "correct_output": "[0, 2, 4, 6, 8, 10]",
                "classroom": 44,
            },
            content_type="application/json",
        )
        exercise_id = Exercise.objects.get(statement="Fonction double").id
        c.get("/logout/", content_type="application/json")
        c.post(
            "/student/register/",
            {"username": "hi", "password": "44", "student_profile": {"classroom": 44}},
            content_type="application/json",
        )
        student_id = Student.objects.get(username="hi").id
        c.post("/login/", {"username": "hi", "password": "44"})
        response = c.post(
            "/solution/create/",
            {
                "student": student_id,
                "exercise": exercise_id,
                "output": "[0, 2, 4, 6, 8, 10]",
                "source": "def f(x):\n return 2*x",
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        response = c.post(
            "/solution/delete/",
            {"source": "def f(x):\n return 2*x"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
