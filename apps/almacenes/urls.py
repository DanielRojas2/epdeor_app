from django.urls import path
from .views.almacen import almacen

urlpatterns = [
    path('almacenes/', almacen, name='almacenes'),
]
