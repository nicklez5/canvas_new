from django.contrib.auth.models import update_last_login
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.views import APIView 
from rest_framework import generics, status 
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import CustomUser 
from .serializers import UserSerializer, UserLoginSerializer, RegisterSerializer

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
def apiOverview(request):
    api_urls = {
        'List': '/list/',
        'Detail View': '/detail/<str:pk>/',
        'Register': '/register/',
        'Login': '/login/',
    }
    return Response(api_urls)


class UserList(APIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get(self,request):
        queryset = CustomUser.objects.all() 
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self,request,*args, **kwargs):
        login_serializer = UserLoginSerializer(data=request.data)
        login_serializer.is_valid(raise_exception=True)
        user = login_serializer.validated_data['user']
        update_last_login(None,user)
        return Response({"status": status.HTTP_200_OK})

class RegisterView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    def post(self,request,format=None):
        reg_serializer = RegisterSerializer(data=request.data)
        if reg_serializer.is_valid():
            reg_serializer.save()
            return Response(reg_serializer.data, status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserView(APIView):

    
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer


    def get_object(self,pk):
        try: 
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self,request,pk,format=None):
        custom_user = self.get_object(pk)
        serializer = UserSerializer(custom_user)
        return Response(serializer.data)
    
    def delete(self,request,pk,format=None):
        custom_user = self.get_object(pk)
        custom_user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self,request,pk,format=None):
        custom_user = self.get_object(pk)
        serializer = UserSerializer(custom_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
# Create your views here.
# class CustomAuthToken(ObtainAuthToken):
#     serializer_class = UserLoginSerializer
#     permission_classes = [AllowAny]

#     def post(self,request,*args, **kwargs):
#         serializer = self.serializer_class(data=request.data,context={'request':request})
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({
#             'token': token.key,
#             'user_id': user.pk,
#             'email': user.email
#         })