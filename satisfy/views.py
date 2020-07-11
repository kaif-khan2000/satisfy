from django.shortcuts import render,HttpResponse
from .models import song
# Create your views here.
def home(request):
    songs = song.objects.all()
    return render(request,'satisfy/home.html',{'songs':songs})