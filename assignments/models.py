from django.db import models
from django.utils.translation import ugettext_lazy as _

class Assignment(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True,null=True,blank=True)
    max_points = models.IntegerField(null=True,blank=True)
    student_points = models.IntegerField(null=True,blank=True)
    description = models.TextField(max_length=100)

    def __str__(self):
        return self.name 

    class Meta:
        ordering = ['date_created']
        db_table = "assignment"

# Create your models here.
