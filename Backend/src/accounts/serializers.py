from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CompanyAccount, UserAccount

class CompanyAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True},
        }

    def create(self, validated_data):
        user_data = {
            'username': validated_data['username'],
            'password': validated_data['password']
        }
        user = User.objects.create_user(**user_data)


        company_account = CompanyAccount(id=user,username=validated_data['username'])
        company_account.save()
        return user

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['username', 'password','first_name','last_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def create(self, validated_data):
        user_data = {
            'username': validated_data['username'],
            'password': validated_data['password'],
            'first_name': validated_data['first_name'],
            'last_name': validated_data['last_name'],
        }
        user = User.objects.create_user(**user_data)
        user_account = UserAccount(id=user,username=validated_data["username"])
        user_account.save()
        return user