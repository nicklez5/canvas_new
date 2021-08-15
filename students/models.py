from time import time 
import uuid 
from django.db import models
from django.conf import settings 
class Student(models.Model):
    #user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    #list_assignments = models.ManyToManyField("assignment.Assignment", related_name="assignments",blank=True)
    list_courses = models.ManyToManyField("course.Course", related_name="courses", blank=True)
    
    def __str__(self):
        return "%s" % self.user
        
# Create your models here.
