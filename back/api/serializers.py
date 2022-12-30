from rest_framework.serializers import ModelSerializer
from api.models import User, Teacher, Student, Classroom, Exercise


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


class TeacherSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Teacher
        fields = ["user", "first_name", "last_name", "gender", "date_joined"]

    def create(self, validated_data):
        user = UserSerializer.create(UserSerializer(), validated_data["user"])
        validated_data["user"] = user
        teacher = self.Meta.model(**validated_data)
        teacher.save()
        return teacher

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
    

class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["statement", "solution", "test_input", "correct_output", "classroom"]

    def create(self, validated_data):
        exercise = self.Meta.model(**validated_data)
        exercise.save()
        return exercise
