# Arquitetura

## Por que um app

`config` configura o projeto. `portfolio` contém as regras e os dados do portfólio.
Um único app evita fragmentação enquanto o domínio é pequeno.
Django Admin gerencia conteúdo e templates geram HTML no servidor; JavaScript controla somente a galeria.

## Caminho de uma requisição

O navegador acessa `/`; `config/urls.py` delega a `portfolio/urls.py`; a função `inicio` prepara o contexto e renderiza `portfolio/inicio.html`, que herda `base.html`.
Hoje o contexto é estático. Depois, a view consultará os modelos.

## Modelo planejado (ainda não implementado)

| Modelo | Campos principais | Regra |
| --- | --- | --- |
| Perfil | nome, título, resumo, e-mail, LinkedIn | Um único perfil nesta aplicação pessoal; chave fixa e proteção no Admin |
| Competencia | nome, descrição, ordem, ativo | Exibir apenas ativas, na ordem definida |
| Formacao | curso, instituição, situação, ordem | Não inventar datas ou conclusão |
| Trabalho | título, descrição, categoria, publicado, ordem | Rascunho por padrão; ordenação por ordem e id |
| FotoTrabalho | trabalho (FK), imagem, legenda, texto alternativo, ordem | Um trabalho tem várias fotos; texto alternativo obrigatório |

Categorias iniciais de Trabalho: tubulação TIG, caldeiraria FCAW e soldagem mecanizada. Usar TextChoices, sem tabela adicional inicialmente.
FotoTrabalho depende de Trabalho. Exclusão do trabalho remove registros de fotos por CASCADE; exclusão dos arquivos físicos exige decisão explícita, pois Django não a faz automaticamente.
Não adicionar perfil_id a todas as entidades: esta V1 atende uma única pessoa, não uma plataforma de múltiplos portfólios.

## Regras a testar nas etapas correspondentes

- Rascunho não aparece na página, nem suas fotografias.
- Ordenação de trabalhos e fotos é determinística.
- Trabalho sem foto não gera imagem quebrada.
- Usuário anônimo não consegue gerenciar conteúdo.
- Admin rejeita arquivo inválido ou acima do limite definido na etapa de imagens.

## Trade-offs

SQLite simplifica o desenvolvimento. O banco de produção será escolhido conforme a hospedagem e a necessidade de concorrência.
Fotos são arquivos de mídia, não arquivos estáticos. Servi-las em desenvolvimento e produção exige configurações diferentes.
Dados do portfólio ficam no banco; CSS/JS no Git; mídia e banco precisam de backup próprio.
Nenhuma dependência de Docker nesta fundação. Containerização pode ser avaliada se a hospedagem justificar.
