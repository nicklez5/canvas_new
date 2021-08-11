from rest_framework import serializers
from assignments.serializers import SerializeAssignment
from lectures.serializers import SerializeLecture
from .models import Course 
class SerializeCourse(serializers.ModelSerializer):
    assignments = SerializeAssignment(read_only=True, many=True)
    lectures = SerializeLecture(read_only=True,many=True)
    class Meta:
        model = Course 
        fields = ['name', 'assignment','lectures']
