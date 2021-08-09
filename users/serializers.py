from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework import serializers, generics 
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','email']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','email','first_name','last_name','date_of_birth','password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self,validated_data):
        user = CustomUser(
            email = validated_data['email'],
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            date_of_birth = validated_data['date_of_birth'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128,write_only=True)

    def validate(self,data):
        email = data["email"]
        password = data["password"]
        user = authenticate(email=email,password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password is not found.'
            )
        try:
            update_last_login(None,user)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        return user
    


        