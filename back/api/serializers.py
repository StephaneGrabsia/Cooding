from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import *

    
class TeacherSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(many=False, queryset=User.objects.all())

    class Meta:
        model = Teacher
        fields = ['user']

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password' : {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
