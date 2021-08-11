from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from .models import Student
from django.http import Http404
from .serializers import SerializeStudent

class StudentList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        students = Student.objects.all()
        serializer = SerializeStudent(students,many=True)
        return Response(serializer.data)

class StudentPost(APIView):
    permission_classes = [IsAdminUser]

    def post(self,request,format=None):
        serializer = SerializeStudent(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StudentDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self,pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, pk , format=None):
        student = self.get_object(pk)
        serializer = SerializeStudent(student)
        return Response(serializer.data)

class StudentUpdate(APIView):
    permission_classes = [IsAuthenticated] 

    def get_object(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404

    def put(self,request,pk,format=None):
        student = self.get_object(pk)
        serializer = SerializeStudent(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StudentDelete(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404

    def delete(self, request, pk , format=None):
        student = self.get_object(pk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Create your views here.
