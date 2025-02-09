from django.db import models

from accounts.models import CompanyAccount, UserAccount
# Create your models here.

class Location(models.Model):
    address = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return f"{self.address}"

class CompanyPost(models.Model):
    user = models.ForeignKey(CompanyAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=100,default="Untitled")
    message = models.TextField(max_length=1000)
    post_time= models.DateTimeField(auto_now_add=True)
    start_time= models.DateTimeField(auto_now_add=True) 
    start_location=models.ForeignKey(Location, on_delete=models.CASCADE,related_name="start_loc")
    end_time= models.DateTimeField(auto_now_add=True) 
    end_location=models.ForeignKey(Location, on_delete=models.CASCADE, related_name="end_loc")
    #the auto_now_add saves the creation time so we can nab that for the post time
    

    def __str__(self):
        return f"{self.title}"

class Linker(models.Model):
    userid = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(CompanyPost, on_delete=models.CASCADE)

    def __str__(self):
        return f"userID: {self.userid}, Post: {self.post}"
