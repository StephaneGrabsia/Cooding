from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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

# =========== AUTH ===========


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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["role"] = user.role
        if user.role == User.Role.TEACHER:
            token["user_info"] = {
                "first_name": user.teacher_profile.first_name,
                "last_name": user.teacher_profile.last_name,
                "gender": user.teacher_profile.gender,
            }
        elif user.role == User.Role.STUDENT:
            token["user_info"] = {"classroom": user.student_profile.classroom.room_id}

        return token


# =========== TEACHER ===========


class TeacherProfileSerializer(ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = ["first_name", "last_name", "gender"]


class TeacherSerializer(ModelSerializer):

    teacher_profile = TeacherProfileSerializer(required=True)

    class Meta:
        model = Teacher
        fields = ["id", "role", "username", "password", "teacher_profile"]
        extra_kwargs = {"password": {"write_only": True}, "role": {"read_only": True}}

    def create(self, validated_data):
        # creation of the teacher
        user = self.Meta.model(username=validated_data["username"])
        if validated_data["password"]:
            user.set_password(validated_data["password"])
        user.save()

        # create teacher profile
        user_profile = TeacherProfile.objects.create(user=user)
        user_profile.first_name = validated_data["teacher_profile"]["first_name"]
        user_profile.last_name = validated_data["teacher_profile"]["last_name"]
        user_profile.gender = validated_data["teacher_profile"]["gender"]
        user_profile.save()

        return user


# =========== CLASSROOM ===========


class ClassroomSerializer(ModelSerializer):
    class Meta:
        model = Classroom
        fields = ["room_id", "teacher"]

    def create(self, validated_data):
        room = self.Meta.model(**validated_data)
        room.save()
        return room


# =========== STUDENT ===========


class StudentProfileSerializer(ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ["classroom"]


class StudentSerializer(ModelSerializer):

    student_profile = StudentProfileSerializer(required=True)

    class Meta:
        model = Student
        fields = ["id", "role", "username", "student_profile"]
        extra_kwargs = {"role": {"read_only": True}}

    def create(self, validated_data):
        # creation of the student
        user = self.Meta.model(username=validated_data["username"])
        if validated_data["student_profile"]["classroom"]:
            user.set_password(
                str(validated_data["student_profile"]["classroom"].room_id)
            )
        user.save()

        # create student profile
        user_profile = StudentProfile.objects.create(
            user=user, classroom=validated_data["student_profile"]["classroom"]
        )
        user_profile.save()

        return user


# =========== EXERCISE AND SOLUTION ===========


class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = [
            "id",
            "statement",
            "solution",
            "test_input",
            "correct_output",
            "classroom",
        ]

    def create(self, validated_data):
        exercise = self.Meta.model(**validated_data)
        exercise.save()
        return exercise


class SolutionSerializer(ModelSerializer):
    class Meta:
        model = Solution
        fields = ["exercise", "student", "source"]

    def create(self, validated_data):
        solution = self.Meta.model(**validated_data)
        solution.save()
        return solution
