from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from datetime import datetime,timedelta,date
from django.db.models.deletion import Collector
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from .models import *

# Create your views here.


def index(request):
    return redirect('/blog/login/')


def login_aux(request):
    print(settings.STATIC_ROOT)
    return redirect('/blog/login/')


def login_page(request):
    return render(request,
                  'login/login.html', {'error': ''})

def login_user(request):
    if request.method == 'POST':
        username = request.POST['user']
        password = request.POST['password']

        print(username)
        print(password)
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None and user.is_active:
            print("si")
            if Usuario.objects.filter(user=user.id).exists():
                rol = Usuario.objects.get(user=user.id)
                request.session['userrol'] = rol.rol.nombre
                print("asldkjasldkjasldjk")
                return redirect('/blog/main/')
            else:
                return render(request,'login/login.html',{'error':'Error de inicio de sesión de usuario, el usuario no existe o las credenciales son incorrectas'})
        else:
            return render(request,'login/login.html', {'error': 'Error de inicio de sesión de usuario, el usuario no existe o las credenciales son incorrectas'})
        
    else:
        return render(request,'login/login.html', {'error': 'You must use POST to login'})
        

def logout_user(request):
    if request.user.is_authenticated():
        return redirect('/blog/login')
    else:
        return redirect('/blog/main')

def main(request):

    objGrados = Grado.objects.all()
    objGrupos = Grupo.objects.all()

    return render(request,
                  'main/main.html', {'error': '','grados':objGrados,'grupos':objGrupos})

def alumnos_agregar(request):
    roles = Rol.objects.all()
    objGrados = Grado.objects.all()
    objGrupos = Grupo.objects.all()
    return render(request,
                  'alumnos/form-basic.html', {'error': '', 'roles': roles ,'grados':objGrados,'grupos':objGrupos})
def alumnos_modificar(request):

    return render(request,
                  'alumnos/modificar.html', {'error': ''})

def alumnos_guardar(request):
    if request.method == 'POST':
        nombre = request.POST['nombre1']
        apellido = request.POST['apellido']
        grado = request.POST['grado']
        grupo = request.POST['grupo']
        correo = request.POST['correo']
        direccion = request.POST['direccion']

        objAlumno = Alumno.objects.create()

        objAlumno.nombre = nombre
        objAlumno.apellido = apellido
        objAlumno.grado = Grado.objects.get(id=grado)
        objAlumno.grupo = Grupo.objects.get(id=grupo) 
        objAlumno.correo = correo
        objAlumno.direccion = direccion

        objAlumno.save()

        return redirect('/blog/main')

def pagos(request):

    objAlumnos = Alumno.objects.all()
    return render(request,'pagos/administrador.html',{'error':'','alumnos': objAlumnos})


def agregar_pagos(request):

    objAlumnos = Alumno.objects.all()
    return render(request,'pagos/form-basic.html',{'error':'','alumnos': objAlumnos})

def pagos_guardar(request):
    if request.method == 'POST':
        fecha = request.POST['fechaP']
        alumno = request.POST['alumnoP']
        monto = request.POST['montoP']

        objPago = Pago.objects.create()

        objPago.fecha = datetime.strptime(fecha, "%m/%d/%Y") 
        objPago.alumno = Alumno.objects.get(id=alumno)
        objPago.correo = monto


        objPago.save()

        return redirect('/blog/pagos')

def gastos_guardar(request):
    if request.method == 'POST':
        fecha = request.POST['fechaG']
        monto = request.POST['montoG']
        descripcion = request.POST['descripcionG']

        objGasto = Gasto.objects.create()

        objGasto.fecha = datetime.strptime(fecha, "%m/%d/%Y") 
        objGasto.monto = monto
        objGasto.descripcion = descripcion


        objGasto.save()

        return redirect('/blog/gastos')


def gastos(request):

    return render(request,'gastos/administrador.html',{'error':''})



def gastos_agregar(request):
    roles = Rol.objects.all()   
    objGrados = Grado.objects.all()
    objGrupos = Grupo.objects.all()
    return render(request,
                  'gastos/gastos_agregar.html', {'error': '', 'roles': roles ,'grados':objGrados,'grupos':objGrupos})


def estadisticas(request):

    objPagos = Pago.objects.filter(monto__isnull=False)
    pagos = 0
    for x in objPagos:
        try:
            pagos = pagos + int(x.monto)
        except:
            pagos = pagos + 0

    objGastos = Gasto.objects.all()
    gasto = 0
    for x in objGastos:
        try:
            gasto = gasto + int(x.monto)
        except:
            gasto = gasto + 0

    progresoBalance = ((pagos-gasto)*100)/(pagos+gasto)


    pagaron = Pago.objects.filter(monto__isnull=False)
    cantidadPagaron = Pago.objects.values('alumno__id').distinct().count()
    cantidadNoPagaron = Alumno.objects.all().count() - cantidadPagaron

    porcentajePagaron = cantidadPagaron * 100 / Alumno.objects.all().count()
    porcentajeNoPagaron = cantidadNoPagaron * 100 / Alumno.objects.all().count()


    objGrados = Grado.objects.all()
    objGrupos = Grupo.objects.all()

    return render(request,'estadisticas/administrador.html',{'error':'','balance':(pagos-gasto),
        'porcentajePagaron':porcentajePagaron,'porcentajeNoPagaron':porcentajeNoPagaron,
        'grados':objGrados,'grupos':objGrupos,
        'pagos':pagos,'gastos':gasto,'progresoBalance':progresoBalance})


