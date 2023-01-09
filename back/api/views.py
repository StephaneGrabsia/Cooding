import jwt
import datetime

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from django.core.exceptions import ObjectDoesNotExist

from api.models import Teacher, Student, Classroom, Exercise, Solution
from api.serializers import TeacherSerializer, StudentSerializer, RoomSerializer, ExerciseSerializer, SolutionSerializer
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
                "user": {"username": "<your username>", "password": "<your pass>"},
                "first_name": "<your first name>",
                "last_name": "<your last name>",
                "gender": "<Homme ou Femme>"
            },
        },
        {
            "Endpoint": "/teacher/login/",
            "method": "POST",
            "description": "To login",
            "Format of the request:": {
                "username": "<your username>",
                "password": "<your pass>"
            },
        },
        {"Endpoint": "/teacher/", "method": "GET", "description": "get users"},
                {
            "Endpoint": "student/register/",
            "method": "POST",
            "description": "To register",
            "Format of the request:": {
                "user": {"username": "<your username>", "password": "<your room_id>"},
                "classroom": "<your room_id>"
            },
        },
        {
            "Endpoint": "/student/login/",
            "method": "POST",
            "description": "To login",
            "Format of the request:": {
                "username": "<your username>",
                "password": "<your room_id>"
            },
        },
        {"Endpoint": "/student/", "method": "GET", "description": "get users"},
        {"Endpoint": "/logout/", "method": "GET", "description": "To logout"},
        {
            "Endpoint": "/room/create/",
            "method": "POST",
            "description": "To create a room (as a teacher)",
            "Format of the request:": {
                "room_id": "<the room_id>",
                "teacher": "<the teacher id>"
            },
        },
        {
            "Endpoint": "/room/?id=<room_id>",
            "method": "GET",
            "description": "To see a room",
        },
        {
            "Endpoint": "/room/delete/",
            "method": "POST",
            "description": "To delete a room",
            "Format of the request:": {
                "id": "<the room_id>"
            },
        },
        {
            "Endpoint": "/exercise/create/",
            "method": "POST",
            "description": "To create an exercise",
            "Format of the request:": {
                "statement": "<the statement>",
                "solution":"<the solution>",
                "test_input": "<the test input>",
                "correct_output" : "<the correct output>",
                "classroom" : "<the room_id>"
            },
        },         
        {
            "Endpoint": "/exercise/",
            "method": "POST",
            "description": "To see an exercise",
            "Format of the request:": {
                "statement": "<the statement>"
            },
        },
        {
            "Endpoint": "/exercise/delete/",
            "method": "POST",
            "description": "To delete an exercise",
            "Format of the request:": {
                "statement": "<the statement>"
            },

        },
        {
            "Endpoint": "/solution/create/",
            "method": "POST",
            "description": "To create a solution as a student",
            "Format of the request:": {
                "student": "id",
                "exercise":"id",
                "output": "<your output>",
                "source" : "<the source>"
            },

        },        
        {
            "Endpoint": "/solution/delete/",
            "method": "POST",
            "description": "To delete a solution",
            "Format of the request:": {
                "source": "<the source>"
            },

        }
    ]
    return Response(routes)


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


class TeacherView(APIView):
    @authenticated(user_type="teacher")
    def get(self, request, auth_id):
        teacher = Teacher.objects.get(user__id=auth_id)
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)

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

class  StudentView(APIView):
    @authenticated(user_type="student")
    def get(self, request, auth_id):
        student = Student.objects.get(user__id=auth_id)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

class LogoutView(APIView):
    def get(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"message": "success"}
        return response

class RoomCreateView(APIView):
    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class RoomView(APIView):
    @authenticated(user_type="teacher")
    def get(self, request, auth_id):
        room_id = self.request.query_params.get('id')
        print(room_id)
        room = Classroom.objects.get(room_id=room_id)
        serializer = RoomSerializer(room)
        return Response(serializer.data)

class RoomDeleteView(APIView):
    @authenticated(user_type="teacher")
    def post(self, request, auth_id):
        response = Response()
        Classroom.objects.get(room_id=request.data['id']).delete()
        response.data = {'message':'success'}
        return response


class ExerciseCreateView(APIView):
    @authenticated(user_type="teacher")
    def post(self, request, auth_id):
        serializer = ExerciseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ExerciseView(APIView):
    @authenticated(user_type="teacher")
    def post(self, request, auth_id):
        response = Response()
        try : 
            exercise = Exercise.objects.get(statement=request.data['statement'])
            serializer = ExerciseSerializer(exercise)
            response.data = serializer.data
        except ObjectDoesNotExist:
            response.data = {'message':'No exercise found'}
        return response


class ExerciseDeleteView(APIView):
    @authenticated(user_type="teacher")
    def post(self, request, auth_id):
        response = Response()
        try:
            Exercise.objects.get(statement=request.data['statement']).delete()
            response.data = {'message': 'success'}
        except ObjectDoesNotExist:
            response.data = {'message':'No exercise found'}
        return response


class SolutionCreateView(APIView):
    @authenticated(user_type="student")
    def post(self, request, auth_id):
        serializer = SolutionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class SolutionDeleteView(APIView):
    @authenticated(user_type="student")
    def post(self, request, auth_id):
        response = Response()
        try:
            Solution.objects.filter(source=request.data['source']).delete()
            response.data = {'message': 'success'}
        except ObjectDoesNotExist:
            response.data = {'message':'No solution found'}
        return response
