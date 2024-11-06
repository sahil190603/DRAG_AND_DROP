from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model
from Tasks.models import Task

class Avatar(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class Roles(models.Model):
     name = models.CharField(max_length=10)

     def __str__(self):
         return self.name

class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True, null=True)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE, null=True)
    avatar = models.ForeignKey(Avatar, on_delete=models.CASCADE, null=True)

    USERNAME_FIELD = 'username'
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
User = get_user_model()

class Add_fmaily_member(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20 , unique=True)
    last_name = models.CharField(max_length=20 , unique=True)
    email = models.CharField(max_length=50 ,unique=True)
    password = models.CharField(max_length=20 , null=True)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE, null=True)
    avatar = models.ForeignKey(Avatar, on_delete=models.CASCADE, null=True)
    task= models.ManyToManyField(Task, blank=True)

    def __str__(self):
        return f"Add_family_member #{self.user.username} - {self.first_name}"