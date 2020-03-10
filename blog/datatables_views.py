from django_datatables_view.base_datatable_view import BaseDatatableView
from django.db.models import Q, F
from .models import *
from datetime import datetime,timedelta,date
import json
from operator import and_ 
from django.db.models.functions import Length

class DTUsuarios(BaseDatatableView):
	order_columns = ['id','user__username', 'nombre', 'apellido', 'celular', 'activo', 'rol', '', '']

	def get_initial_queryset(self):
		q = Usuario.objects.all()
		date = self.request.GET.get(u'date', '')
		dateto = self.request.GET.get(u'dateto', '')
		if date != "" and dateto != "":
			date += " 00:00:00"
			dateto += " 23:59:59"
			dates = [date, dateto]
			q = q.filter(creationdate__range=dates)

		return q

	def filter_queryset(self, qs):
		search_global = self.request.POST.get(u'search[value]', None).split("|")
		if len(search_global) > 1:
			if search_global[0] != "":
				fecha_inicio = str(datetime.strptime(str(search_global[0])[0:10],"%m/%d/%Y"))
				qs = qs.filter(fecha__gte=fecha_inicio)
			if search_global[1] != "":
				fecha_fin = str(datetime.strptime(str(search_global[1])[0:10],"%m/%d/%Y"))
				qs = qs.filter(fecha__lte=fecha_fin)
		
		return qs

	def prepare_results(self, qs):
		json_data = []
		print(qs)
		for item in qs:
			json_data.append({
				'usuario': str(item.user),
				'nombre': str(item.nombre),
				'apellido': str(item.apellido),
				'opciones': str("<a class='btn btn-info btn-circle btn-md m-r-6' data-toggle='tooltip' style='background-color: #23629F; padding-top: 14px; border-color: #23629F' title='Editar' href='/blog/usuarios/editar/" + str(item.id) + "';> <i class='fa fa-pencil'></i></a>""<a class='btn btn-info btn-circle btn-nd m-r-6' data-toggle='tooltip' style='background-color: #bf3026; padding-top: 14px; border-color: #bf3026' title='Borrar' href='/blog/usuarios/eliminar/" + str(item.id) + "';> <i class='fa fa-trash'></i></a>"),
			  
			})
		return json_data

class DTClientes(BaseDatatableView):
	order_columns = ['id','user__username', 'nombre', 'apellido', 'celular', 'activo', 'rol', '', '']

	def get_initial_queryset(self):
		q = Cliente.objects.all()
		date = self.request.GET.get(u'date', '')
		dateto = self.request.GET.get(u'dateto', '')
		if date != "" and dateto != "":
			date += " 00:00:00"
			dateto += " 23:59:59"
			dates = [date, dateto]
			q = q.filter(creationdate__range=dates)

		return q

	def filter_queryset(self, qs):
		search_global = self.request.POST.get(u'search[value]', None).split("|")
		if len(search_global) > 1:
			if search_global[0] != "":
				fecha_inicio = str(datetime.strptime(str(search_global[0])[0:10],"%m/%d/%Y"))
				qs = qs.filter(fecha__gte=fecha_inicio)
			if search_global[1] != "":
				fecha_fin = str(datetime.strptime(str(search_global[1])[0:10],"%m/%d/%Y"))
				qs = qs.filter(fecha__lte=fecha_fin)
		
		return qs

	def prepare_results(self, qs):
		json_data = []
		print(qs)
		for item in qs:
			json_data.append({
				'codigo': str(item.codigo),
				'razonsocial': str(item.razonsocial),
				'estado': str(item.estado),
				'ciudad': str(item.ciudad),
				'telefono': str(item.telefono),
				'opciones': str("<a class='btn btn-info btn-circle btn-md m-r-6' data-toggle='tooltip' style='background-color: #23629F; padding-top: 14px; border-color: #23629F' title='Editar' href='/blog/clientes/editar/" + str(item.id) + "';> <i class='fa fa-pencil'></i></a>""<a class='btn btn-info btn-circle btn-nd m-r-6' data-toggle='tooltip' style='background-color: #bf3026; padding-top: 14px; border-color: #bf3026' title='Borrar' href='/blog/clientes/eliminar/" + str(item.id) + "';> <i class='fa fa-trash'></i></a>"),
			  
			})
		return json_data