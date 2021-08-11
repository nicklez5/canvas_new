from rest_framework import serializers
from users.serializers import UserSerializer
from course.serializers import SerializeCourse
from .models import Student 
class SerializeStudent(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    list_courses = SerializeCourse(read_only=True,many=True)
    class Meta:
        model = Student 
        fields = ('user','list_courses',)

    
    