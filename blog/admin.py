from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Usuario)
admin.site.register(Rol)
admin.site.register(Grado)
admin.site.register(Grupo)
admin.site.register(Alumno)
admin.site.register(Pago)
admin.site.register(Gasto)