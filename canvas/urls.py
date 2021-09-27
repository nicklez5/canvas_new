from django.conf.urls import url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
urlpatterns = [
    path('', views.CanvasList.as_view()),
    path('detail/<str:pk>/',views.CanvasView.as_view()),
    path('add_course/<str:pk>/', views.CanvasAddCourse.as_view()),
    path('delete_course/<str:pk>/', views.CanvasRemoveCourse.as_view()),
    path('course_detail/<str:pk>/', views.CanvasCourseView.as_view()),
    path('delete/<str:pk>/', views.CanvasDelete.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
