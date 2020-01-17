from django_datatables_view.base_datatable_view import BaseDatatableView
from django.db.models import Q, F
from .models import *
from datetime import datetime,timedelta,date
import json
from operator import and_ 
from django.db.models.functions import Length


class DTAlumnos(BaseDatatableView):
	order_columns = ['id','user__username', 'nombre', 'apellido', 'celular', 'activo', 'rol', '', '']

	def get_initial_queryset(self):
		q = Alumno.objects.all()
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
			if search_global[0] != "" and search_global[0] != "TODOS":
				qs = qs.filter(grado__id=search_global[0])
			if search_global[1] != "" and search_global[1] != "TODOS":
				qs = qs.filter(grupo__id=search_global[1])
		
		return qs

	def prepare_results(self, qs):
		json_data = []
		for item in qs:
			json_data.append({
				'nombre': str(item.nombre),
				'apellido': str(item.apellido),
				'grado': str(item.grado),
				'grupo': str(item.grupo),
				'correo': str(item.correo),
				"direccion": str(item.direccion),
			  
			})
		return json_data


class DTPagos(BaseDatatableView):
	order_columns = ['id','user__username', 'nombre', 'apellido', 'celular', 'activo', 'rol', '', '']

	def get_initial_queryset(self):
		q = Pago.objects.all()
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
		for item in qs:
			json_data.append({
				'alumno': str(item.alumno),
				'monto': str(item.monto),
				'fecha': str(item.fecha.strftime("%d-%m-%Y")),
			  
			})
		return json_data

class DTGastos(BaseDatatableView):
	order_columns = ['id','user__username', 'nombre', 'apellido', 'celular', 'activo', 'rol', '', '']

	def get_initial_queryset(self):
		q = Gasto.objects.all()
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
		for item in qs:
			json_data.append({
				'descripcion': str(item.descripcion),
				'monto': str(item.monto),
				'fecha': str(item.fecha.strftime("%d-%m-%Y")),
			  
			})
		return json_data