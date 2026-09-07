/* Melhoria progressiva: o HTML original permanece uma galeria sem JavaScript. */
(() => {
  function iniciarCarrossel(galeria) {
    if (galeria.dataset.carrosselPronto) return;

    const slides = [...galeria.querySelectorAll('.galeria-item')];
    if (slides.length < 2) return;

    let atual = 0;
    let gesto = null;
    const controles = document.createElement('div');
    controles.className = 'carrossel-controles';
    const miniaturas = document.createElement('div');
    miniaturas.className = 'carrossel-miniaturas';
    miniaturas.setAttribute('role', 'group');
    miniaturas.setAttribute('aria-label', 'Escolher fotografia');

    function botao(texto, classe) {
      const elemento = document.createElement('button');
      elemento.type = 'button';
      elemento.className = classe;
      elemento.textContent = texto;
      return elemento;
    }

    const anterior = botao('Anterior', 'carrossel-botao');
    anterior.setAttribute('aria-label', 'Fotografia anterior');
    const proxima = botao('Próxima', 'carrossel-botao');
    proxima.setAttribute('aria-label', 'Próxima fotografia');
    const contador = document.createElement('span');
    contador.className = 'carrossel-contador';
    contador.setAttribute('role', 'status');
    contador.setAttribute('aria-live', 'polite');
    contador.setAttribute('aria-atomic', 'true');
    controles.append(anterior, contador, proxima);

    const seletores = slides.map((slide, indice) => {
      const original = slide.querySelector('img');
      const seletor = botao('', 'carrossel-miniatura');
      seletor.setAttribute('aria-label', `Ver fotografia ${indice + 1} de ${slides.length}: ${original.alt}`);
      const imagem = original.cloneNode(false);
      imagem.alt = '';
      imagem.removeAttribute('id');
      imagem.draggable = false;
      seletor.append(imagem);
      seletor.addEventListener('click', () => mostrar(indice));
      miniaturas.append(seletor);
      return seletor;
    });

    function mostrar(indice) {
      atual = (indice + slides.length) % slides.length;
      slides.forEach((slide, posicao) => {
        slide.hidden = posicao !== atual;
        seletores[posicao].setAttribute('aria-disabled', String(posicao === atual));
      });
      contador.textContent = `Fotografia ${atual + 1} de ${slides.length}`;
    }

    anterior.addEventListener('click', () => mostrar(atual - 1));
    proxima.addEventListener('click', () => mostrar(atual + 1));
    galeria.addEventListener('keydown', (evento) => {
      if (evento.altKey || evento.ctrlKey || evento.metaKey || evento.shiftKey) return;
      if (evento.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
      if (!['ArrowLeft', 'ArrowRight'].includes(evento.key)) return;
      evento.preventDefault();
      mostrar(atual + (evento.key === 'ArrowRight' ? 1 : -1));
    });

    galeria.addEventListener('pointerdown', (evento) => {
      if (!evento.isPrimary) {
        gesto = null; // Um segundo contato indica zoom, não navegação.
        return;
      }
      if (!['touch', 'pen'].includes(evento.pointerType)) return;
      if (!evento.target.closest('.galeria-item')) return;
      gesto = { id: evento.pointerId, x: evento.clientX, y: evento.clientY };
    });
    galeria.addEventListener('pointerup', (evento) => {
      const inicio = gesto;
      gesto = null;
      if (!inicio || inicio.id !== evento.pointerId) return;
      const dx = evento.clientX - inicio.x;
      const dy = evento.clientY - inicio.y;
      if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        mostrar(atual + (dx < 0 ? 1 : -1));
      }
    });
    galeria.addEventListener('pointercancel', () => { gesto = null; });

    // Construir todos os controles antes de ocultar qualquer conteúdo.
    galeria.append(controles, miniaturas);
    galeria.setAttribute('role', 'group');
    galeria.setAttribute('aria-roledescription', 'carrossel');
    slides.forEach((slide, indice) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${indice + 1} de ${slides.length}`);
    });
    mostrar(0);
    galeria.classList.add('galeria--carrossel');
    galeria.dataset.carrosselPronto = 'true';
  }

  document.querySelectorAll('[data-carrossel]').forEach(iniciarCarrossel);
})();
