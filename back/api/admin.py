from django.contrib import admin

# Register your models here.
from .models import Member, Classroom, Exercise, Solution

admin.site.register(Member)
admin.site.register(Classroom)
admin.site.register(Exercise)
admin.site.register(Solution)