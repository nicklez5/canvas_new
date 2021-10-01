from rest_framework import serializers
from assignments.serializers import SerializeAssignment
from lectures.serializers import SerializeLecture
from profiles.serializers import SerializeProfile
from tests.serializers import SerializeTest
from .models import Course 
class SerializeCourse(serializers.ModelSerializer):
    assignments = SerializeAssignment(read_only=True, many=True)
    lectures = SerializeLecture(read_only=True,many=True)
    profiles = SerializeProfile(read_only=True,many=True)
    tests = SerializeTest(read_only=True,many=True)
    class Meta:
        model = Course 
        fields = ['pk','name', 'assignments','lectures','profiles','tests']
        depth = 1