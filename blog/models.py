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

class Grado(models.Model):
    nombre = models.CharField(max_length=50,blank=False, null=False)

    def __str__(self):
        return self.nombre

class Grupo(models.Model):
    nombre = models.CharField(max_length=50,blank=False, null=False)

    def __str__(self):
        return self.nombre

class Alumno(models.Model):
    nombre = models.CharField(max_length=50,blank=False, null=False)
    apellido = models.CharField(max_length=50,blank=False, null=False)
    grado = models.ForeignKey(Grado,on_delete=models.PROTECT,blank=False, null=True)
    grupo = models.ForeignKey(Grupo,on_delete=models.PROTECT,blank=False, null=True)
    correo = models.CharField(max_length=50,blank=False, null=False)
    direccion = models.CharField(max_length=200,blank=False, null=False)

    def __str__(self):
        return self.nombre + " " + self.apellido;

class Pago(models.Model):
    fecha = models.DateTimeField(default=timezone.now)
    alumno = models.ForeignKey(Alumno, on_delete=models.PROTECT,blank=True,null=True)
    monto = models.CharField(max_length=10,blank=False,null=False)

    def __str__(self):
        return self.monto;

class Gasto(models.Model):
    fecha = models.DateTimeField(default=timezone.now)
    monto = models.CharField(max_length=10,blank=False,null=False)
    descripcion = models.CharField(max_length=300,blank=False,null=False)

    def __str__(self):
        return self.monto;    

#python manage.py makemigrations
#python manage.py migrate
