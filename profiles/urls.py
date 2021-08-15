from django.urls import path 
from rest_framework.urlpatterns import format_suffix_patterns
from . import views 
urlpatterns = [
    path('<str:pk>/', views.ProfileView.as_view()),
    path('update/<str:pk>/', views.ProfileUpdate.as_view()),
]

