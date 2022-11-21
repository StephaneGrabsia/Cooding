from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def getRoutes(request):
    routes = [
        {
            'Endpoint' : '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
    ]
    return JsonResponse(routes, safe=False)