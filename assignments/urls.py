from django.urls import path
from django.conf.urls import include, IncludedURLConf
from rest_framework.urlpatterns import form, format_suffix_patterns
from . import views

urlpatterns = [
    path('assignments/', views.AssignmentList.as_view()),
    path('assignment/post', views.AssignmentPost.as_view()),
    path('assignment/<str:pk>/',views.AssignmentDetail.as_view()),
    path('assignment/<str:pk>/update/', views.AssignmentUpdate.as_view()),
    path('assignment/<str:pk>/delete/', views.AssignmentDelete.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)