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
		search = self.request.GET.get(u'search[value]', None)
		
		if search:
			qs = qs.filter(Q(nombre__icontains=search)|Q(apellido__icontains=search))
		return qs

	def prepare_results(self, qs):
		json_data = []
		for item in qs:
			print(item)
			json_data.append({
				'nombre': str(item.nombre),
                'apellido': str(item.apellido),
                'grado': str(item.grado),
                'grupo': str(item.grupo),
                'correo': str(item.correo),
                "direccion": str(item.direccion),
              
			})
		return json_data