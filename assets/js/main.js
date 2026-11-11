/* ==========================================================================
   PORTAFOLIO · Interacciones
   Sin dependencias. Cada parte se activa solo si su HTML existe en la página.
   ========================================================================== */

(() => {
  'use strict';

  /* 1. Lista de proyectos (inicio): al pasar por una fila se activa y cambia
        la vista previa de la derecha, su texto y el enlace del botón. ------ */
  function initWorkList() {
    const grid = document.querySelector('[data-work]');
    if (!grid) return;

    const rows = [...grid.querySelectorAll('[data-work-row]')];
    const items = [...grid.querySelectorAll('[data-work-preview]')];
    const caption = grid.querySelector('[data-work-caption]');
    const cta = grid.querySelector('[data-work-cta]');

    const activate = (index) => {
      rows.forEach((row, i) => row.classList.toggle('is-active', i === index));
      items.forEach((item, i) => item.classList.toggle('is-active', i === index));
      if (caption) caption.textContent = rows[index].dataset.line;
      if (cta) {
        cta.href = rows[index].getAttribute('href');
        cta.dataset.vt = rows[index].dataset.vt;
      }
    };

    rows.forEach((row, i) => {
      row.addEventListener('pointerenter', () => activate(i));
      row.addEventListener('focus', () => activate(i));
    });

    activate(0);
  }


  /* 2. Transición compartida entre páginas (View Transitions API).
        Al pulsar un proyecto, su imagen visible y su título reciben el mismo
        view-transition-name que la portada y el título de la página del
        proyecto, así que el navegador los anima de una página a otra. ------ */
  function initSharedTransitions() {
    const named = new Set();

    const clear = () => {
      named.forEach((el) => { el.style.viewTransitionName = ''; });
      named.clear();
    };

    const isVisible = (el) => el && el.getClientRects().length > 0;

    const nameProject = (slug) => {
      clear();
      const row = document.querySelector(`[data-work-row][data-vt="${slug}"]`);
      const preview = document.querySelector(`[data-work-preview="${slug}"]`);
      const media = isVisible(preview) ? preview : row?.querySelector('.work-row__media');
      const title = row?.querySelector('.work-row__title');

      if (isVisible(media)) {
        media.style.viewTransitionName = `cover-${slug}`;
        named.add(media);
      }
      if (isVisible(title)) {
        title.style.viewTransitionName = `title-${slug}`;
        named.add(title);
      }
    };

    // Ida: portada → proyecto
    document.querySelectorAll('[data-work-row], [data-work-cta]').forEach((link) => {
      link.addEventListener('click', () => nameProject(link.dataset.vt));
    });

    // Vuelta: proyecto → portada (el navegador indica de dónde venimos)
    window.addEventListener('pagereveal', (event) => {
      if (!event.viewTransition) return;
      try {
        const from = navigation.activation?.from?.url || '';
        const match = from.match(/proyectos\/([\w-]+)\.html/);
        if (match && document.querySelector('[data-work]')) {
          nameProject(match[1]);
          event.viewTransition.finished.finally(clear);
        }
      } catch {
        /* navegador sin Navigation API: transición simple */
      }
    });

    // Al volver con el botón "atrás" desde la caché, limpiamos los nombres
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) clear();
    });
  }


  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* 3. Figura de partículas del inicio ------------------------------------
        ~1400 partículas cuadradas forman objetos de los proyectos y pasan de
        uno a otro como una pequeña simulación: muelles hacia la forma
        destino + un campo de flujo durante el cambio. El puntero las empuja.
        Canvas 2D, sin librerías. Se pausa fuera de pantalla o con la pestaña
        oculta, y no se carga en pantallas estrechas.
        Para añadir una figura: escribe una entrada en SHAPES cuyas partes
        sean { w: peso, accent: true/false, at: () => [x, y, z] }
        (y hacia arriba, tamaño aprox. de -1 a 1). --------------------------- */
  const TAU = Math.PI * 2;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const coin = () => Math.random() < 0.5;

  // Punto al azar sobre el contorno de un rectángulo (plano XY)
  const rectEdge = (w, h) => {
    const p = rnd(0, 2 * (w + h));
    if (p < w) return [p - w / 2, h / 2];
    if (p < w + h) return [w / 2, h / 2 - (p - w)];
    if (p < 2 * w + h) return [w / 2 - (p - w - h), -h / 2];
    return [-w / 2, -h / 2 + (p - 2 * w - h)];
  };

  // Punto al azar sobre una arista de un cubo de lado s
  const cubeEdge = (s) => {
    const a = rnd(-s / 2, s / 2);
    const b = coin() ? -s / 2 : s / 2;
    const c = coin() ? -s / 2 : s / 2;
    const k = Math.floor(Math.random() * 3);
    if (k === 0) return [a, b, c];
    if (k === 1) return [b, a, c];
    return [b, c, a];
  };

  const rotY = ([x, y, z], a) => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
  const rotX = ([x, y, z], a) => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];

  // Punto uniforme sobre una esfera de radio r
  const onSphere = (r) => {
    const u = rnd(-1, 1);
    const t = rnd(0, TAU);
    const s = Math.sqrt(1 - u * u);
    return [r * s * Math.cos(t), r * u, r * s * Math.sin(t)];
  };

  const inVisor = (p) => p[2] > 0.48 && Math.abs(p[1] - 0.1) < 0.28;

  // Trayectoria del atractor de Lorenz (simulación clásica), ya escalada a ±1
  const LORENZ = (() => {
    const pts = [];
    let x = 0.1;
    let y = 0;
    let z = 0;
    const dt = 0.006;
    for (let i = 0; i < 4500; i += 1) {
      const dx = 10 * (y - x);
      const dy = x * (28 - z) - y;
      const dz = x * y - (8 / 3) * z;
      x += dx * dt;
      y += dy * dt;
      z += dz * dt;
      // Girado 45° para que su cara ancha mire a la cámara (es casi plano)
      if (i >= 500) pts.push([(x + y) / 38, (z - 24) / 22, (x - y) / 38]);
    }
    return pts;
  })();

  const SHAPES = [
    {
      name: 'Realidad virtual',
      parts: () => {
        const W = 1.5;
        const H = 0.84;
        const D = 0.55;
        const Z0 = -0.05;
        return [
          // Carcasa: aristas marcadas + caras con menos densidad
          { w: 3, at: () => {
            const [x, y, z] = cubeEdge(1);
            return [x * W, y * H, Z0 + D / 2 + z * D];
          } },
          { w: 2.4, at: () => {
            const f = Math.random();
            if (f < 0.5) return [rnd(-W / 2, W / 2), rnd(-H / 2, H / 2), Z0 + D];
            if (f < 0.75) return [rnd(-W / 2, W / 2), coin() ? -H / 2 : H / 2, rnd(Z0, Z0 + D)];
            return [coin() ? -W / 2 : W / 2, rnd(-H / 2, H / 2), rnd(Z0, Z0 + D)];
          } },
          // Almohadilla facial
          { w: 1.2, at: () => { const [x, y] = rectEdge(W * 0.92, H * 0.85); return [x, y, Z0]; } },
          // Correas: lateral y superior
          { w: 2.2, accent: true, at: () => {
            const t = rnd(Math.PI, TAU);
            return [0.8 * Math.cos(t), rnd(-0.09, 0.09), Z0 + 0.9 * Math.sin(t)];
          } },
          { w: 1.1, accent: true, at: () => {
            const t = rnd(Math.PI / 2, Math.PI);
            return [rnd(-0.08, 0.08), (H / 2) * Math.sin(t) + 0.02, Z0 + 0.9 * Math.cos(t)];
          } },
          // Cámaras del frente
          { w: 0.5, at: () => {
            const t = rnd(0, TAU);
            return [(coin() ? -0.5 : 0.5) + 0.07 * Math.cos(t), (coin() ? -0.24 : 0.24) + 0.07 * Math.sin(t), Z0 + D + 0.02];
          } },
        ];
      },
    },
    {
      name: 'Realidad aumentada',
      parts: () => {
        const page = (side) => () => {
          const u = rnd(0, 1);
          const y = -0.5 + 0.26 * Math.sin(u * Math.PI * 0.62) - 0.05 * u;
          return [side * (0.04 + u * 1.0), y, rnd(-0.62, 0.62)];
        };
        return [
          { w: 2.6, at: page(1) },
          { w: 2.6, at: page(-1) },
          // Tapa y lomo
          { w: 1.1, at: () => { const [x, z] = rectEdge(2.2, 1.36); return [x, -0.56, z]; } },
          { w: 0.4, at: () => [0, -0.52, rnd(-0.62, 0.62)] },
          // Objeto que aparece sobre el libro
          { w: 2.2, accent: true, at: () => {
            const p = rotX(rotY(cubeEdge(0.5), Math.PI / 4), 0.35);
            return [p[0], p[1] + 0.42, p[2]];
          } },
          { w: 0.35, accent: true, at: () => [0, rnd(-0.4, 0.12), 0] },
        ];
      },
    },
    {
      // Atractor de Lorenz: las partículas recorren la trayectoria sin parar
      name: 'Arte generativo',
      parts: () => [
        { w: 1, flow: true, at: () => [0, 0, 0, Math.floor(Math.random() * LORENZ.length)] },
      ],
    },
    {
      name: 'Dissonance',
      parts: () => [
        // Casco: esfera; el visor es la zona frontal (en rojo)
        { w: 5, at: () => {
          for (;;) {
            const p = onSphere(0.78);
            if (!inVisor(p)) return [p[0], p[1] + 0.12, p[2]];
          }
        } },
        { w: 1.8, accent: true, at: () => {
          for (;;) {
            const p = onSphere(0.74);
            if (inVisor(p)) return [p[0], p[1] + 0.12, p[2]];
          }
        } },
        // Cuello
        { w: 1.2, at: () => {
          const t = rnd(0, TAU);
          const a = rnd(0, TAU);
          const r = 0.56 + 0.08 * Math.cos(a);
          return [r * Math.cos(t), -0.66 + 0.08 * Math.sin(a), r * Math.sin(t)];
        } },
        // Restos flotando
        { w: 0.5, at: () => onSphere(rnd(1.05, 1.35)) },
      ],
    },
    {
      name: 'Apps móviles y web',
      parts: () => [
        // Cuerpo del móvil: contorno delante y detrás
        { w: 2.6, at: () => { const [x, y] = rectEdge(0.92, 1.72); return [x, y, coin() ? -0.06 : 0.06]; } },
        // Barra superior, tarjeta y filas de lista
        { w: 0.5, at: () => [rnd(-0.34, 0.34), rnd(0.62, 0.68), 0.07] },
        { w: 1.6, at: () => [rnd(-0.34, 0.34), rnd(0.08, 0.52), 0.07] },
        { w: 1, at: () => [rnd(-0.34, 0.2), -0.08 - Math.floor(Math.random() * 3) * 0.17, 0.07] },
        // Botón principal
        { w: 1.2, accent: true, at: () => [rnd(-0.34, 0.34), rnd(-0.7, -0.56), 0.07] },
      ],
    },
  ];

  // Reparte n puntos entre las partes según su peso
  function sampleShape(shape, n) {
    const parts = shape.parts();
    const total = parts.reduce((sum, part) => sum + part.w, 0);
    const out = [];
    parts.forEach((part, i) => {
      const count = i === parts.length - 1 ? n - out.length : Math.round((part.w / total) * n);
      for (let k = 0; k < count; k += 1) {
        const [x, y, z, idx] = part.at();
        out.push({ x, y, z, idx, accent: !!part.accent, flow: !!part.flow });
      }
    });
    // Mezcla: cada partícula viaja a un sitio distinto de la siguiente figura
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function initHeroParticles() {
    const figure = document.querySelector('[data-particles]');
    if (!figure) return;

    const wide = window.matchMedia('(min-width: 1001px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let started = false;

    const start = () => {
      if (started || !wide.matches) return;
      started = true;
      runParticles(figure, reduced.matches);
    };

    start();
    wide.addEventListener('change', start);
  }

  function runParticles(figure, still) {
    const canvas = figure.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue('--color-text').trim() || '#201e1d';
    const accent = css.getPropertyValue('--color-accent').trim() || '#ec3013';

    const N = 1400;
    const HOLD = 5200; // ms que se mantiene cada figura
    const targets = SHAPES.map((shape) => sampleShape(shape, N));
    const pts = targets[0].map((g) => ({
      x: g.x + rnd(-2, 2), y: g.y + rnd(-2, 2), z: g.z + rnd(-2, 2),
      vx: 0, vy: 0, vz: 0, ox: 0, oy: 0, ovx: 0, ovy: 0, delay: 0,
    }));

    let shapeIndex = 0;
    let energy = 1; // intensidad del flujo durante una transición
    let lastSwitch = performance.now();
    let size = 0;
    let dpr = 1;
    let mouse = null;
    let tiltX = 0;
    let tiltY = 0;
    let visible = true;
    let frame = null;
    let last = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };

    const next = (now) => {
      shapeIndex = (shapeIndex + 1) % SHAPES.length;
      lastSwitch = now;
      energy = 1;
      pts.forEach((p) => {
        p.delay = Math.random() * 420;
        p.vx += rnd(-0.02, 0.02);
        p.vy += rnd(0, 0.03);
        p.vz += rnd(-0.02, 0.02);
      });
    };

    const draw = (now, dt) => {
      const target = targets[shapeIndex];
      const t = now / 1000;
      const since = now - lastSwitch;
      energy = Math.max(0, energy - dt / 1400);

      const rx = 0.3 + tiltY * 0.3; // vista un poco desde arriba
      const ry = Math.sin(t * 0.32) * 0.75 + tiltX * 0.6;
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const scale = size * 0.33 * dpr;
      const center = (size * dpr) / 2;
      const k = Math.min(dt / 16.67, 3); // pasos de 60 fps
      const damp = Math.pow(0.82, k);
      const dampO = Math.pow(0.86, k);
      const reach = 70 * dpr;
      const flowStep = Math.floor(t * 45); // velocidad del atractor

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < N; i += 1) {
        const p = pts[i];
        const g = target[i];

        // Física: muelle hacia el destino + campo de flujo mientras cambia
        let red = g.accent;
        if (since > p.delay) {
          let gx = g.x;
          let gy = g.y;
          let gz = g.z;
          if (g.flow) {
            // Avanza por la trayectoria; un tramo rojo viaja con ella
            const j = (g.idx + flowStep) % LORENZ.length;
            [gx, gy, gz] = LORENZ[j];
            red = j % 1000 < 110;
          }
          p.vx += (gx - p.x) * 0.055 * k;
          p.vy += (gy - p.y) * 0.055 * k;
          p.vz += (gz - p.z) * 0.055 * k;
        }
        if (energy > 0) {
          const e = energy * 0.012 * k;
          p.vx += Math.sin(p.y * 3.1 + t * 1.7) * e;
          p.vy += Math.sin(p.z * 2.7 + t * 1.3) * e;
          p.vz += Math.sin(p.x * 3.3 - t * 1.1) * e;
        }
        p.vx *= damp;
        p.vy *= damp;
        p.vz *= damp;
        p.x += p.vx * k;
        p.y += p.vy * k;
        p.z += p.vz * k;

        // Rotación (Y, luego X) y perspectiva
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const f = 3.4 / (3.4 - z2);
        let px = center + x1 * scale * f;
        let py = center - y2 * scale * f;

        // El puntero empuja: desplazamiento en pantalla que vuelve con muelle
        if (mouse) {
          const dx = px + p.ox - mouse.x * dpr;
          const dy = py + p.oy - mouse.y * dpr;
          const d2 = dx * dx + dy * dy;
          if (d2 < reach * reach) {
            const d = Math.sqrt(d2) || 1;
            const push = (1 - d / reach) * 2.4 * dpr * k;
            p.ovx += (dx / d) * push;
            p.ovy += (dy / d) * push;
          }
        }
        p.ovx = (p.ovx - p.ox * 0.06 * k) * dampO;
        p.ovy = (p.ovy - p.oy * 0.06 * k) * dampO;
        p.ox += p.ovx * k;
        p.oy += p.ovy * k;
        px += p.ox;
        py += p.oy;

        const depth = Math.min(Math.max((z2 + 1.2) / 2.4, 0), 1);
        const s = (1.1 + depth * 1.5) * dpr;
        ctx.globalAlpha = 0.28 + depth * 0.72;
        ctx.fillStyle = red ? accent : ink;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (now - lastSwitch > HOLD) next(now);
      draw(now, dt);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : null;
    };

    const wake = () => {
      if (still || frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    resize();

    if (still) {
      // Movimiento reducido: la primera figura, quieta
      pts.forEach((p, i) => { p.x = targets[0][i].x; p.y = targets[0][i].y; p.z = targets[0][i].z; });
      energy = 0;
    }
    const redrawStill = () => { if (still) draw(performance.now(), 0); };
    redrawStill();
    wake();

    new ResizeObserver(() => { resize(); redrawStill(); }).observe(canvas);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); }).observe(canvas);
    document.addEventListener('visibilitychange', wake);

    if (!finePointer.matches || still) return;
    const hero = figure.closest('[data-hero]') || document.body;
    hero.addEventListener('pointermove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const hr = hero.getBoundingClientRect();
      mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      tiltX = ((event.clientX - hr.left) / hr.width - 0.5) * 2;
      tiltY = ((event.clientY - hr.top) / hr.height - 0.5) * 2;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { mouse = null; tiltX = 0; tiltY = 0; });
  }


  /* 4. Etiqueta "Ver proyecto" que sigue al cursor sobre [data-cursor] ----- */
  function initCursor() {
    const targets = document.querySelectorAll('[data-cursor]');
    if (!targets.length || !finePointer.matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor__label"></span>';
    document.body.appendChild(cursor);
    document.documentElement.classList.add('has-cursor');

    const label = cursor.firstElementChild;
    let x = 0;
    let y = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = null;

    const render = () => {
      currentX += (x - currentX) * 0.25;
      currentY += (y - currentY) * 0.25;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      const moving = Math.abs(x - currentX) + Math.abs(y - currentY) > 0.1;
      frame = moving ? requestAnimationFrame(render) : null;
    };

    window.addEventListener('pointermove', (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(render);
    }, { passive: true });

    targets.forEach((el) => {
      el.addEventListener('pointerenter', (event) => {
        label.textContent = `${el.dataset.cursor} →`;
        currentX = x = event.clientX;
        currentY = y = event.clientY;
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        cursor.classList.add('is-active');
      });
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }


  /* 5. Año actual en el pie ------------------------------------------------ */
  function initYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = year; });
  }


  initWorkList();
  initSharedTransitions();
  initHeroParticles();
  initCursor();
  initYear();
})();
