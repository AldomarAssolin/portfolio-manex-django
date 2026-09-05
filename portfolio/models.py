from django.db import models


class Perfil(models.Model):
    """Modelo de perfil do usuario."""
    nome = models.CharField("nome", max_length=150)
    titulo = models.CharField("titulo profissional", max_length=150)
    subtitulo = models.CharField("subtitulo profissional", max_length=250, blank=True)
    resumo = models.TextField("resumo profissional")
    email = models.EmailField("email")
    linkedin = models.URLField("linkedin", max_length=300)

    class Meta:
        verbose_name = "perfil profissional"
        verbose_name_plural = "perfis profissionais"

    def __str__(self):
        return self.nome