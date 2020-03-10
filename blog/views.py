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

def usuarios_eliminar_ok(request):
    if request.method == "POST":
        idUsuario = request.POST['idUsuario']

        objUsuario = Usuario.objects.get(id=idUsuario)
        objUsuario.delete()
        return render(request,'usuarios/main.html',{'error':'','hecho':True})

def clientes(request):
    return render(request,'clientes/main.html',{'error':''})

def clientes_agregar(request):
    return render(request,
                  'clientes/agregar.html', {'error': ''})

def clientes_guardar(request):
    if request.method == "POST":

        codigo = request.POST['codigo']
        razonsocial = request.POST['razonsocial']
        rfc = request.POST['rfc']
        estado = request.POST['estado']
        ciudad = request.POST['ciudad']
        calle = request.POST['calle']
        numeroexterior = request.POST['nexterior']
        numerointerior = request.POST['ninterior']
        cp = request.POST['cp']
        direccioncompleta = request.POST['direccion']

        objCliente = Cliente.objects.create()

        objCliente.codigo = codigo
        objCliente.razonsocial = razonsocial
        objCliente.rfc = rfc
        #objCliente.estado = Estado.objects.get(id=estado)
        #objCliente.ciudad = Ciudad.objects.get(id=ciudad)
        objCliente.calle = calle
        objCliente.numeroexterior = numeroexterior
        objCliente.numerointerior = numerointerior
        objCliente.cp = cp
        objCliente.direccioncompleta = direccioncompleta
        
        objCliente.save()
        return render(request,'clientes/main.html',{'error':'','hecho':True})
    else:
        return render(request,'clientes/main.html',{'error':True})

def clientes_editar(request,id_tipo):
    if Cliente.objects.filter(id=id_tipo).exists():
        objCliente = Cliente.objects.get(id=id_tipo)
        print(objCliente)
        return render(request,'clientes/editar.html',{'error':'','obj':objCliente})
    else:
        return render(request,'clientes/main.html',{'error':True})

def clientes_editar_guardar(request):
    if request.method == "POST":
        print(request.POST)
        idCliente = request.POST['idCliente']
        codigo = request.POST['codigo']
        razonsocial = request.POST['razonsocial']
        rfc = request.POST['rfc']
        estado = request.POST['estado']
        ciudad = request.POST['ciudad']
        calle = request.POST['calle']
        numeroexterior = request.POST['nexterior']
        numerointerior = request.POST['ninterior']
        cp = request.POST['cp']
        direccioncompleta = request.POST['direccion']

        objCliente = Cliente.objects.get(id=idCliente)

        objCliente.codigo = codigo
        objCliente.razonsocial = razonsocial
        objCliente.rfc = rfc
        #objCliente.estado = Estado.objects.get(id=estado)
        #objCliente.ciudad = Ciudad.objects.get(id=ciudad)
        objCliente.calle = calle
        objCliente.numeroexterior = numeroexterior
        objCliente.numerointerior = numerointerior
        objCliente.cp = cp
        objCliente.direccioncompleta = direccioncompleta

        objCliente.save()
        return render(request,'clientes/main.html',{'error':'','hecho':True})
    else:
        return render(request,'clientes/main.html',{'error':True})

def clientes_eliminar(request,id_tipo):
    if Cliente.objects.filter(id=id_tipo).exists():
        error = False
        objCliente = Cliente.objects.get(id=id_tipo)
        print(objCliente)

        collector = Collector(using='default')
        try:
            collector.collect([Usuario])
        except Exception as e:
            error = True
            print(e)
        return render(request,'clientes/eliminar.html',{'error':error,'obj':objCliente})
    else:
        return render(request,'clientes/main.html',{'error':True})

def clientes_eliminar_ok(request):
    if request.method == "POST":
        idCliente = request.POST['idCliente']

        objCliente = Usuario.objects.get(id=idCliente)
        objCliente.delete()
        return render(request,'clientes/main.html',{'error':'','hecho':True})