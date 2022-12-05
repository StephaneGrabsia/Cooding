from django.contrib import admin

# Register your models here.
from .models import User, Classroom, Exercise, Solution

admin.site.register(User)
admin.site.register(Classroom)
admin.site.register(Exercise)
admin.site.register(Solution)