def getPagos(request, *args, **kw):
    message = {"error": False, "message": "", "cantidadPagaron": [],"cantidadNoPagaron":[],"porcentajePagaron":[],
    "porcentajeNoPagaron":[]}
    data = []

    grado = request.POST['grado']
    grupo = request.POST['grupo']

    alumnos = Alumno.objects.all()
    if grado != "" and grado != "TODOS":
        alumnos = alumnos.filter(grado__id=grado)
    if grupo != "" and grupo != "TODOS":
        alumnos = alumnos.filter(grupo__id=grupo)

    pagaron = Pago.objects.filter(monto__isnull=False)
    cantidadPagaron = Pago.objects.filter(alumno__in=alumnos).count()
    cantidadNoPagaron = alumnos.count() - cantidadPagaron

    porcentajePagaron = cantidadPagaron * 100 / alumnos.count()
    porcentajeNoPagaron = cantidadNoPagaron * 100 / alumnos.count()

    message['cantidadPagaron'] = cantidadPagaron
    message['cantidadNoPagaron'] = cantidadNoPagaron
    message['porcentajePagaron'] = porcentajePagaron
    message['porcentajeNoPagaron'] = porcentajeNoPagaron
    
    print(message)
    return JsonResponse(message)

def getBalance(request, *args, **kw):
    message = {"error": False, "message": "", "pago": [],"gasto":[],"progresoBalance":[],
    "balance":[]}
    data = []

    fechaInicio = request.POST['fechaInicio']
    fechaFin = request.POST['fechaFin']

    pagos = Pago.objects.filter(monto__isnull=False)
    gastos = Gasto.objects.filter(monto__isnull=False)
    if fechaInicio != "" and fechaInicio != "TODOS":
        fecha = datetime.strptime(fechaInicio, "%m/%d/%Y") 
        pagos = pagos.filter(fecha__gte=fecha)
        gastos = gastos.filter(fecha__gte=fecha)
    if fechaFin != "" and fechaFin != "TODOS":
        fecha = datetime.strptime(fechaFin, "%m/%d/%Y") 
        pagos = pagos.filter(fecha__lte=fecha)
        gastos = gastos.filter(fecha__lte=fecha)

    pago = 0
    for x in pagos:
        try:
            pago = pago + int(x.monto)
        except:
            pago = pago + 0

    gasto = 0
    for x in gastos:
        try:
            gasto = gasto + int(x.monto)
        except:
            gasto = gasto + 0

    progresoBalance = ((pago-gasto)*100)/(pago+gasto)

    message['pago'] = pago
    message['gasto'] = gasto
    message['balance'] = (pago-gasto)
    message['progresoBalance'] = (pago-gasto)
    
    return JsonResponse(message)

def usuarios(request):
    return render(request,'usuarios/main.html',{'error':''})

def usuarios_agregar(request):
    return render(request,
                  'usuarios/agregar.html', {'error': ''})

def usuarios_guardar(request):
    if request.method == "POST":

        nombre = request.POST['nombre']
        apellido = request.POST['apellido']
        telefono = request.POST['telefono']
        username = request.POST['username']
        password = request.POST['password']

        objUsuario = Usuario.objects.create()

        nuser = User.objects.create_user(username, '', password)
        nuser.last_name = apellido
        nuser.is_active = True
        objUsuario.nombre = nombre
        objUsuario.user= nuser
        objUsuario.apellido = apellido
        objUsuario.telefono = telefono

        objUsuario.save()
        return render(request,'usuarios/main.html',{'error':'','hecho':True})
    else:
        return render(request,'usuarios/main.html',{'error':True})

def usuarios_editar(request,id_tipo):
    if Usuario.objects.filter(id=id_tipo).exists():
        objUsuario = Usuario.objects.get(id=id_tipo)
        print(objUsuario)
        return render(request,'usuarios/editar.html',{'error':'','obj':objUsuario})
    else:
        return render(request,'usuarios/main.html',{'error':True})

def usuarios_editar_guardar(request):
    if request.method == "POST":
        print(request.POST)
        idUsuario = request.POST['idUsuario']
        nombre = request.POST['nombre']
        apellido = request.POST['apellido']
        telefono = request.POST['telefono']

        objUsuario = Usuario.objects.get(id=idUsuario)

        objUsuario.nombre = nombre
        objUsuario.apellido = apellido
        objUsuario.telefono = telefono

        objUsuario.save()
        return render(request,'usuarios/main.html',{'error':'','hecho':True})
    else:
        return render(request,'usuarios/main.html',{'error':True})

def usuarios_eliminar(request,id_tipo):
    if Usuario.objects.filter(id=id_tipo).exists():
        error = False
        objUsuario = Usuario.objects.get(id=id_tipo)
        print(objUsuario)

        collector = Collector(using='default')
        try:
            collector.collect([Usuario])
        except Exception as e:
            error = True
            print(e)
        return render(request,'usuarios/eliminar.html',{'error':error,'obj':objUsuario})
    else:
        return render(request,'usuarios/main.html',{'error':True})


def clientes(request):
    return render(request,'clientes/main.html',{'error':''})