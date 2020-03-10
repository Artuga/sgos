from django.db import models

from django.contrib.auth.models import User
from django.utils import timezone
from smart_selects.db_fields import ChainedForeignKey
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

class Estado(models.Model):
    nombre = models.CharField(max_length=50)
    def __str__(self):
        return self.nombre

class Ciudad(models.Model):
    nombre = models.CharField(max_length=150)
    estado = ChainedForeignKey(
        Estado,
        chained_field="pais",
        chained_model_field="pais",
        show_all=False,
        auto_choose=True,
        on_delete=models.PROTECT,blank=True, null=True
    )
    def __str__(self):
        return self.nombre


class TipoCliente(models.Model):
    
    nombre = models.CharField(max_length=400,blank=True, null= True)
    creacion = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return str(self.nombre)

class Cliente(models.Model):
    
    codigo = models.CharField(max_length=400,blank=True, null= True)
    razonsocial = models.CharField(max_length=400,blank=True, null= True)
    rfc = models.CharField(max_length=400,blank=True, null= True)
    estado = ChainedForeignKey(
        Estado,
        show_all=False,
        auto_choose=True,
        on_delete=models.PROTECT,blank=True, null=True
    )
    ciudad = ChainedForeignKey(
        Ciudad,
        chained_field="estado",
        chained_model_field="estado",
        show_all=False,
        auto_choose=True,
        on_delete=models.PROTECT,blank=True, null=True
    )
    direccioncompleta = models.CharField(max_length=400,blank=True, null= True)
    calle = models.CharField(max_length=400,blank=True, null= True)
    numeroexterior = models.CharField(max_length=400,blank=True, null= True)
    numerointerior = models.CharField(max_length=400,blank=True, null= True)
    cp = models.CharField(max_length=400,blank=True, null= True)
    telefono = models.CharField(max_length=400,blank=True, null= True)
    creacion = models.DateTimeField(default=timezone.now, editable=False)
    lunes = models.BooleanField(default=False)
    martes = models.BooleanField(default=False)
    miercoles = models.BooleanField(default=False)
    jueves = models.BooleanField(default=False)
    viernes = models.BooleanField(default=False)
    sabado = models.BooleanField(default=False)
    domingo = models.BooleanField(default=False) 
    tipocliente = models.ForeignKey(TipoCliente, on_delete=models.PROTECT, blank=True, null=True) 
    email = models.CharField(max_length=400,blank=True, null= True)
    telefono = models.CharField(max_length=400,blank=True, null= True)
    representante = models.CharField(max_length=400,blank=True, null= True)
    nombrecomercialtxt = models.CharField(max_length=400,blank=True, null= True)

    def __str__(self):
        return str(self.razonsocial)
