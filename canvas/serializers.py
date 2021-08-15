from rest_framework import serializers
from course.serializers import SerializeCourse
from .models import Canvas
class SerializeCanvas(serializers.ModelSerializer):
    list_courses = SerializeCourse(read_only=True,many=True)

    class Meta:
        model = Canvas 
        fields = ['list_courses']

    