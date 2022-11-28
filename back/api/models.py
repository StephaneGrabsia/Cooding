from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    name = models.CharField(null=True, blank=True, max_length = 255, unique=True)
    password = models.CharField(null=True, blank=True, max_length = 255)
    username = None
    
    USERNAME_FIELD = 'name'

    REQUIRED_FIELD = []

class Member(models.Model):
    username = models.CharField(null=True, blank=True, max_length = 255)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username[0:50]