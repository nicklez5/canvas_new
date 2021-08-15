from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import update_last_login
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, generics 
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','email','pk','is_staff']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','email','password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self,validated_data):
        user = CustomUser(
            email = validated_data['email'],
            username = validated_data['username'],
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
        if email and password:
            user = authenticate(email=email,password=password)
            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include username and password.')
            raise serializers.ValidationError(msg, code='authorization')
        
        data['user'] = user
        return data
    


        