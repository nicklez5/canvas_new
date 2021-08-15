from django.db import models
class Canvas(models.Model):
    list_courses = models.ManyToManyField('course.Course',related_name='courses',blank=True)
    

# Create your models here.
