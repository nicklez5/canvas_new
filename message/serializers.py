from rest_framework import serializers
from profiles.serializers import SerializeProfile
from .models import Message

class SerializeMessage(serializers.ModelSerializer):
    author = SerializeProfile(read_only=True,many=False)
    class Meta:
        model = Message
        fields = ['id','author','description','timestamp']