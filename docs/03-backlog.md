# Backlog de implementação

As tarefas têm duração apenas estimada. PM-001 a PM-006 foram integradas; PM-007 está implementada, com limitações de validação registradas no seu guia. As issues do GitHub detalham as próximas entregas.

| ID | Entrega | Dependência | Estimativa | Estado |
| --- | --- | --- | --- | --- |
| PM-001 | Fundação e execução local | — | 1 sessão | Integrada |
| PM-002 | Apresentação via contexto | PM-001 | 1 sessão | Integrada |
| PM-003 | Perfil profissional no banco e Admin | PM-002 | 2 sessões | Integrada |
| PM-004 | Trabalhos e publicação | PM-003 | 2 sessões | Integrada |
| PM-005 | Fotografias e ordenação | PM-004 | 2–3 sessões | Integrada |
| PM-006 | Página alimentada pelo banco | PM-005 | 2 sessões | Integrada |
| PM-007 | Carrosséis acessíveis | PM-006 | 2–3 sessões | Implementada; revisão visual pendente |
| PM-008 | Competências, formação e contatos | PM-006 | 2 sessões | Planejada |
| PM-009 | Revisão integrada da V1 | PM-007, PM-008 | 1–2 sessões | Planejada |
| PM-010 | Preparação de produção e publicação | PM-009 | A definir com hospedagem | Planejada |

## PM-001 — Fundação

Objetivo: ambiente reproduzível. Arquivos: configuração, URLs, view e templates iniciais.
Aceite: dependências instaladas; `check` sem problemas; migrações aplicadas; página abre no endereço local.
Registrar a base no Git conforme o guia. Não rodar `startproject` sobre esta pasta: a estrutura já existe.

## PM-002 — Contexto e template

Objetivo: entender como Python envia dados ao HTML.
Arquivos: `portfolio/views.py`, `templates/portfolio/inicio.html`.
Aceite: subtítulo vindo da view aparece uma vez na página, sem quebrar título ou contato.
Roteiro completo em `04-primeira-execucao.md`.

## PM-003 — Perfil

Objetivo: aprender model, migração e Admin.
Criar Perfil com nome, título, resumo, e-mail e LinkedIn, conforme arquitetura.
Restringir a um registro com chave fixa e impedir criação de outro pelo Admin.
Aceite: editar pelo Admin altera os dados persistidos; segundo perfil não pode ser criado; ausência do perfil é tratada sem erro na página quando integrada.
Verificação: criar e editar, fechar e abrir novamente; testar a regra de registro único.

## PM-004 — Trabalhos

Objetivo: representar publicação e categoria.
Criar Trabalho com título, descrição, categoria (TextChoices), publicado=False e ordem.
Admin com busca por título, filtro por categoria/publicação e listagem com ordem.
Aceite: administrador cadastra um rascunho e outro publicado; ambos persistem com estados corretos.
Adicionar teste de regra de publicação na consulta pública quando ela for integrada.

## PM-005 — Fotografias

Objetivo: relação 1:N e upload.
Adicionar Pillow; criar FotoTrabalho com FK, ImageField, legenda, texto alternativo obrigatório e ordem.
Definir limite de 5 MB por imagem; aceitar JPEG, PNG e WebP; validar conteúdo da imagem pelo fluxo do formulário.
Configurar edição inline no Admin e servir MEDIA apenas no desenvolvimento.
Aceite: cadastrar e ordenar duas fotos; arquivo inválido e acima do limite são rejeitados; form e modelo têm responsabilidades compreendidas.
Registrar política de remoção: nesta V1 a exclusão do registro não apaga automaticamente o arquivo; documentar limpeza e backup antes da publicação.

## PM-006 — Integração pública

Objetivo: consultas e template loops.
Consultar somente trabalhos publicados, ordenar por ordem/id e usar prefetch_related para fotos.
Aceite: rascunho e suas fotos ausentes do HTML; ordem previsível; perfil ausente e trabalho sem foto tratados; sem imagem quebrada.
Testes automatizados: visibilidade e ordenação com dados reais de teste.

## PM-007 — Carrosséis

Objetivo: JavaScript progressivo em cima do HTML gerado.
Botões anterior/próximo, contador, miniaturas, teclado e gesto no celular.
Aceite: três galerias funcionam independentemente; botões acessíveis; foco visível; 0/1/múltiplas fotos tratados; sem autoplay; conteúdo continua acessível sem JS.
Verificação manual com teclado, janela estreita e dispositivo móvel quando disponível.
Implementação, testes de DOM e limitações: [guia da PM-007](pm-007-carrosseis.md).

## PM-008 — Conteúdo complementar

Objetivo: consolidar CRUD e apresentação.
Criar Competencia e Formacao, registrar no Admin e renderizar ativos/ordenados.
Adicionar e-mail e LinkedIn a partir do Perfil. Usar conteúdo profissional já aprovado.
Aceite: alterações no Admin refletem no site; links corretos; sem alegações ou qualificações inventadas.

## PM-009 — Revisão

Objetivo: validar a jornada completa e o conteúdo.
Executar testes das regras de negócio, check e revisão visual em desktop/celular.
Aceite: criar trabalho, enviar fotos, publicar, reordenar e ocultar funciona ponta a ponta; descrições gerais e imagens selecionadas para publicação.
Registrar limitações e erros restantes antes de avançar.

## PM-010 — Publicação

Objetivo: operação persistente, com configuração própria de produção.
Escolher hospedagem compatível com Django; definir banco, mídia persistente, backup/restauração, estáticos, WSGI/ASGI, segredo, hosts e HTTPS.
Aceite: `check --deploy` avaliado no ambiente de produção; DEBUG desativado; uploads e banco sobrevivem a novo deploy; Admin protegido; backup recuperável; smoke test público.
Atualizar dependências e documentação no momento da publicação. Migrar domínio somente se solicitado; preservar a V1 existente durante o desenvolvimento.
