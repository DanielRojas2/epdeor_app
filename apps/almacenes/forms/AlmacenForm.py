from django import forms
from ..models.Almacen import Almacen

class AlmacenForm(forms.ModelForm):
    class Meta:
        model = Almacen
        fields = ['nro_almacen', 'tipo_almacen', 'ubicacion', 'estado_almacen']
        widgets = {
            'ubicacion': forms.Textarea(attrs={'rows': 3, 'class': 'form-control'}),
            'nro_almacen': forms.NumberInput(attrs={'class': 'form-control'}),
            'tipo_almacen': forms.Select(attrs={'class': 'form-select'}),
            'estado_almacen': forms.Select(attrs={'class': 'form-select'}),
        }
