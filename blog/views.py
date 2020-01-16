from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
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
        user = authenticate(username=username, password=password)
        if user is not None and user.is_active:
            if Usuario.objects.filter(user=user.id).exists():
                rol = Usuario.objects.get(user=user.id)
                request.session['userrol'] = rol.rol.nombre
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

    return render(request,'pagos/administrador.html',{'error':''})


def gastos(request):

    return render(request,'gastos/administrador.html',{'error':''})


def gastos_agregar(request):
    roles = Rol.objects.all()   
    objGrados = Grado.objects.all()
    objGrupos = Grupo.objects.all()
    return render(request,
                  'gastos/form-basic.html', {'error': '', 'roles': roles ,'grados':objGrados,'grupos':objGrupos})