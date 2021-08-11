from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.CourseList.as_view()),
    path('post/', views.CoursePost.as_view()),
    path('detail/<str:pk>/',views.CourseDetail.as_view()),
    path('update/<str:pk>/',views.CourseUpdate.as_view()),
    path('delete/<str:pk>/',views.CourseDelete.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)
