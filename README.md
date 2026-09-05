# Portfólio Manex — Django

Portfólio industrial de Aldomar Assolin (Manex), desenvolvido para apresentar experiência em soldagem, caldeiraria e soldagem mecanizada.

O projeto também funciona como aplicação prática de aprendizado em Django, incluindo modelagem de dados, formulários, administração de conteúdo, templates, testes e fluxo de desenvolvimento com Git.

## Estado atual

Aplicação em desenvolvimento local, com funcionalidades implementadas até a PM-005.

### Funcionalidades disponíveis

* Perfil profissional com nome, título, subtítulo, resumo, e-mail e LinkedIn.
* Cadastro limitado a um único perfil, com proteção no banco e no Admin.
* Página inicial alimentada pelos dados do perfil.
* Mensagem de apresentação em preparação quando não existe perfil.
* Cadastro de trabalhos com título, descrição, categoria, publicação e ordem.
* Busca por título e descrição e filtros por categoria e publicação no Admin.
* Várias imagens vinculadas a cada trabalho.
* Legenda opcional, texto alternativo obrigatório e ordenação das imagens.
* Upload com validação de tamanho, conteúdo e formato pelo formulário administrativo.

### Próximas entregas

* **PM-006:** exibir trabalhos publicados e suas imagens na página inicial.
* **PM-007:** implementar carrosséis acessíveis.
* **PM-008:** complementar competências, formação e apresentação dos contatos.
* **PM-009:** revisar a aplicação e validar a jornada completa.
* **PM-010:** preparar e publicar o ambiente de produção.

Atualmente, os trabalhos e suas imagens são gerenciados pelo Admin. O campo `publicado` armazena a decisão de publicação; seu uso na consulta da página pública será implementado na PM-006.

A versão Django ainda não foi publicada. O portfólio existente no Sites permanece independente deste desenvolvimento.

## Tecnologias

* Python.
* Django 5.2.
* SQLite no desenvolvimento.
* Templates Django, HTML e CSS.
* Pillow para processamento e validação de imagens.
* Django Admin para gerenciamento do conteúdo.
* Git e GitHub para versionamento e revisão.

## Executar localmente

### Primeira instalação

É necessário ter Git, Python e suporte à criação de ambientes virtuais. Python 3.12 é a versão recomendada para acompanhar o projeto.

No Linux:

