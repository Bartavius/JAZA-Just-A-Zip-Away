from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CompanyAccount, UserAccount

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'type']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        aType = validated_data.pop('type')
        username = validated_data['username']
        
        if aType not in ['Company', 'User']:
            raise serializers.ValidationError("Invalid account type. Must be either 'Company' or 'User'.")
        user = User.objects.create_user(**validated_data)


        if aType == 'Company':
            CompanyAccount.objects.create(user=user, companyName=username)
            CompanyAccount.save()
        elif aType == 'User':
            UserAccount.objects.create(user=user, username=username)
            UserAccount.save()

        return user