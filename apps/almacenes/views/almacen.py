from django.shortcuts import render
from ..models.Almacen import Almacen

def almacen(request):
    almacenes = Almacen.objects.filter(estado_almacen='activo').all()
    return render(request, 'almacenes/almacen_list.html')
