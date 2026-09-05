from django.test import TestCase

from .models import Trabalho, ImagemTrabalho


class InicioSemPerfilTests(TestCase):
    """Testes para a view de início sem perfil cadastrado."""

    def test_exibe_apresentacao_em_preparacao_sem_perfil(self):
        """Exibe a apresentação em preparação sem perfil cadastrado."""
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Apresentação em preparação")
        self.assertNotContains(response, "mailto:")


class TrabalhosPublicosTests(TestCase):
    def criar_trabalho(self, titulo, publicado=True, ordem=0):
        return Trabalho.objects.create(
            titulo=titulo,
            descricao="Descrição técnica de exemplo.",
            categoria=Trabalho.Categoria.TUBULACAO_TIG,
            publicado=publicado,
            ordem=ordem,
        )

    def test_rascunho_e_sua_imagem_nao_aparecem(self):
        self.criar_trabalho("Trabalho visível")
        rascunho = self.criar_trabalho(
            "Trabalho reservado",
            publicado=False,
        )
        ImagemTrabalho.objects.create(
            trabalho=rascunho,
            imagem="trabalhos/rascunho.jpg",
            texto_alternativo="Imagem reservada",
        )

        response = self.client.get("/")

        self.assertContains(response, "Trabalho visível")
        self.assertNotContains(response, "Trabalho reservado")
        self.assertNotContains(response, "rascunho.jpg")
        self.assertNotContains(response, "Imagem reservada")

    def test_ordena_trabalhos_e_imagens(self):
        ultimo = self.criar_trabalho("Trabalho final", ordem=20)
        primeiro = self.criar_trabalho("Trabalho inicial", ordem=10)
        empatado = self.criar_trabalho("Trabalho intermediário", ordem=10)

        for nome, ordem in [
            ("foto-final", 20),
            ("foto-inicial", 10),
            ("foto-intermediaria", 10),
        ]:
            ImagemTrabalho.objects.create(
                trabalho=primeiro,
                imagem=f"trabalhos/{nome}.jpg",
                texto_alternativo=nome,
                ordem=ordem,
            )

        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        html = response.content.decode()

        titulos = [primeiro.titulo, empatado.titulo, ultimo.titulo]
        posicoes = [html.index(titulo) for titulo in titulos]
        self.assertEqual(posicoes, sorted(posicoes))

        arquivos = [
            "foto-inicial.jpg",
            "foto-intermediaria.jpg",
            "foto-final.jpg",
        ]
        posicoes = [html.index(arquivo) for arquivo in arquivos]
        self.assertEqual(posicoes, sorted(posicoes))
        self.assertContains(response, 'alt="foto-inicial"')

    def test_trabalho_sem_imagens_continua_visivel(self):
        self.criar_trabalho("Trabalho sem fotografias")

        response = self.client.get("/")

        self.assertContains(response, "Trabalho sem fotografias")
        self.assertContains(response, "Fotografias em preparação.")
        self.assertNotContains(response, "<img")

    def test_sem_trabalhos_publicados_exibe_mensagem(self):
        self.criar_trabalho("Rascunho interno", publicado=False)

        response = self.client.get("/")

        self.assertContains(
            response,
            "Novos trabalhos serão apresentados em breve.",
        )
        self.assertNotContains(response, "Rascunho interno")
