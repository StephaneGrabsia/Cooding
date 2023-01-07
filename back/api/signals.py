from django.db.models.signals import post_save
from django.dispatch import receiver

from api.models import Teacher, TeacherProfile


@receiver(post_save, sender=Teacher)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "TEACHER":
        TeacherProfile.objects.create(user=instance)
