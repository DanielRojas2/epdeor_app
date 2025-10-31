from django.db import models
from .Almacen import Almacen

class Estante(models.Model):
    nro_estante = models.SmallIntegerField(default=0, blank=False, null=False)
    descripcion_estante = models.TextField()
    almacen = models.ForeignKey(Almacen, on_delete=models.CASCADE)

    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Estante'
        verbose_name_plural = 'Estantes'

    def __str__(self):
        return f"Estante {self.nro_estante} del Almacen {self.almacen.nro_almacen} de {self.almacen.tipo_almacen}"
