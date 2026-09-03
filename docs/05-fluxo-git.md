# Git — primeira base e tarefas

O ZIP não contém histórico Git e nenhum remoto foi criado nesta entrega.
Os comandos abaixo são para uma pasta nova, após extração e primeira validação.

## Registrar a fundação

```bash
git init -b main
git status --short
git add .
git diff --cached --stat
git diff --cached --check
git commit -m "chore: adiciona fundacao Django do portfolio"
```

Confira antes do commit que banco, `.venv` e segredos não foram incluídos. O `.gitignore` já contém essas exclusões.
Se Git pedir identidade, configure seu nome e e-mail de autoria antes de repetir o commit; não invente dados.
Esse primeiro commit cria a base. As próximas alterações devem acontecer em branches.

## Executar PM-002

```bash
git status
git switch -c feat/pm-002-apresentacao
```

Implemente a tarefa. Depois:

```bash
python manage.py check
git diff --check
git diff
git add portfolio/views.py templates/portfolio/inicio.html
git diff --cached
git commit -m "feat: adiciona subtitulo a apresentacao"
```

Sem GitHub, integre localmente após conferir o resultado:

```bash
git switch main
git merge --ff-only feat/pm-002-apresentacao
git branch -d feat/pm-002-apresentacao
```

Se o merge não puder ser fast-forward, pare e examine o histórico; não use force ou reset para contornar.
Quando o repositório GitHub existir, adotaremos push da branch, PR, revisão, merge remoto e atualização local. Ainda não existe URL remota definida para este projeto.
Não repita `git init` dentro de um repositório existente nem misture este projeto ao python-labs.
