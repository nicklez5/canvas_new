from django.conf.urls import url , include 
from rest_framework.routers import DefaultRouter 
from .views import CoursesViewSet


router = DefaultRouter()
router.register('course', CoursesViewSet, basename="course")

urlpatterns = [
    url('',include(router.urls))

]
