from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Member, User
from rest_framework.exceptions import AuthenticationFailed
from .serializers import MemberSerializer, UserSerializer
import jwt, datetime
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint' : '/members/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of members'
        },
        {
            'Endpoint' : '/members/id/',
            'method': 'GET',
            'body': None,
            'description': 'Returns a member'
        },      
        {
            'Endpoint' : '/members/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing member with data sent in post request'
        },    
        {
            'Endpoint' : '/members/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes an existing member'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getMembers(request):
    members = Member.objects.all()
    serializer = MemberSerializer(members, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMember(request, pk):
    members = Member.objects.get(id=pk)
    serializer = MemberSerializer(members, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateMember(request, pk):
    data = request.data
    member = Member.objects.get(id=pk)
    serializer = MemberSerializer(instance=member, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteMember(request, pk):
    member = Member.objects.get(id=pk)
    member.delete()
    return Response('Note was deleted')

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        username = request.data['name']
        passsword = request.data['password']

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id' : user.id,
            'exp': datetime.datetime.utcnow() + datetimetimedelta(minutes=2)
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
        
        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        
        response.data({
            'jwt': token
        })
        return reponse

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthentication')
        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthentication')

        user = User.objects.filter(id=payload['id'].first())
        serializer = UserSerializer(user)
        return Response(serializer.data)

