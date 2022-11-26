from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('members/', views.getMembers, name="members"),
    path('members/<str:pk>/update/', views.updateMember, name="update-member"),
    path('members/<str:pk>/delete/', views.deleteMember, name="delete-member"),

    path('members/<str:pk>/', views.getMember, name="member"),
]
