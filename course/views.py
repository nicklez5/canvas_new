from django.shortcuts import render
from .models import Course
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import serializers, status
from .serializers import SerializeCourse
class CourseList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        courses = Course.objects.all()
        serializer = SerializeCourse(courses, many=True)
        return Response(serializer.data)

class CoursePost(APIView):
    permission_classes = [IsAdminUser]
    def post(self,request,format=None):
        serializer = SerializeCourse(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def get(self, request, pk , format=None):
        course = self.get_object(pk)
        serializer = SerializeCourse(course)
        return Response(serializer.data)

class CourseUpdate(APIView):
    permission_classes = [IsAdminUser]
    
    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
            
    def put(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = SerializeCourse(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDelete(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def delete(self, request, pk , format=None):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




# Create your views here.
