from django.contrib import admin

from .models import Perfil


@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    """Classe de administração do modelo Perfil."""
    list_display = ("nome", "titulo", "email")

    def has_add_permission(self, request):
        """Restringe a adição de novos perfis."""
        pode_adicionar = super().has_add_permission(request)
        existe_perfil = Perfil.objects.exists()

        return pode_adicionar and not existe_perfil
