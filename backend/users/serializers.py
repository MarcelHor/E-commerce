from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'country', 'city', 'address',
                  'zip_code']
        extra_kwargs = {
            'password': {'write_only': True, 'validators': [validate_password]},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

