from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth import authenticate, login,logout
from django.http import HttpResponseRedirect

def mainaux(request):
    if request.user.is_authenticated():
        response = HttpResponseRedirect('blog/main')
        
    else:
        response = HttpResponseRedirect('blog/login/')
        
    return response