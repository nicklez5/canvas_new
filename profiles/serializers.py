from rest_framework import serializers
from django.db import models 
from .models import Profile 
class SerializeProfile(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email')
    class Meta:
        model = Profile 
        fields = ('email','first_name','last_name','date_of_birth',)

    