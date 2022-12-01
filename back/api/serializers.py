from rest_framework.serializers import ModelSerializer
from .models import Member
from .models import User

class MemberSerializer(ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'
    
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
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
