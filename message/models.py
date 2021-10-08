from django.db import models

class Message(models.Model):
    id = models.IntegerField(primary_key=True)
    author = models.ForeignKey('profiles.Profile', related_name='author',null=True,on_delete=models.CASCADE)
    description = models.TextField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True,null=True,blank=True)
    
   
# Create your models here.
