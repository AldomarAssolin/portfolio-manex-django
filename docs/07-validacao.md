# Validação da fundação

Verificação no ambiente de preparação em 03/09/2026.

- Python 3.12.13; Django 5.2.17. Dependências exatas em requirements-validado.txt.
- `python manage.py check`: sem problemas.
- `python manage.py migrate --noinput`: todas as migrações internas aplicadas em banco novo.
- `python manage.py makemigrations --check --dry-run`: sem alterações pendentes.
- Cliente de teste do Django: página inicial HTTP 200 com nome e referência ao CSS; Admin redireciona visitante anônimo; tela de login HTTP 200; rota inexistente HTTP 404.
- Localizador de estáticos encontra css/base.css.
- Sem DEBUG e sem DJANGO_SECRET_KEY, configuração recusa iniciar.

Esses testes de execução não constituem uma revisão visual em navegador. A conferência visual no computador do aluno está na PM-001.
Não existem testes de negócio nesta fundação porque os modelos ainda não foram implementados. Eles serão adicionados com as regras de publicação e ordenação.
O banco temporário usado na validação, o ambiente virtual e os arquivos de cache não foram incluídos no pacote.
