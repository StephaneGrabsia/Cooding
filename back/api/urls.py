from django.urls import path
from api.views import (
    getRoutes,
    TeacherRegisterView,
    TeacherLoginView,
    TeacherView,
    StudentRegisterView,
    StudentLoginView,
    StudentView,
    LogoutView,
    RoomCreateView,
    RoomView,
    RoomDeleteView,
    ExerciseCreateView,
    ExerciseView,
    ExerciseDeleteView,
    SolutionCreateView,
    SolutionDeleteView
)

urlpatterns = [
    path("", getRoutes, name="routes"),

    path("teacher/register/", TeacherRegisterView.as_view()),
    path("teacher/login/", TeacherLoginView.as_view()),
    path("teacher/", TeacherView.as_view()),

    path("student/register/", StudentRegisterView.as_view()),
    path("student/login/", StudentLoginView.as_view()),
    path("student/", StudentView.as_view()),

    path("logout/", LogoutView.as_view()),

    path("room/create/", RoomCreateView.as_view()),
    path("room/", RoomView.as_view()),
    path("room/delete/", RoomDeleteView.as_view()),

    path("exercise/create/", ExerciseCreateView.as_view()),
    path("exercise/", ExerciseView.as_view()),
    path("exercise/delete/", ExerciseDeleteView.as_view()),

    path("solution/create/", SolutionCreateView.as_view()),
    path("solution/delete/", SolutionDeleteView.as_view())
]
