from django.urls import path
from . import views
from .views import RegisterView, LoginView, UserView

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('members/', views.getMembers, name="members"),
    path('members/<str:pk>/update/', views.updateMember, name="update-member"),
    path('members/<str:pk>/delete/', views.deleteMember, name="delete-member"),

    path('members/<str:pk>/', views.getMember, name="member"),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view())

]
