# PM-007 — Carrosséis por trabalho

Issue: [#6](https://github.com/AldomarAssolin/portfolio-manex-django/issues/6).

## Comportamento

O Django continua consultando trabalhos publicados e gerando todo o HTML das fotografias, na ordem cadastrada. O script `static/js/carrosseis.js`, carregado com `defer` no bloco `scripts` da página inicial, transforma cada galeria com duas ou mais fotos em um carrossel independente.

Sem JavaScript, todas as imagens e legendas continuam visíveis na grade responsiva. Os controles são criados antes de ocultar os slides; galerias vazias preservam a mensagem existente e galerias de uma foto não recebem controles. Não há nova migração, biblioteca de interface, build ou mudança no Admin.

Cada carrossel possui navegação circular, contador, miniaturas e estado próprio. A imagem utiliza `object-fit: contain` para preservar seu enquadramento. O script conserva legenda e texto alternativo cadastrados.

## Interação e acessibilidade

- Anterior, próxima e miniaturas são botões nativos com nomes acessíveis. Enter e Espaço usam a ativação nativa do navegador.
- Tab e Shift+Tab seguem a ordem normal, com contorno de foco visível. Trocar de fotografia não reposiciona o foco.
- As setas esquerda/direita navegam somente quando o evento vem de dentro do carrossel. Campos editáveis e teclas modificadoras são respeitados.
- O contador é uma região de status com anúncio educado (`aria-live="polite"`). A galeria recebe o nome do trabalho; cada slide informa sua posição.
- Slides inativos recebem `hidden`; somente a fotografia atual permanece disponível para leitura. A miniatura atual usa `aria-disabled` sem retirar o botão da sequência de foco.
- Um gesto horizontal de pelo menos 45 px, predominante sobre o deslocamento vertical, troca a foto. Eventos cancelados ou um segundo contato cancelam o gesto pendente.
- `touch-action: pan-y pinch-zoom` preserva rolagem vertical e zoom. Não há `preventDefault` nos eventos de ponteiro.
- Não há autoplay, transições ou animações, inclusive com preferência por movimento reduzido.

## Validação executada

Em 07/09/2026, no checkout de desenvolvimento com dados fictícios:

```bash
python manage.py check
python manage.py test portfolio
python manage.py makemigrations --check --dry-run
node --check static/js/carrosseis.js
git diff --check
```

Resultado: cinco testes Django passaram, configuração válida e nenhuma migração nova necessária.

O arquivo `tests/carrosseis.test.cjs` utiliza o executor de testes do Node e jsdom, apenas para desenvolvimento. Com Node 24, instale essa dependência fora do projeto e execute:

```bash
npm install --prefix /tmp/pm007-dom jsdom@30.0.1
NODE_PATH=/tmp/pm007-dom/node_modules node --test tests/carrosseis.test.cjs
```

Sete testes de DOM passaram: galeria sem JS; três carrosséis independentes e navegação circular; zero/uma fotografia; miniaturas, foco e metadados; limites do teclado; gestos sintéticos, cancelamento e segundo contato; inicialização repetida sem duplicação.

Esses testes usam uma fixture HTML pequena com a mesma estrutura da galeria. Não são testes de renderização e não substituem a validação do template no navegador. Eventos de ponteiro são simulados; não comprovam o comportamento físico de um celular.

## Roteiro manual para a revisão integrada

Preparação: cadastrar três trabalhos publicados com pelo menos três fotos cada, além de um com uma foto e outro sem fotos. Usar legendas e ordens diferentes.

1. Em larguras de 320 px, 640 px e desktop, conferir leitura, enquadramento completo, miniaturas e ausência de rolagem horizontal.
2. Navegar em cada galeria; conferir que as demais mantêm a posição. Verificar retorno da última à primeira e da primeira à última.
3. Usar miniaturas e conferir foto, legenda, contador e destaque correspondentes.
4. Usar Tab, Shift+Tab, Enter, Espaço e setas. Conferir foco visível, ausência de salto de foco e de interferência fora da galeria.
5. Em celular, deslizar horizontalmente sobre a foto; rolar verticalmente e usar zoom com dois dedos. Confirmar que rolagem e zoom não trocam a imagem por acidente.
6. Desativar JavaScript e recarregar: todas as fotos e legendas devem aparecer, sem controles inativos. Reativar JS e conferir zero/uma foto.
7. Com leitor de tela disponível, verificar nomes dos controles, anúncio do contador e ausência dos slides ocultos na leitura. Não apresentar esta implementação como auditoria completa de acessibilidade.

Situação nesta entrega: a conexão do navegador de revisão ao servidor local foi bloqueada (`ERR_BLOCKED_BY_CLIENT`); a instalação alternativa de navegador também falhou no download. Portanto, revisão visual, ativação nativa por Enter/Espaço, toque físico e leitor de tela **não foram validados nesta execução**. Retomar este roteiro na PM-009.
