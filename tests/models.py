from django.db import models
from django.utils.translation import ugettext_lazy as _

class Test(models.Model):
    id = models.IntegerField(primary_key=True)
    description = models.TextField(blank=True)
    date_created = models.DateTimeField(_('date created'),auto_now_add=True)
    name = models.CharField(max_length=100,unique=True)
    file = models.FileField(upload_to='tests/',blank=True,null=True)
    max_points = models.IntegerField(null=True,blank=True)
    student_points = models.IntegerField(null=True,blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['date_created']
        db_table = "test"
# Create your models here.
