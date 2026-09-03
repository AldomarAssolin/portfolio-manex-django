# Primeira sessão — executar e entender

**Duração sugerida: 45 a 60 minutos. Objetivo: ver o projeto rodar e compreender URL, view e template.**

## 1. Executar (15 minutos)

Extraia a pasta, abra-a no editor e siga os comandos do README.
A página deve mostrar Aldomar Assolin e Soldador e Técnico em Soldagem.
`python manage.py check` deve terminar sem problemas.
`migrate` prepara tabelas internas de autenticação e sessões; ainda não há modelos de negócio.

## 2. Percorrer o código (15 minutos)

Leia nesta ordem:

1. `manage.py`: escolhe a configuração e executa comandos.
2. `config/settings.py`: registra apps, templates, banco e idioma.
3. `config/urls.py`: delega a URL pública ao app.
4. `portfolio/urls.py`: associa a rota à função.
5. `portfolio/views.py`: fornece dados para a página.
6. `templates/portfolio/inicio.html`: apresenta esses dados.
7. `templates/base.html`: mantém a estrutura HTML compartilhada.

Analogia: URL é a entrada da ordem de serviço; view coordena o atendimento; template apresenta o resultado. O model, introduzido depois, representa os dados persistidos.

## 3. Primeira alteração — PM-002 (20 minutos)

Crie a branch conforme `05-fluxo-git.md` antes de editar.
Adicione ao contexto da view uma chave `subtitulo`, com o texto `Experiência prática, qualidade e evolução contínua.`
Exiba esse valor em um parágrafo no template, usando `{{ subtitulo }}`.
Não escreva o mesmo texto diretamente no HTML: o propósito é praticar o envio de dados da view.
Atualize o navegador e confira o resultado em uma janela estreita.

Aceite: frase visível uma única vez; título e link continuam funcionando; check sem problemas.
Registre o que mudou com `git diff`. Faça o commit orientado pelo guia.

## 4. Relato de retorno (5 minutos)

Informe: versão do Python, resultado do check, se a página abriu e qual arquivo define o texto exibido.
Se houver erro, envie o comando e a mensagem completa, sem senhas ou segredos.
Pare nessa entrega. O próximo passo é implementar o modelo Perfil com explicação de campos e migrações.

## Diagnóstico rápido

- `No module named django`: confira ativação da `.venv` e instalação das dependências.
- `no such table`: execute `python manage.py migrate`.
- Porta em uso: `python manage.py runserver 8001` e abra a porta 8001.
- CSS não aparece: confirme que DEBUG local está ativo e use o runserver do Django.
- Pasta não encontrada: confira onde o ZIP foi extraído antes de usar `cd`.
