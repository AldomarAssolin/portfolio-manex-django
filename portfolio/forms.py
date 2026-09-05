from django import forms

from .models import ImagemTrabalho


class ImagemPortfolioField(forms.ImageField):
    """Valida tamanho, conteúdo e formato das imagens enviadas."""

    def to_python(self,data):
        """Valida o tamanho, conteúdo e formato da imagem."""

        if data is not None and data.size> 5 * 1024 * 1024:
            raise forms.ValidationError("A imagem não pode ter mais de 5MB.")

        imagem = super().to_python(data)

        if imagem is not None:
            formato = imagem.image.format

            if formato not in ["JPEG", "PNG", "WEBP"]:
                raise forms.ValidationError("A imagem deve estar no formato JPEG, PNG ou WEBP.")

        return imagem

class ImagemTrabalhoForm(forms.ModelForm):
    """Formulário para o modelo ImagemTrabalho com validação de imagem."""

    imagem = ImagemPortfolioField(
        label="Imagem",
        help_text="A imagem deve estar no formato JPEG, PNG ou WEBP e não pode ter mais de 5MB.",
    )

    class Meta:
        model = ImagemTrabalho
        fields = [
            "imagem",
            "legenda",
            "texto_alternativo",
            "ordem"
        ]