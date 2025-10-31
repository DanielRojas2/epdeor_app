from django import forms
from ..models.Estante import Estante

class EstanteForm(forms.ModelForm):
    class Meta:
        model = Estante
        fields = ['nro_estante', 'descripcion_estante']
        widgets = {
            'nro_estante': forms.NumberInput(attrs={'class': 'form-control', 'min': 1}),
            'descripcion_estante': forms.Textarea(attrs={'class': 'form-control', 'rows': 2}),
        }
        labels = {
            'nro_estante': 'Número de Estante',
            'descripcion_estante': 'Descripción',
        }
