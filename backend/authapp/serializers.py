from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Roles , Avatar , Add_fmaily_member 


User = get_user_model()

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'

class AvatarSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','first_name', 'last_name', 'email', 'password' , 'role' , 'avatar' )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class  Add_fmaily_memberSetializer(serializers.ModelSerializer):
    class Meta:
        model =  Add_fmaily_member
        fields = ('id' ,'user','first_name','last_name' , 'role', 'email' , 'avatar' , 'task')

