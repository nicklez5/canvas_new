from django.db import models
from django.utils.translation import ugettext_lazy as _
from django import forms 
class Assignment(models.Model):
    name = models.CharField(max_length=100,unique=True)
    date_created = models.DateTimeField(auto_now_add=True,null=True,blank=True)
    max_points = models.IntegerField(null=True,blank=True)
    student_points = models.IntegerField(null=True,blank=True)
    description = models.TextField(max_length=100)
    file = models.FileField(upload_to='assignments/',blank=True,null=True)
    def __str__(self):
        return self.name 

    class Meta:
        ordering = ['date_created']
        db_table = "assignment"

# Create your models here.
