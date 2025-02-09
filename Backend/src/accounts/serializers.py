from django.db import transaction
from rest_framework import serializers
from django.contrib.auth.models import User, Permission
from django.contrib.contenttypes.models import ContentType
from .models import CompanyAccount, UserAccount

class CompanyAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password','first_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True},
            'first_name': {'required': True},
        }

    def create(self, validated_data):
        user_data = {
            'username': validated_data['username'],
            'password': validated_data['password'],
            'first_name': validated_data['first_name']
        }
        with transaction.atomic():
            user = User.objects.create_user(**user_data)
            content_type = ContentType.objects.get_for_model(CompanyAccount)
            permission = Permission.objects.get(codename='create_post',content_type = content_type)
            user.user_permissions.add(permission)
            
            company_account = CompanyAccount(id=user,username=validated_data['username'])
            company_account.save()
            return user


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','first_name','last_name']
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
        with transaction.atomic():
            user = User.objects.create_user(**user_data)
            content_type = ContentType.objects.get_for_model(UserAccount)
            permission = Permission.objects.get(codename='apply_post',content_type = content_type)
            user.user_permissions.add(permission)
            user_account = UserAccount(id=user,username=validated_data["username"])
            user_account.save()
            return user