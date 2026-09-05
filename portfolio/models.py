from django.db import models


class Perfil(models.Model):
    """Modelo de perfil do usuario."""
    id = models.PositiveBigIntegerField(
        primary_key=True,
        default=1,
        editable=False
    )
    nome = models.CharField("nome", max_length=150)
    titulo = models.CharField("titulo profissional", max_length=150)
    subtitulo = models.CharField("subtitulo profissional", max_length=250, blank=True)
    resumo = models.TextField("resumo profissional")
    email = models.EmailField("email")
    linkedin = models.URLField("linkedin", max_length=300)

    class Meta:
        verbose_name = "perfil profissional"
        verbose_name_plural = "perfis profissionais"
        constraints = [
            models.CheckConstraint(
                condition=models.Q(id=1),
                name="portfolio_perfil_id_igual_1",
            ),
        ]

    def __str__(self):
        return self.nome