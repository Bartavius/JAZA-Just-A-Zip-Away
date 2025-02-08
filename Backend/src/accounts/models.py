from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserAccount(models.Model):
    id = models.OneToOneField('accounts.CustomUser', primary_key=True, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.username; 

class CompanyAccount(models.Model):
    id = models.OneToOneField('accounts.CustomUser', primary_key=True, on_delete=models.CASCADE)
    companyName = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.companyName; 

class CustomUser(AbstractUser):
    ACCOUNT_TYPE_CHOICES = (
        ('Company', 'Company'),
        ('User', 'User'),
    )

    type = models.CharField(max_length=20, choices=ACCOUNT_TYPE_CHOICES)