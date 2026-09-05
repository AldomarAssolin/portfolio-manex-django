from django.shortcuts import render

from .models import Perfil


def inicio(request):
    """Exibe a apresentação com os dados do perfil cadastrado."""
    perfil = Perfil.objects.filter(pk=1).first()

    return render(
        request,
        "portfolio/inicio.html",
        {"perfil": perfil},
    )
