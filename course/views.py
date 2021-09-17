from django.shortcuts import get_object_or_404, render
from django.conf import settings
from rest_framework.decorators import action, permission_classes 
from .models import Course
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import serializers, status, viewsets 
from .serializers import SerializeCourse
from lectures.models import Lecture 
from assignments.models import Assignment
from profiles.models import Profile 
import django.dispatch 

class CourseList(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SerializeCourse

    def get(self,request,format=None):
        courses = Course.objects.all()
        serializer = self.serializer_class(courses,many=True)
        return Response(serializer.data)
    
class CoursePost(APIView):
    permission_classes = [IsAdminUser]

    def post(self,request,format=None):
        serializer = SerializeCourse(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = SerializeCourse(course)
        return Response(serializer.data)

    
class CourseRemoveAssignment(APIView):
    permission_classes = [IsAdminUser]
    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def put(self,request,pk,format=None):
        data = request.data
        course = self.get_object(pk=pk)
        assignment_name = data["name"]
        assignment_obj = Assignment.objects.get(name=assignment_name)
        if assignment_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.assignments.remove(assignment_obj)
        serializer = SerializeCourse(course,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        

class CourseRemoveLecture(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def put(self,request,pk,format=None):
        data = request.data
        course = self.get_object(pk)
        lecture_name = data["name"]
        lecture_obj = Lecture.objects.get(name=lecture_name)
        if lecture_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.lectures.remove(lecture_obj)
        serializer = SerializeCourse(course,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseChangeName(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def put(self,request,pk,format=None):
        data = request.data 
        course = self.get_object(pk)
        if course is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course_name = data["name"]
        course.name = course_name 
        serializer = SerializeCourse(course,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class CourseAddLecture(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def put(self,request,pk,format=None):
        data = request.data
        course = self.get_object(pk)
        lecture_name = data["name"]
        lecture_obj = Lecture.objects.get(name=lecture_name)
        if lecture_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.lectures.add(lecture_obj)
        serializer = SerializeCourse(course,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseAddAssignment(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def put(self,request,pk,format=None):
        data = request.data
        course = self.get_object(pk)
        assignment_name = data["name"]
        assignment_obj = Assignment.objects.get(name=assignment_name)
        if assignment_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.assignments.add(assignment_obj)
        serializer = SerializeCourse(course,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class CourseAddStudent(APIView):
    student_added = django.dispatch.Signal()
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    def get_object_profile(self,pk):
        try:
            return Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        data = request.data
        course = self.get_object(pk)
        profile_obj = self.get_object_profile(data["pk"])
        if profile_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.profiles.add(profile_obj)

        serializer = SerializeCourse(course,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class CourseRemoveStudent(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try: 
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def put(self, request, pk , format=None):
        data = request.data
        course = self.get_object(pk)
        profile_obj = Profile.objects.get(first_name=data["first_name"],last_name=data["last_name"],date_of_birth=data["date_of_birth"])
        if profile_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.profiles.remove(profile_obj)
        serializer = SerializeCourse(course,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    





    




    
        

        

    

# Create your views here.
