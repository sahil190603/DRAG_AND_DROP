from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['user','assigned_member', 'id', 'is_complete', 'subject']
            
    def create(self, validated_data):
        task = Task.objects.create(**validated_data)
        assigned_member = validated_data.get('assigned_member')
        if assigned_member:
            assigned_member.task.add(task)
        return task