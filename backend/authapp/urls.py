from django.urls import path , include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewset , RolesViewSet, UserRegisterView , AvatarViewSet, CustomTokenObtainPairView ,Add_fmaily_memberViewset 
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'users', CustomUserViewset)
router.register(r'roles', RolesViewSet)
router.register(r'avatar', AvatarViewSet , basename='avatar')
router.register(r'addMember' , Add_fmaily_memberViewset)



urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('addMember/user/<int:user_id>/', views.get_Member_by_user, name='get_Member_by_user'),
    path('addMember/id/<int:id>/', views.get_member_by_id , name=('get_member_by_id')),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

