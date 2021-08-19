from django.db import models
from django.conf import settings 
from course.models import Course 
class Canvas(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    list_courses = models.ManyToManyField('course.Course')
    current_course = models.ForeignKey('course.Course', related_name = 'current_course',null=True, on_delete=models.CASCADE)


    

# Create your models here.
