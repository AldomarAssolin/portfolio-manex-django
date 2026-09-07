const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { JSDOM } = require('jsdom');

const script = readFileSync(join(__dirname, '../static/js/carrosseis.js'), 'utf8');
function pagina(iniciar = true) {
  const html = [3, 3, 3, 1, 0].map((n, grupo) => `
    <h3 id="trabalho-${grupo}">Trabalho ${grupo}</h3>
    <div class="galeria" data-carrossel aria-labelledby="trabalho-${grupo}">
      ${Array.from({ length: n }, (_, i) => `
        <figure class="galeria-item"><img src="foto-${grupo}-${i}.jpg" alt="Foto ${grupo}-${i}">
        <figcaption>Legenda ${grupo}-${i}</figcaption></figure>`).join('')}
      ${n ? '' : '<p>Fotografias em preparação.</p>'}
    </div>`).join('');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  if (iniciar) dom.window.eval(script);
  return { dom, galerias: [...dom.window.document.querySelectorAll('[data-carrossel]')] };
}
const slides = g => [...g.querySelectorAll('.galeria-item')];
const atual = g => slides(g).findIndex(s => !s.hidden);
const botoes = g => g.querySelectorAll('.carrossel-botao');

test('sem JavaScript todas as fotos e legendas continuam no HTML, sem controles', () => {
  const { galerias } = pagina(false);
  assert.equal(galerias.flatMap(slides).length, 10);
  for (const g of galerias) {
    assert.ok(slides(g).every(s => !s.hidden && s.querySelector('figcaption')));
    assert.equal(g.querySelectorAll('button').length, 0);
  }
});

test('três carrosséis independentes, com navegação circular e contador', () => {
  const { galerias: [a, b, c] } = pagina();
  botoes(a)[0].click();
  assert.equal(atual(a), 2);
  assert.equal(a.querySelector('[role="status"]').textContent, 'Fotografia 3 de 3');
  botoes(a)[1].click();
  assert.equal(atual(a), 0);
  botoes(b)[1].click();
  assert.deepEqual([a, b, c].map(atual), [0, 1, 0]);
});

test('zero e uma fotografia não recebem controles', () => {
  const { galerias } = pagina();
  assert.equal(atual(galerias[3]), 0);
  assert.match(galerias[4].textContent, /Fotografias em preparação/);
  for (const g of galerias.slice(3)) assert.equal(g.querySelectorAll('button').length, 0);
});

test('miniaturas preservam foco, imagem, legenda e estado acessível', () => {
  const { dom, galerias: [g] } = pagina();
  const seletor = g.querySelectorAll('.carrossel-miniatura')[2];
  seletor.focus();
  seletor.click();
  assert.equal(dom.window.document.activeElement, seletor);
  assert.equal(atual(g), 2);
  assert.equal(seletor.getAttribute('aria-disabled'), 'true');
  assert.equal(seletor.querySelector('img').alt, '');
  assert.equal(slides(g)[2].querySelector('img').alt, 'Foto 0-2');
  assert.equal(slides(g)[2].querySelector('figcaption').textContent, 'Legenda 0-2');
  assert.equal(slides(g).filter(s => s.hidden).length, 2);
  assert.ok([...g.querySelectorAll('button')].every(b => b.type === 'button' && b.getAttribute('aria-label')));
});

test('setas atuam somente na galeria e respeitam campos editáveis e modificadores', () => {
  const { dom, galerias: [g] } = pagina();
  const tecla = (alvo, extras = {}) => {
    const e = new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true, ...extras });
    alvo.dispatchEvent(e);
    return e.defaultPrevented;
  };
  assert.equal(tecla(botoes(g)[1]), true);
  assert.equal(atual(g), 1);
  assert.equal(tecla(dom.window.document.body), false);
  assert.equal(tecla(botoes(g)[1], { ctrlKey: true }), false);
  for (const tag of ['input', 'textarea', 'select', 'div']) {
    const campo = dom.window.document.createElement(tag);
    if (tag === 'div') campo.setAttribute('contenteditable', 'true');
    g.append(campo);
    assert.equal(tecla(campo), false);
  }
  assert.equal(atual(g), 1);
});

test('gestos horizontais navegam; vertical, cancelamento e segundo contato não navegam', () => {
  const { dom, galerias: [g] } = pagina();
  const alvo = slides(g)[0];
  const pointer = (tipo, x, y, extras = {}) => {
    const e = new dom.window.Event(tipo, { bubbles: true, cancelable: true });
    Object.assign(e, { pointerId: 1, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, ...extras });
    alvo.dispatchEvent(e);
    assert.equal(e.defaultPrevented, false);
  };
  pointer('pointerdown', 200, 100); pointer('pointerup', 100, 105);
  assert.equal(atual(g), 1);
  pointer('pointerdown', 100, 100); pointer('pointerup', 200, 105);
  assert.equal(atual(g), 0);
  pointer('pointerdown', 200, 100); pointer('pointerup', 195, 200);
  assert.equal(atual(g), 0);
  pointer('pointerdown', 200, 100); pointer('pointercancel', 150, 100); pointer('pointerup', 100, 100);
  assert.equal(atual(g), 0);
  pointer('pointerdown', 200, 100); pointer('pointerdown', 150, 100, { pointerId: 2, isPrimary: false }); pointer('pointerup', 100, 100);
  assert.equal(atual(g), 0);
});

test('executar o script novamente não duplica controles nem ouvintes', () => {
  const { dom, galerias: [g] } = pagina();
  dom.window.eval(script);
  assert.equal(botoes(g).length, 2);
  botoes(g)[1].click();
  assert.equal(atual(g), 1);
});
