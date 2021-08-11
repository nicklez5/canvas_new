from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.AssignmentList.as_view()),
    path('post/', views.AssignmentPost.as_view()),
    path('detail/<str:pk>/',views.AssignmentDetail.as_view()),
    path('update/<str:pk>/', views.AssignmentUpdate.as_view()),
    path('delete/<str:pk>/', views.AssignmentDelete.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)