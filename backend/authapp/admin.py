from django.contrib import admin
from .models import CustomUser , Roles ,  Add_fmaily_member,Avatar

# Register your models here.
admin.site.register(Avatar),
admin.site.register(CustomUser),
admin.site.register(Roles), 
admin.site.register(Add_fmaily_member)
