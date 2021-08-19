from django.conf.urls import url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
urlpatterns = [
    path('',views.CanvasView.as_view(), name='home'),
    path('courses/<str:pk>/', views.CanvasCourseUpdate.as_view()),
    path('course_detail/<str:pk>/', views.CanvasCourseView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
