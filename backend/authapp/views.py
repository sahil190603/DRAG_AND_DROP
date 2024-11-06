from .serializers import RolesSerializer, UserSerializer , AvatarSeralizer , Add_fmaily_memberSetializer 
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from .models import Roles, CustomUser , Avatar, Add_fmaily_member 
from rest_framework import generics, viewsets, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response 
from django.http import JsonResponse


class AvatarViewSet(viewsets.ModelViewSet):
     queryset = Avatar.objects.all()
     serializer_class = AvatarSeralizer

class RolesViewSet(viewsets.ModelViewSet):
     queryset = Roles.objects.all()
     serializer_class = RolesSerializer

class CustomUserViewset(viewsets.ModelViewSet):
    queryset = CustomUser.objects.filter()
    serializer_class = UserSerializer

User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role.name 
        token['roleid'] = user.role.id
        token['first_name'] = user.first_name
        token['lastname'] = user.last_name
        token['email'] = user.email
        token['avatar'] = user.avatar.name
     
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        return Response({"user_id": user.id}, status=status.HTTP_201_CREATED)
    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Add_fmaily_memberViewset(viewsets.ModelViewSet):
    queryset = Add_fmaily_member.objects.all().order_by('-id')
    serializer_class = Add_fmaily_memberSetializer

def get_Member_by_user(request, user_id):
    Members = Add_fmaily_member.objects.filter(user=user_id).order_by('-id')
    members_list = [{"id": userMember.id , 
                    "user": userMember.user.username, 
                    "first_name": userMember.first_name, 
                    "last_name": userMember.last_name,
                    "email": userMember.email,
                    "role": userMember.role.id, 
                    "avatar" : userMember.avatar.id
                    } for userMember in Members]
    return JsonResponse(members_list, safe=False)

def get_member_by_id(request , id):
    Members = Add_fmaily_member.objects.filter(id = id)
    members_list = [{"id": userMember.id , 
                    "avatar" : userMember.avatar.id
                    } for userMember in Members]
    return JsonResponse(members_list, safe=False)

