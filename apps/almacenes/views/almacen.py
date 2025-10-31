from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.http import HttpResponse
from django.template.loader import render_to_string
from ..models.Almacen import Almacen
from ..forms.AlmacenForm import AlmacenForm

def almacen(request):
    almacenes = Almacen.objects.filter(estado_almacen='activo')
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        html = render_to_string('almacenes/partials/almacen_cards.html', {'almacenes': almacenes})
        return HttpResponse(html)
    return render(request, 'almacenes/almacen_list.html', {'almacenes': almacenes})


def almacen_create(request):
    if request.method == 'POST':
        form = AlmacenForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('almacenes')
    else:
        form = AlmacenForm()
    action_url = reverse('almacen_create')
    return render(request, 'almacenes/almacen_form.html', {'form': form, 'title': 'Registrar Almacén'})


def almacen_update(request, pk):
    almacen = get_object_or_404(Almacen, pk=pk)
    if request.method == 'POST':
        form = AlmacenForm(request.POST, instance=almacen)
        if form.is_valid():
            form.save()
            return redirect('almacenes')
    else:
        form = AlmacenForm(instance=almacen)
    action_url = reverse('almacen_update', args=[almacen.pk])
    return render(request, 'almacenes/almacen_form.html', {'form': form, 'title': f'Editar {almacen}'})


def almacen_delete(request, pk):
    almacen = get_object_or_404(Almacen, pk=pk)
    if request.method == 'POST':
        almacen.estado_almacen = 'inactivo'
        almacen.save()
        return redirect('almacen')
    action_url = reverse('almacen_delete', args=[almacen.pk])
    return render(request, 'almacenes/almacen_confirm_delete.html', {'almacen': almacen})
