from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from django.http import JsonResponse

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer



def get_tasks_by_user(request, user_id):
    Taskrequests = Task.objects.filter(user=user_id)
    taskerequest_list = [{
        "id": leaveuser.id,
        "user": leaveuser.user.id,
        "assigned_member" : leaveuser.assigned_member.id if leaveuser.assigned_member else None,
        "is_complete": leaveuser.is_complete,
        "subject" : leaveuser.subject, 
    } for leaveuser in Taskrequests]
    return JsonResponse(taskerequest_list, safe=False)

    
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Task

def get_task_by_user_and_member(request, user_id, assigned_member_id):
    try:
        tasks = Task.objects.filter(user=user_id, assigned_member=assigned_member_id)
        
        task_list = [{
            "id": task.id,
            "user": task.user.id,
            "assigned_member": task.assigned_member.id if task.assigned_member else None,
            "is_complete": task.is_complete,
            "subject": task.subject
        } for task in tasks]
        
        return JsonResponse(task_list, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
