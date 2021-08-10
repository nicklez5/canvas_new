from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=40)
    lectures = models.ManyToManyField('lectures.Lecture', blank=True)
    students = models.ManyToManyField('students.Student', blank=True)
    assignments = models.ManyToManyField('assignments.Assignment', blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']
        db_table = "course"
# Create your models here.
