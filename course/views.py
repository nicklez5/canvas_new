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


class CoursesViewSet(viewsets.ModelViewSet):
    
    serializer_class = SerializeCourse

    permission_classes_by_action = {'create': [IsAdminUser],
                                    'list': [AllowAny],
                                    'retrieve':[AllowAny],
                                    'remove_assignment_from_course': [IsAdminUser],
                                    'remove_lecture_from_course': [IsAdminUser],
                                    'change_course_name': [IsAdminUser],
                                    'add_lecture_to_course': [IsAdminUser],
                                    'add_assignment_to_course': [AllowAny],
                                    'add_student_to_course':[IsAdminUser],
                                    'remove_student_from_course': [IsAdminUser],}
    def list(self):
        courses = Course.objects.all()
        serializer = self.serializer_class(courses)
        return Response(serializer.data)
    
    def retrieve(self,request,pk=None):
        queryset = Course.objects.all()
        course = get_object_or_404(queryset,pk=pk)
        serializer = self.serializer_class(course)
        return Response(serializer.data)

    
    def create(self,request,*args, **kwargs):
        data = request.data

        new_course = Course.objects.create(name=data["course_name"])
        new_course.save()

        for lecture in data["lectures"]:
            lecture_obj = Lecture.objects.get(name=lecture["name"])
            if lecture_obj is None:
                return Response(status=status.HTTP_404_NOT_FOUND)
            new_course.lectures.add(lecture_obj)
        
        for assignment in data["assignments"]:
            assignment_obj = Assignment.objects.get(name=assignment["name"])
            if assignment_obj is None: 
                return Response(status=status.HTTP_404_NOT_FOUND)
            new_course.assignments.add(assignment_obj)

        serializer = SerializeCourse(new_course)
        return Response(serializer.data)

    @action(methods=['delete'],detail=True)
    def remove_assignment_from_course(self,request,pk=None):
        data = request.data 
        course = self.get_object()
        assignment_name = data["name"]
        assignment_obj = Assignment.objects.get(name=assignment_name)
        if assignment_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.assignments.remove(assignment_obj)
        serializer = SerializeCourse(course)
        return Response(serializer.data)

    @action(methods=['delete'], detail=True)
    def remove_lecture_from_course(self,request,pk=None):
        data = request.data
        course = self.get_object()
        lecture_name = data["name"]
        lecture_obj = Lecture.objects.get(name=lecture_name)
        if lecture_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.lectures.remove(lecture_obj)
        serializer = SerializeCourse(course)
        return Response(serializer.data)

    @action(methods=['put'],detail=True)
    def change_course_name(self,request,pk=None):
        data = request.data 
        course = self.get_object()
        course_name = data["name"]
        course.name = course_name
        serializer = SerializeCourse(course)
        return Response(serializer.data)

    @action(methods=['post'],detail=True)
    def add_lecture_to_course(self,request,pk=None):
        data = request.data
        course = self.get_object(pk=pk)
        lecture_name  = data["name"]
        lecture_obj = Lecture.objects.get(name=lecture_name)
        if lecture_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.lectures.add(lecture_obj)
        serializer = SerializeCourse(course)
        return Response(serializer.data)

    @action(methods=['POST'],detail=True)
    def add_assignment_to_course(self,request,pk=None):
        data = request.data
        course = self.get_object()
        assignment_name = data["name"]
        assignment_obj = Assignment.objects.get(name=assignment_name)
        if assignment_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        course.assignments.add(assignment_obj)
        serializer = SerializeCourse(course)
        return Response(serializer.data)

    @action(methods=['post'],detail=True)
    def add_student_to_course(self,request,pk=None):
        data = request.data
        course = self.get_object()
        user_obj = Profile.objects.get(first_name=data["first_name"], last_name=data["last_name"], 
                    date_of_birth=data["date_of_birth"])
        if user_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.profiles.add(user_obj)
        serializer = SerializeCourse(course)
        return Response(serializer.data)

    @action(methods=['post'],detail=True)
    def remove_student_from_course(self,request,pk=None):
        data = request.data
        course = self.get_object()
        user_obj = Profile.objects.get(first_name=data["first_name"], last_name=data["last_name"], 
                    date_of_birth=data["date_of_birth"])
        if user_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.profiles.remove(user_obj)
        serializer = SerializeCourse(course)
        return Response(serializer.data)

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]


    




    
        

        

    

# Create your views here.
