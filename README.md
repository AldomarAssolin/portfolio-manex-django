# Portfólio Manex — Django

Portfólio industrial de Aldomar Assolin (Manex), desenvolvido de forma guiada para praticar Django com um produto real.

## Estado desta entrega

**Fundação local pronta.** Inclui configuração, app `portfolio`, URL inicial, view, template, CSS e planejamento.
A página inicial é um ponto de partida funcional, não uma reprodução completa do site existente.
Os modelos de negócio, cadastros, galerias e publicação ainda serão desenvolvidos.
O site atual permanece independente; nenhum deploy ou repositório remoto foi alterado.

## Comece aqui

1. Extraia o pacote em `~/Workspaces/projects/`, obtendo a pasta `portfolio-manex`.
2. Execute no Linux (Python 3.12 recomendado):

```bash
cd ~/Workspaces/projects/portfolio-manex
python3 --version
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python manage.py check
python manage.py migrate
python manage.py runserver
```

Abra http://127.0.0.1:8000/ no navegador. Finalize o servidor com `Ctrl+C`.
Em outra sessão de terminal, entre na pasta e ative a `.venv` novamente.
Se `venv` não estiver disponível no Ubuntu/Mint, instale o pacote correspondente à sua versão de Python antes de continuar.

Opcional: depois das migrações, execute `python manage.py createsuperuser` para criar sua conta local e acesse `/admin/`.
Neste estágio, o painel contém apenas usuários e grupos do Django; não existem cadastros do portfólio ainda.
Não há conta ou senha pré-criada no pacote.

## Desenvolvimento

- [Primeira execução e tarefa prática](docs/04-primeira-execucao.md)
- [Escopo e regras](docs/01-escopo.md)
- [Arquitetura e modelo planejado](docs/02-arquitetura.md)
- [Backlog e critérios de aceite](docs/03-backlog.md)
- [Fluxo de Git](docs/05-fluxo-git.md)
- [Progresso e retomada](docs/06-progresso.md)
- [Validação desta entrega](docs/07-validacao.md)

## Configuração

SQLite é criado por `migrate`. Banco, ambientes virtuais e uploads não entram no Git.
`config/settings.py` lê variáveis reais do ambiente com `os.environ`; não carrega arquivos `.env` automaticamente.
No ambiente local, `DJANGO_DEBUG` é `1` por padrão e a chave é explicitamente de desenvolvimento.
Sem DEBUG, é obrigatório fornecer `DJANGO_SECRET_KEY`. Essa proteção não substitui a preparação de produção.
`DJANGO_ALLOWED_HOSTS` recebe hosts separados por vírgula; por padrão aceita somente endereços locais.
Nunca publique usando `runserver` ou a configuração local como configuração final de produção.

## Dependências e fontes

A faixa `Django>=5.2,<5.3` mantém a série LTS e permite atualizações de correção.
`requirements-validado.txt` registra as versões efetivamente usadas na verificação desta entrega; para reproduzi-las, instale esse arquivo em vez de `requirements.txt`.
Pillow será adicionado junto à implementação de imagens.

- [Documentação Django 5.2](https://docs.djangoproject.com/en/5.2/)
- [Versões e suporte](https://www.djangoproject.com/download/)
- [Tutorial oficial](https://docs.djangoproject.com/en/5.2/intro/tutorial01/)

Os PDFs fornecidos tratam de aprendizado de IA com Python. Aproveitamos o método prático e modular; machine learning e deep learning não fazem parte deste portfólio.
