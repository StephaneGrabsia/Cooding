from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from api.views import (
    getRoutes,
    MyTokenObtainPairView,
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
    SolutionDeleteView,
)

auth_endpoints = [
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view()),
]

teacher_endpoints = [
    path("teacher/register/", TeacherRegisterView.as_view()),
    path("teacher/login/", TeacherLoginView.as_view()),
    path("teacher/", TeacherView.as_view()),
]

student_endpoints = [
    path("student/register/", StudentRegisterView.as_view()),
    path("student/login/", StudentLoginView.as_view()),
    path("student/", StudentView.as_view()),
]

room_endpoints = [
    path("room/create/", RoomCreateView.as_view()),
    path("room/", RoomView.as_view()),
    path("room/delete/", RoomDeleteView.as_view()),
]

exercise_endpoints = [
    path("exercise/create/", ExerciseCreateView.as_view()),
    path("exercise/", ExerciseView.as_view()),
    path("exercise/delete/", ExerciseDeleteView.as_view()),
]

solution_endpoints = [
    path("solution/create/", SolutionCreateView.as_view()),
    path("solution/delete/", SolutionDeleteView.as_view()),
]

urlpatterns = (
    [path("", getRoutes, name="routes")]
    + auth_endpoints
    + teacher_endpoints
    + student_endpoints
    + room_endpoints
    + exercise_endpoints
    + solution_endpoints
)
