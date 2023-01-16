from django.contrib import admin

# Register your models here.
from api.models import (
    User,
    Teacher,
    TeacherProfile,
    Student,
    StudentProfile,
    Classroom,
    Exercise,
    Solution,
)

admin.site.register(User)
admin.site.register(Teacher)
admin.site.register(TeacherProfile)
admin.site.register(Student)
admin.site.register(StudentProfile)
admin.site.register(Classroom)
admin.site.register(Exercise)
admin.site.register(Solution)
