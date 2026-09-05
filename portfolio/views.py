from django.shortcuts import render


def inicio(request):
    """Primeiro fluxo URL -> view -> template; dados estáticos nesta etapa."""
    return render(request, "portfolio/inicio.html", {
        "nome": "Aldomar Assolin",
        "titulo": "Soldador e Técnico em Soldagem",
        "subtitulo": "Experiência prática, qualidade e evolução contínua."
    })
