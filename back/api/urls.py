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
)

urlpatterns = [
    path("", getRoutes, name="routes"),
    path("api/token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
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
]
