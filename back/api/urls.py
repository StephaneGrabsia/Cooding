from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', views.getRoutes, name="routes"),

    path('register/', UserRegisterView.as_view()),
    path('teacher/register/', TeacherRegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('teacher/login/', TeacherLoginView.as_view()),
    path('user/', UserView.as_view()),
    path('teacher/', TeacherView.as_view()),
    path('logout/', LogoutView.as_view()),

]
