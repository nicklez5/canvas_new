from django.shortcuts import render
from .models import Lecture
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import serializers, status 
from .serializers import SerializeLecture 
class LectureList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        lectures = Lecture.objects.all()
        serializer = SerializeLecture(lectures, many=True)
        return Response(serializer.data)

class LecturePost(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, format=None):
        serializer = SerializeLecture(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LectureDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get_object(self,pk):
        try:
            return Lecture.objects.get(pk=pk)
        except Lecture.DoesNotExist:
            raise Http404
    
    def get(self, request, pk , format = None):
        lecture = self.get_object(pk)
        serializer = SerializeLecture(lecture)
        return Response(serializer.data)

class LectureUpdate(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Lecture.objects.get(pk=pk)
        except Lecture.DoesNotExist:
            raise Http404

    def put(self,request,pk,format=None):
        lecture = self.get_object(pk)
        serializer = SerializeLecture(lecture,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LectureDelete(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Lecture.objects.get(pk=pk)
        except Lecture.DoesNotExist:
            raise Http404
            
    def delete(self, request, pk, format=None):
        lecture = self.get_object(pk)
        lecture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Create your views here.
