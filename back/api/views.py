import jwt
import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.views import TokenObtainPairView

from api.models import User, Teacher, Student, Classroom, Exercise, Solution
from api.serializers import (
    MyTokenObtainPairSerializer,
    TeacherSerializer,
    StudentSerializer,
    ClassroomSerializer,
    ExerciseSerializer,
    SolutionSerializer,
)
from api.decorators import authenticated
from uQuizz.settings import TOKEN_EXPIRATION_TIME


@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            "Endpoint": "teacher/register/",
            "method": "POST",
            "description": "To register",
            "Format of the request:": {
                "username": "<your username>",
                "password": "<your pass>",
                "teacher_profile": {
                    "first_name": "<your first name>",
                    "last_name": "<your last name>",
                    "gender": "<Homme ou Femme>",
                },
            },
        },
        {
            "Endpoint": "/teacher/login/",
            "method": "POST",
            "description": "To login",
            "Format of the request:": {
                "username": "<your username>",
                "password": "<your pass>",
            },
        },
        {"Endpoint": "/teacher/", "method": "GET", "description": "get users"},
        {
            "Endpoint": "student/register/",
            "method": "POST",
            "description": "To register",
            "Format of the request:": {
                "username": "<your username>",
                "student_profile": {"classroom": "<your room_id>"},
            },
        },
        {
            "Endpoint": "/student/login/",
            "method": "POST",
            "description": "To login",
            "Format of the request:": {
                "username": "<your username>",
                "password": "<your room_id>",
            },
        },
        {"Endpoint": "/student/", "method": "GET", "description": "get student"},
        {
            "Endpoint": "/room/create/",
            "method": "POST",
            "description": "To create a room (as a teacher)",
            "Format of the request:": {
                "room_id": "<the room_id>",
                "teacher": "<the teacher id>",
            },
        },
        {
            "Endpoint": "/room/?id=<room_id>",
            "method": "GET",
            "description": "To see a room",
        },
        {
            "Endpoint": "/allrooms/",
            "method": "GET",
            "description": "To see all rooms",
        },
        {
            "Endpoint": "/room/delete/",
            "method": "POST",
            "description": "To delete a room",
            "Format of the request:": {"id": "<the room_id>"},
        },
        {
            "Endpoint": "/exercise/create/",
            "method": "POST",
            "description": "To create an exercise",
            "Format of the request:": {
                "statement": "<the statement>",
                "solution": "<the solution>",
                "test_input": "<the test input>",
                "correct_output": "<the correct output>",
                "classroom": "<the room_id>",
            },
        },
        {
            "Endpoint": "/exercise/",
            "method": "GET",
            "description": "To see all exercises as a teacher",
        },
        {
            "Endpoint": "/exercise/delete/",
            "method": "POST",
            "description": "To delete an exercise",
            "Format of the request:": {"statement": "<the statement>"},
        },
        {
            "Endpoint": "/solution/create/",
            "method": "POST",
            "description": "To create a solution as a student",
            "Format of the request:": {
                "student": "id",
                "exercise": "id",
                "source": "<the source>",
            },
        },
        {
            "Endpoint": "/solution/delete/",
            "method": "POST",
            "description": "To delete a solution",
            "Format of the request:": {"source": "<the source>"},
        },
    ]
    return Response(routes)


# =========== AUTHENTIFICATION ===========


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# =========== TEACHER ===========


class TeacherRegisterView(APIView):
    def post(self, request):
        serializer = TeacherSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class TeacherLoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        try:
            teacher = Teacher.objects.get(user__username=username)
        except ObjectDoesNotExist:
            raise AuthenticationFailed("User not found")
        if not teacher.user.check_password(password):
            raise AuthenticationFailed("Incorrect password")
        playload = {
            "id": teacher.user.id,
            "user_type": "teacher",
            "exp": datetime.datetime.utcnow() + TOKEN_EXPIRATION_TIME,
            "iat": datetime.datetime.utcnow(),
        }
        token = jwt.encode(playload, "secret", algorithm="HS256")
        response = Response()
        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {"jwt": token}
        return response


@permission_classes([IsAuthenticated])
class TeacherView(APIView):
    def get(self, request):
        user = request.user
        if user.role == User.Role.TEACHER:
            serializer = TeacherSerializer(user)
            return Response(serializer.data)
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        response = Response()
        user = request.user
        if user.role == User.Role.TEACHER:
            try:
                my_user = Teacher.objects.get(id=request.data["user_id"])
                serializer = TeacherSerializer(my_user)
                response.data = serializer.data
            except ObjectDoesNotExist:
                response.data = {"message": "No teacher found"}
            return response
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


# =========== STUDENT ===========


class StudentRegisterView(APIView):
    def post(self, request):
        student = StudentSerializer(data=request.data)
        student.is_valid(raise_exception=True)
        student.save()
        return Response(student.data)


class StudentLoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        try:
            student = Student.objects.get(user__username=username)
        except ObjectDoesNotExist:
            raise AuthenticationFailed("User not found")
        if not student.user.check_password(password):
            raise AuthenticationFailed("Incorrect password")
        playload = {
            "id": student.user.id,
            "user_type": "student",
            "exp": datetime.datetime.utcnow() + TOKEN_EXPIRATION_TIME,
            "iat": datetime.datetime.utcnow(),
        }
        token = jwt.encode(playload, "secret", algorithm="HS256")
        response = Response()
        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {"jwt": token}
        return response


@permission_classes([IsAuthenticated])
class StudentView(APIView):
    def get(self, request):
        user = request.user
        if user.role == User.Role.STUDENT:
            serializer = StudentSerializer(user)
            return Response(serializer.data)
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


# =========== CLASSROOM ===========


@permission_classes([IsAuthenticated])
class RoomCreateView(APIView):
    def post(self, request):
        user = request.user
        if user.role == User.Role.TEACHER:
            serializer = ClassroomSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
class RoomView(APIView):
    def get(self, request):
        user = request.user
        if user.role == User.Role.TEACHER:
            room_id = self.request.query_params.get("id")
            room = Classroom.objects.get(room_id=room_id)
            serializer = ClassroomSerializer(room)
            return Response(serializer.data)
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
class AllRoomView(APIView):
    def get(self, request):
        user = request.user
        if user.role == User.Role.TEACHER:
            response = []
            try:
                rooms = Classroom.objects.all()
                for room in rooms:
                    response.append(ClassroomSerializer(room).data)
            except ObjectDoesNotExist:
                response.append({"message": "No room found"})
            return Response(response)
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
class RoomDeleteView(APIView):
    def post(self, request):
        user = request.user
        if user.role == User.Role.TEACHER:
            response = Response()
            Classroom.objects.get(room_id=request.data["id"]).delete()
            response.data = {"message": "success"}
            return response
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


# =========== EXERCISE ===========


@permission_classes([IsAuthenticated])
class ExerciseCreateView(APIView):
    def post(self, request):
        user = request.user
        if user.role == User.Role.TEACHER:
            serializer = ExerciseSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
class ExerciseView(APIView):
    def post(self, request):
        user = request.user
        if user.role == User.Role.TEACHER or user.role == User.Role.STUDENT:
            response = []
            try:
                exo = list(Exercise.objects.filter(classroom=request.data["classroom"]))
                for exercise in exo:
                    response.append(ExerciseSerializer(exercise).data)
            except ObjectDoesNotExist:
                response.append({"message": "No exercise found"})
            return Response(response)
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)

    def get(selt, request):
        user = request.user
        if user.role == User.Role.TEACHER:
            response = []
            try:
                exo = Exercise.objects.all()
                for exercise in exo:
                    response.append(ExerciseSerializer(exercise).data)
            except ObjectDoesNotExist:
                response.append({"message": "No exercise found"})
            return Response(response)
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
class ExerciseDeleteView(APIView):
    def post(self, request):
        user = request.user
        if user.role == User.Role.TEACHER:
            response = Response()
            try:
                Exercise.objects.get(id=request.data["exo_id"]).delete()
                response.data = {"message": "success"}
            except ObjectDoesNotExist:
                response.data = {"message": "No exercise found"}
            return response
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
class ExerciseUpdateView(APIView):
    def post(self, request):
        user = request.user
        if user.role == User.Role.TEACHER:
            response = Response()
            try:
                exercise = Exercise.objects.get(id=request.data["exo_id"])
                exercise.statement = request.data["statement"]
                exercise.solution = request.data["solution"]
                exercise.test_input = request.data["test_input"]
                exercise.correct_output = request.data["correct_output"]
                exercise.classroom = Classroom.objects.get(
                    room_id=request.data["classroom"]
                )
                exercise.save()
                response.data = {"message": "success"}
            except ObjectDoesNotExist:
                response.data = {"message": "No exercise found"}
            return response
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


# =========== SOLUTION ===========


@permission_classes([IsAuthenticated])
class SolutionCreateView(APIView):
    def post(self, request):
        user = request.user
        if user.role == User.Role.STUDENT:
            serializer = SolutionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            solution = (
                Solution.objects.filter(source=request.data["source"])
                .filter(exercise=request.data["exercise"])
                .first()
            )
            test_output, test_error = solution.run()
            isTrue = solution.check_sol(test_output)
            return Response([test_output, test_error, isTrue])
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
class SolutionDeleteView(APIView):
    def post(self, request):
        user = request.user
        if user.role == User.Role.STUDENT:
            response = Response()
            try:
                Solution.objects.filter(source=request.data["source"]).delete()
                response.data = {"message": "success"}
            except ObjectDoesNotExist:
                response.data = {"message": "No solution found"}
            return response
        content = {"detail": "Type d'utilisateur non autorisé"}
        return Response(content, status=status.HTTP_401_UNAUTHORIZED)
