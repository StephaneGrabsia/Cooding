from django.test import TestCase
from api.models import Member

# Create your tests here.
class MembersTestCase:
    def setUp(self):
        Member.objects.create(username='Sullivan')
        Member.objects.create(username='s'*500)

    def test_assert_username(self):
        sullivan = Member.objects.get(username="Sullivan")
        snake = Member.objects.get(username='s'*500)
        self.assertEqual(str(sullivan), "Sullivan")
        self.assertEqual(str(snake), 's'*50)