from django.db import models
from django.conf import settings


class Task(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    assigned_member = models.ForeignKey('authapp.Add_fmaily_member', on_delete=models.CASCADE, related_name='tasks', null=True)
    id = models.AutoField(primary_key=True)
    is_complete = models.BooleanField(default=False)
    subject = models.CharField(max_length=255)

    def __str__(self):
        return f"Task {self.id} - {self.subject}"
