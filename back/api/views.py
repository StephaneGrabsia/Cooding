import jwt
import datetime

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed

from api.models import Teacher
from api.serializers import TeacherSerializer
from api.decorators import authenticated
from uQuizz.settings import TOKEN_EXPIRATION_TIME


@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            "Endpoint": "/<user_type>/register/",
            "method": "POST",
            "description": "To register",
            "Format of the request:": {
                "user": {"username": "<your username>", "password": "<your pass>"},
                "first_name": "<your first name>",
                "last_name": "<your last name>",
                "gender": "<Homme ou Femme>",
            },
        },
        {
            "Endpoint": "/<user_type>/login/",
            "method": "POST",
            "description": "To login",
            "Format of the request:": {
                "username": "<your username>",
                "password": "<your pass>",
            },
        },
        {"Endpoint": "/<user_type>/", "method": "GET", "description": "get users"},
        {"Endpoint": "/logout/", "method": "GET", "description": "To logout"},
    ]
    return Response(routes)


class TeacherRegisterView(APIView):
    def post(self, request):
        teacher = TeacherSerializer(data=request.data)
        teacher.is_valid(raise_exception=True)
        teacher.save()
        return Response(teacher.data)


class TeacherLoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        teacher = Teacher.objects.get(user__username=username)
        if teacher is None:
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


class LogoutView(APIView):
    def get(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"message": "success"}
        return response
