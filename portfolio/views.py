from django.shortcuts import render

from .models import Perfil, Trabalho


def inicio(request):
    """Exibe o perfil e os trabalhos publicados."""
    perfil = Perfil.objects.filter(pk=1).first()

    trabalhos = (
        Trabalho.objects
        .filter(publicado=True)
        .order_by("ordem", "id")
        .prefetch_related("imagens")
    )

    return render(
        request,
        "portfolio/inicio.html",
        {
            "perfil": perfil,
            "trabalhos": trabalhos
        },
    )
