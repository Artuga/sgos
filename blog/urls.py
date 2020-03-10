"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url,include
from . import views
from .datatables_views import *

urlpatterns = [

    
    url(r'^$', views.index, name='index'),
    url(r'^login/$', views.login_page, name='login_page'),
    url(r'^login/auth$', views.login_user, name='login_user'),
    url(r'^logout/$', views.logout_user, name='logout'),


    #main
    url(r'^main/$', views.main, name='main'),

    #usuarios
    url(r'^usuarios/$', views.usuarios, name='usuarios'),
    url(r'^usuarios/agregar/$', views.usuarios_agregar, name='usuarios_agregar'),
    url(r'^usuarios/guardar$', views.usuarios_guardar, name='usuarios_guardar'),
    url(r'^usuarios/serverside$', DTUsuarios.as_view(), name='DTUsuarios'),
    url(r'^usuarios/editar/(?P<id_tipo>[-\w]+)$', views.usuarios_editar, name='usuarios_editar'),
    url(r'^usuarios/editar_usuario/guardar$', views.usuarios_editar_guardar, name='usuarios_editar_guardar'),
    url(r'^usuarios/eliminar/(?P<id_tipo>[-\w]+)$', views.usuarios_eliminar, name='usuarios_eliminar'),
    url(r'^usuarios/eliminar/ok$', views.usuarios_eliminar_ok, name='usuarios_eliminar_ok'),

    #clientes
    url(r'^clientes/$', views.clientes, name='usuarios'),
    url(r'^clientes/agregar/$', views.clientes_agregar, name='clientes_agregar'),
    url(r'^clientes/guardar$', views.clientes_guardar, name='clientes_guardar'),
    url(r'^clientes/serverside$', DTClientes.as_view(), name='DTClientes'),
    url(r'^clientes/editar/(?P<id_tipo>[-\w]+)$', views.clientes_editar, name='clientes_editar'),
    url(r'^clientes/editar_cliente/guardar$', views.clientes_editar_guardar, name='clientes_editar_guardar'),
    url(r'^clientes/eliminar/(?P<id_tipo>[-\w]+)$', views.clientes_eliminar, name='usuarios_eliminar'),
    

]
