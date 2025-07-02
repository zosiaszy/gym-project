from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework.serializers import ModelSerializer,CharField
from django.contrib.auth import get_user_model

class UserSerializer(ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ["id", "username", "first_name", "last_name", "email", "password"]
            read_only_fields = ["id"]
            extra_kwargs = {
                            "username":{"required":True},
                             "first_name":{"required":True},
                             "last_name":{"required":True},
                             "email":{"required":True},
                             "password"   :{"required":True, 'write_only':True}
                             }
      

        def create(self, validated_data) -> AbstractUser:
            user = get_user_model().objects.create_user(
                  username=validated_data["username"],
                  first_name=validated_data["first_name"],
                  last_name=validated_data["last_name"],
                  email=validated_data["email"]
            )
            user.set_password(validated_data["password"])
            user.save()
            return user
        