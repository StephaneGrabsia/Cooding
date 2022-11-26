from django.test import TestCase
from api.models import Member

# Create your tests here.
class MembersTestCase:
    def setUp(self):
        Member.objects.create(username='Sullivan')
        Member.objects.create(username='s'*500)