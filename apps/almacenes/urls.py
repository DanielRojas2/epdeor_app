from django.urls import path
from .views.almacen import almacen, almacen_create, almacen_delete, almacen_update

urlpatterns = [
    path('almacenes/', almacen, name='almacenes'),
    path('almacenes/crear/', almacen_create, name='almacen_create'),
    path('almacenes/editar/<int:pk>/', almacen_update, name='almacen_update'),
    path('almacenes/crear/<int:pk>/', almacen_delete, name='almacen_delete'),
]
