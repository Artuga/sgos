from django.db import models

from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

#Pruebas iniciales de modelos. Antonio Miravete 15/01/2020.
class Rol(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
class Usuario(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    rol = models.ForeignKey(Rol, on_delete=models.PROTECT, blank=True, null=True)
    userid = models.CharField(max_length=400,blank=True, null= True)
    nombre = models.CharField(max_length=400, default="")
    apellido = models.CharField(max_length=400, default="")
    celular = models.CharField(max_length=400, default="")
    activo = models.BooleanField(default=True)
    creationdate = models.DateTimeField(default=timezone.now, editable=False)
    def __str__(self):
        return self.user.username + "--" + str(self.nombre)