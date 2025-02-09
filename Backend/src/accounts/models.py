from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserAccount(models.Model):
    id = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.username 
    class Meta:
        permissions = [
            ("apply_post", "can apply post")
        ]

class CompanyAccount(models.Model):
    id = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.username 
    class Meta:
        permissions = [
            ("create_post", "can create post")
        ]

    