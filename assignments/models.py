from django.db import models
from django.utils.translation import ugettext_lazy as _

class Assignment(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(null=True,blank=True)
    max_points = models.IntegerField(null=True,blank=True)
    student_points = models.IntegerField(null=True,blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name 

    class Meta:
        ordering = ['date_created']
        db_table = "assignment"

# Create your models here.
