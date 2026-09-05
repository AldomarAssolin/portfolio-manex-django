from django.test import TestCase


class InicioSemPerfilTests(TestCase):
    """Testes para a view de início sem perfil cadastrado."""

    def test_exibe_apresentacao_em_preparacao_sem_perfil(self):
        """Exibe a apresentação em preparação sem perfil cadastrado."""
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Apresentação em preparação")
        self.assertNotContains(response, "mailto:")