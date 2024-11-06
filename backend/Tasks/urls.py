from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet
from . import views

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('tasks/user/<int:user_id>/', views.get_tasks_by_user, name='get_tasks_by_user'),
    path('tasks/user/<int:user_id>/assigned_member/<int:assigned_member_id>/', views.get_task_by_user_and_member, name='get_task_by_user_and_member'),
]
