from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(null=True, blank=True, max_length = 255, unique=True)
    password = models.CharField(null=True, blank=True, max_length = 255)
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)

    REQUIRED_FIELD = []

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user.username

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user.username

class Member(models.Model):
    username = models.CharField(null=True, blank=True, max_length = 255)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username[0:50]