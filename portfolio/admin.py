from django.contrib import admin

from .models import Perfil, Trabalho


@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    """Classe de administração do modelo Perfil."""
    list_display = ("nome", "titulo", "email")

    def has_add_permission(self, request):
        """Restringe a adição de novos perfis."""
        pode_adicionar = super().has_add_permission(request)
        existe_perfil = Perfil.objects.exists()

        return pode_adicionar and not existe_perfil

@admin.register(Trabalho)
class TrabalhoAdmin(admin.ModelAdmin):
    """Classe de administração do modelo Trabalho."""
    list_display = ("titulo", "categoria", "publicado", "ordem")
    list_filter = ("categoria", "publicado")
    search_fields = ("titulo", "descricao")
    ordering = ("ordem", "id")
