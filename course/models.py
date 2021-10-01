from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=40,unique=False)
    lectures = models.ManyToManyField('lectures.Lecture',related_name='lectures', blank=True)
    profiles = models.ManyToManyField('profiles.Profile',related_name='profiles', blank=True)
    assignments = models.ManyToManyField('assignments.Assignment',related_name='assignments', blank=True)
    tests = models.ManyToManyField('tests.Test', related_name='tests',blank=True)
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']
        db_table = "course"

# Create your models here.
