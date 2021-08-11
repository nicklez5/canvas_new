from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('students/', views.StudentList.as_view()),
    path('student/post/', views.StudentPost.as_view()),
    path('student/<str:pk>/', views.StudentDetail.as_view()),
    path('student/<str:pk>/update/', views.StudentUpdate.as_view()),
    path('student/<str:pk>/delete/', views.StudentDelete.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)