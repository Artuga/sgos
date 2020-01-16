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

def pagos(request):

    return render(request,'pagos/administrador.html',{'error':''})