```bash
mkdir -p ~/Workspaces/learn/python
cd ~/Workspaces/learn/python

git clone https://github.com/AldomarAssolin/portfolio-manex-django.git
cd portfolio-manex-django

python3 -m venv .venv
source .venv/bin/activate

python -m pip install -r requirements.txt

python manage.py check
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Se o repositório já estiver clonado, utilize a pasta existente.

Acesse:

* [Página inicial](http://127.0.0.1:8000/).
* [Painel administrativo](http://127.0.0.1:8000/admin/).

Não há conta ou senha pré-criada. O comando `createsuperuser` cria o administrador local.

Finalize o servidor com `Ctrl+C`.

### Retomar o desenvolvimento

```bash
cd ~/Workspaces/learn/python/portfolio-manex-django
source .venv/bin/activate
git status
python manage.py runserver
```

Após atualizar o código com alterações de dependências ou novas migrações, execute:

```bash
python -m pip install -r requirements.txt
python manage.py migrate
```

Os registros e as imagens cadastrados em outro computador não são transferidos pelo clone ou pelo pull.

## Gerenciar o conteúdo

### Perfil profissional

No Admin, cadastre o perfil e preencha os dados da apresentação.

Depois do primeiro cadastro, a criação de outro perfil fica bloqueada. O registro existente continua disponível para edição.

Ao salvar alterações e atualizar a página inicial, os novos dados são exibidos. Sem perfil cadastrado, a página apresenta uma mensagem de preparação.

### Trabalhos

Cada trabalho possui:

* Título.
* Descrição geral da atividade.
* Categoria.
* Estado de publicação.
* Ordem.

Novos trabalhos começam como rascunho, com `publicado=False`.

A ordenação utiliza `ordem` crescente e o identificador como desempate. Valores como `10`, `20` e `30` permitem inserir outros trabalhos entre os existentes.

As categorias representam tubulação TIG, caldeiraria FCAW e soldagem mecanizada FCAW.

### Imagens dos trabalhos

As imagens são adicionadas dentro da tela de edição de cada trabalho.

Cada registro possui:

* Arquivo de imagem.
* Legenda opcional.
* Texto alternativo obrigatório.
* Ordem de exibição.

O formulário aceita JPEG, PNG e WebP com até **5 MiB por arquivo**, equivalentes a `5 × 1024 × 1024` bytes.

A validação verifica o conteúdo da imagem; renomear um arquivo inválido para `.jpg` não o torna aceito.

O texto alternativo deve descrever o conteúdo visual, por exemplo:

> Vista interna de uma junta tubular com cordão de raiz TIG.

As verificações de upload são executadas pelo formulário do Admin. Futuras importações por scripts ou outras interfaces deverão aplicar validações equivalentes.

## Modelo de dados

| Modelo           | Responsabilidade                                                                   |
| ---------------- | ---------------------------------------------------------------------------------- |
| `Perfil`         | Apresentação e contatos do profissional, com no máximo um registro.                |
| `Trabalho`       | Descrição, categoria, publicação e ordenação dos trabalhos.                        |
| `ImagemTrabalho` | Arquivo, legenda, texto alternativo e ordem de uma imagem vinculada a um trabalho. |

O relacionamento entre trabalhos e imagens é de **um para muitos**: um trabalho pode possuir várias imagens, e cada imagem pertence a um trabalho.

## Arquivos de mídia e backup

O banco armazena os caminhos dos arquivos e os dados dos registros. As imagens ficam na pasta `media/`, organizadas pelo upload.

Banco local, ambiente virtual e mídia não entram no Git.

Excluir um trabalho remove seus registros de imagens por cascata. Entretanto, excluir um registro de imagem ou substituir seu arquivo **não remove automaticamente o arquivo físico antigo**.

A limpeza de arquivos sem referência será tratada antes da publicação, com backup prévio.

Para recuperar o conteúdo completo da aplicação, o backup deverá incluir:

* Banco de dados.
* Pasta de mídia.

O repositório Git preserva o código e as migrações, mas não substitui esse backup.

## Verificações

### Comandos

```bash
python manage.py check
python manage.py test portfolio
python manage.py showmigrations portfolio
git diff --check
```

### Cobertura registrada até a PM-005

* Teste automatizado da página inicial sem perfil cadastrado.
* Cadastro e edição de perfil verificados manualmente.
* Bloqueio de criação de perfil adicional verificado no Admin.
* Cadastro, busca, filtros e ordenação dos trabalhos verificados manualmente.
* Upload, abertura e ordenação de imagens verificados manualmente.
* Obrigatoriedade do texto alternativo verificada.
* Rejeição de arquivo inválido e imagem acima do limite verificada.
* Edição de legenda sem novo upload verificada.

Essas verificações não representam cobertura automatizada completa. Os testes de visibilidade dos trabalhos publicados serão acrescentados durante a integração pública.

## Configuração

`config/settings.py` lê variáveis do ambiente usando `os.environ`. Arquivos `.env` não são carregados automaticamente.

| Variável               | Comportamento                                                          |
| ---------------------- | ---------------------------------------------------------------------- |
| `DJANGO_DEBUG`         | Usa `1` por padrão no desenvolvimento local.                           |
| `DJANGO_SECRET_KEY`    | Obrigatória quando DEBUG está desativado.                              |
| `DJANGO_ALLOWED_HOSTS` | Recebe hosts separados por vírgula; o padrão utiliza endereços locais. |

O banco SQLite é preparado pelo comando `migrate`.

`MEDIA_ROOT` define a pasta dos uploads e `MEDIA_URL` define seu prefixo de acesso. As rotas de mídia locais são adicionadas somente com DEBUG ativado.

A configuração atual é voltada ao desenvolvimento. A publicação exigirá configuração própria para segredo, hosts, HTTPS, banco, arquivos estáticos, mídia persistente e backup.

`runserver` não deve ser utilizado como servidor de produção.

## Dependências

`requirements.txt` declara as dependências atuais, incluindo Django e Pillow.

A faixa `Django>=5.2,<5.3` mantém o projeto na série 5.2 e permite atualizações de correção.

`requirements-validado.txt` foi gerado na validação da fundação. Até ser atualizado e validado novamente, deve ser tratado como registro histórico, não como reprodução completa do ambiente atual.

## Documentação de desenvolvimento

* [Primeira execução e tarefa prática](docs/04-primeira-execucao.md)
* [Escopo e regras](docs/01-escopo.md)
* [Arquitetura](docs/02-arquitetura.md)
* [Backlog e critérios de aceite](docs/03-backlog.md)
* [Fluxo de Git](docs/05-fluxo-git.md)
* [Progresso e retomada](docs/06-progresso.md)
* [Validação da fundação](docs/07-validacao.md)

Os documentos produzidos na fundação podem conter descrições históricas. Sua atualização deve acompanhar a evolução das tarefas.

O desenvolvimento segue o fluxo:

**Branch da tarefa → implementação → validação → commit → push → PR → merge → atualização local → limpeza das branches.**

## Referências

* [Documentação Django 5.2](https://docs.djangoproject.com/en/5.2/)
* [Tutorial oficial](https://docs.djangoproject.com/en/5.2/intro/tutorial01/)
* [Documentação do Pillow](https://pillow.readthedocs.io/)

O escopo deste projeto é um portfólio industrial gerenciável. Machine learning e deep learning não fazem parte desta versão.
