from rest_framework.serializers import ModelSerializer
from api.models import User, Teacher, TeacherProfile, Student, Classroom


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class TeacherProfileSerializer(ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = ["first_name", "last_name", "gender"]


class TeacherSerializer(ModelSerializer):

    profile = TeacherProfileSerializer(required=True)

    class Meta:
        model = Teacher
        fields = ["id", "role", "username", "password", "profile"]
        extra_kwargs = {"password": {"write_only": True}, "role": {"read_only": True}}

    def create(self, validated_data):
        # creation of the teacher
        user = self.Meta.model(username=validated_data["username"])
        if validated_data["password"]:
            user.set_password(validated_data["password"])
        user.save()

        # create teacher profile
        user_profile = TeacherProfile.objects.create(user=user)
        user_profile.first_name = validated_data["profile"]["first_name"]
        user_profile.last_name = validated_data["profile"]["last_name"]
        user_profile.gender = validated_data["profile"]["gender"]
        user_profile.save()

        return user


class RoomSerializer(ModelSerializer):
    class Meta:
        model = Classroom
        fields = ["room_id", "teacher"]

    def create(self, validated_data):
        room = self.Meta.model(**validated_data)
        room.save()
        return room


class StudentSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ["user", "classroom"]

    def create(self, validated_data):
        validated_data["user"]["password"] = str(validated_data["classroom"])
        user = UserSerializer.create(UserSerializer(), validated_data["user"])
        validated_data["user"] = user
        student = self.Meta.model(**validated_data)
        student.save()
        return student
