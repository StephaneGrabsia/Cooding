from django.urls import path
from api.views import (
    getRoutes,
    TeacherRegisterView,
    TeacherLoginView,
    TeacherView,
    LogoutView,
)

urlpatterns = [
    path("", getRoutes, name="routes"),
    path("teacher/register/", TeacherRegisterView.as_view()),
    path("teacher/login/", TeacherLoginView.as_view()),
    path("teacher/", TeacherView.as_view()),
    path("logout/", LogoutView.as_view()),
]
