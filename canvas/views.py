from django.shortcuts import render
from rest_framework.decorators import action, permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status, viewsets
from course.serializers import SerializeCourse
from .serializers import SerializeCanvas
from .models import Canvas 

class CanvasView(APIView):
    serializer_class = SerializeCanvas
    permission_classes = [IsAuthenticated]

    def get_object(self,pk):
        try:
            return Canvas.objects.get(pk=pk)
        except Canvas.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND
    
    def get(self, request , pk , format=None):
        canvas = self.get_object(pk)
        serializer = SerializeCanvas(canvas)
        return Response(serializer.data)

class CanvasAddCourseView(APIView):
    serializer_class = SerializeCanvas 
    permission_classes = [IsAdminUser]
    
    def get_object(self,pk):
        try:
            return Canvas.objects.get(pk=pk)
        except Canvas.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND
    
    def post(self, request,pk,format=None):
        canvas = self.get_object(pk)
        
    
# Create your views here.
