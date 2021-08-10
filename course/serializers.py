from rest_framework import serializers
from assignments.serializers import SerializeAssignment
from lectures.serializers import SerializerLecture
from students.serializers import SerializeStudent 
from .models import Course 
class SerializeCourse(serializers.ModelSerializer):
    assignments = SerializeAssignment(read_only=True, many=True)
    class Meta:
        model = Course 
        fields = ['name', 'assignment',] 