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
    url(r'^alumnos/serverside$', DTAlumnos.as_view(), name='DTAlumnos'),

    #alumnos
    url(r'^alumnos/agregar/$', views.alumnos_agregar, name='alumnos_agregar'),
    url(r'^alumnos/modificar/$', views.alumnos_modificar, name='alumnos_modificar'),
    url(r'^alumnos/guardar$', views.alumnos_guardar, name='alumnos_guardar'),

    #pagos
    url(r'^pagos/$', views.pagos, name='pagos'),
    url(r'^pagos/serverside$', DTPagos.as_view(), name='DTPagos'),
    url(r'^pagos/guardar$', views.pagos_guardar, name='pagos_guardar'),

    #gastos
    url(r'^gastos/$', views.gastos, name='gastos'),
    url(r'^gastos/agregar$', views.gastos_agregar, name='gastos_agregar'),
    

		#graficas
		 url(r'^estadisticas/$', views.estadisticas, name='estadisticas'),

]
