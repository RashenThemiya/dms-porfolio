(function () {
  var svg = document.getElementById('story');
  if (!svg) return;
  var $ = function (id) {
    return document.getElementById(id);
  };
  // awning stripes
  var aw = $('awning'),
    ns = 'http://www.w3.org/2000/svg';
  for (var i = 0; i < 10; i++) {
    var p = document.createElementNS(ns, 'path');
    var x = 900 + i * 23;
    p.setAttribute('d', 'M' + x + ' 186h23v20a11.5 11.5 0 0 1-23 0z');
    p.setAttribute('fill', i % 2 ? '#e8ecf4' : '#ff6b0f');
    aw.appendChild(p);
  }

  var T = 18,
    STAGES = [0, 3.6, 7, 10.5, 13.5, 18];
  var bike = $('bike'),
    lorry = $('lorry'),
    phone = $('phone'),
    packet = $('packet'),
    trail = $('trail'),
    card = $('card'),
    deliv = $('deliv');
  var bikeWheels = bike.querySelectorAll('.wheel'),
    lorryWheels = lorry.querySelectorAll('.wheel');
  var boxes = [$('b1'), $('b2'), $('b3')],
    bd = $('bd'),
    dyn = $('dyn');
  var steps = document.querySelectorAll('#steps li');
  function cl(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }
  function seg(t, a, b) {
    return cl((t - a) / (b - a));
  }
  function ease(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }
  function back(x) {
    var c = 1.7;
    return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
  }
  function lerp(a, b, k) {
    return a + (b - a) * k;
  }
  function spin(ws, dist, r, y) {
    ws.forEach(function (w) {
      var cx = +w.dataset.cx;
      w.setAttribute('transform', 'rotate(' + (dist / r) * 57.3 + ' ' + cx + ' ' + y + ')');
    });
  }
  function pop(el, k, x, y) {
    var s = k <= 0 ? 0.001 : back(k);
    el.setAttribute('opacity', k <= 0 ? 0 : 1);
    el.setAttribute('transform', 'translate(' + x + ',' + y + ') scale(' + s + ')');
  }

  var P0 = { x: 880, y: 300 },
    P1 = { x: 140, y: 196 };
  var CX = (P0.x + P1.x) / 2,
    CY = 70;
  trail.setAttribute('d', 'M' + P0.x + ' ' + P0.y + ' Q' + CX + ' ' + CY + ' ' + P1.x + ' ' + P1.y);

  function render(t) {
    // whole-layer fade at loop seam
    dyn.setAttribute('opacity', t > 17.5 ? 1 - (t - 17.5) / 0.5 : t < 0.3 ? t / 0.3 : 1);
    // bike: ride in, park, ride out
    var bx;
    if (t < 3.6) bx = lerp(120, 820, ease(seg(t, 0.2, 3.4)));
    else if (t < 6.6) bx = 820;
    else bx = lerp(820, 1280, ease(seg(t, 6.6, 8.4)));
    bike.setAttribute('transform', 'translate(' + bx + ',404)');
    spin(bikeWheels, bx, 14, -14);
    // phone bubble
    var pin = seg(t, 3.8, 4.3),
      pout = seg(t, 6.2, 6.5);
    if (t < 6.2) pop(phone, pin, bx + 30, 312);
    else {
      phone.setAttribute('opacity', 1 - pout);
      phone.setAttribute(
        'transform',
        'translate(' + (bx + 30) + ',312) scale(' + (1 - pout * 0.3) + ')',
      );
    }
    var lines = $('plines').children;
    for (var i = 0; i < lines.length; i++) {
      lines[i].setAttribute('opacity', t > 4.3 + i * 0.18 ? 1 : 0.15);
      lines[i].setAttribute('fill', t > 4.3 + i * 0.18 ? '#c7d0e4' : '#56627d');
    }
    $('psend').setAttribute(
      'transform',
      t > 5 && t < 5.25 ? 'translate(0,-21) scale(.92) translate(0,21)' : '',
    );
    // packet along trail
    var pk = seg(t, 5.2, 6.8);
    if (pk > 0 && pk < 1) {
      var e = ease(pk),
        u = 1 - e;
      var x = u * u * P0.x + 2 * u * e * CX + e * e * P1.x,
        y = u * u * P0.y + 2 * u * e * CY + e * e * P1.y;
      packet.setAttribute('opacity', 1);
      packet.setAttribute(
        'transform',
        'translate(' + x + ',' + y + ') rotate(' + (-15 + 30 * e) + ')',
      );
    } else packet.setAttribute('opacity', 0);
    trail.setAttribute('opacity', t > 5.1 && t < 7.2 ? 0.7 * (1 - seg(t, 6.8, 7.2)) : 0);
    // office card
    var cin = seg(t, 7, 7.4),
      cout = seg(t, 10.3, 10.7);
    if (t < 10.3) pop(card, cin, 250, 150);
    else {
      card.setAttribute('opacity', 1 - cout);
      card.setAttribute('transform', 'translate(250,150)');
    }
    $('ck1').setAttribute('opacity', t > 7.7 ? 1 : 0.25);
    $('ck2').setAttribute('opacity', t > 8.3 ? 1 : 0.25);
    $('ck3').setAttribute('opacity', t > 8.9 ? 1 : 0.25);
    var done = t > 9.5;
    $('pill1').setAttribute('opacity', done ? 0 : 1);
    $('pill2').setAttribute('opacity', done ? 1 : 0);
    $('monscreen').setAttribute(
      'fill',
      t > 7 && t < 10.5 ? (done ? '#0f4a36' : '#3a2a10') : '#163056',
    );
    // loading boxes into lorry
    var lx = 420;
    if (t >= 13.5) lx = lerp(420, 700, ease(seg(t, 13.6, 15.6)));
    var count = 0;
    boxes.forEach(function (b, i) {
      var a = 10.7 + i * 0.8,
        k = seg(t, a, a + 0.7);
      if (k <= 0 || k >= 1) {
        b.setAttribute('opacity', 0);
        if (k >= 1) count++;
        return;
      }
      var e = ease(k),
        x = lerp(322, 440 + i * 34, e),
        y = lerp(326, 300, e) - Math.sin(e * Math.PI) * 60;
      b.setAttribute('opacity', 1);
      b.setAttribute('transform', 'translate(' + x + ',' + y + ')');
    });
    if (t > 15.9) count = Math.max(0, count - 1);
    $('lorrycount').setAttribute('opacity', count > 0 && t < 17.5 ? 1 : 0);
    $('lorrycountt').textContent = count;
    lorry.setAttribute('transform', 'translate(' + lx + ',372)');
    spin(lorryWheels, lx, 13, -8);
    // deliver one box to the shop
    var dk = seg(t, 15.8, 16.6);
    if (dk > 0 && dk < 1) {
      var e2 = ease(dk);
      bd.setAttribute('opacity', 1);
      bd.setAttribute(
        'transform',
        'translate(' +
          lerp(lx + 100, 960, e2) +
          ',' +
          (lerp(300, 318, e2) - Math.sin(e2 * Math.PI) * 50) +
          ')',
      );
    } else if (dk >= 1 && t < 17.5) {
      bd.setAttribute('opacity', 1);
      bd.setAttribute('transform', 'translate(960,318)');
    } else bd.setAttribute('opacity', 0);
    pop(deliv, seg(t, 16.6, 17), 1015, 118);
    if (t >= 17) deliv.setAttribute('transform', 'translate(1015,118)');
    var w = t > 16.6 && t < 17.6 ? Math.sin((t - 16.6) * 18) * 14 : 0;
    $('wave').setAttribute('transform', 'rotate(' + w + ' 1027 268)');
    // Follow the active part of the story on narrow screens.
    if (window.innerWidth <= 600) {
      var camera =
        t < 4
          ? Math.max(0, Math.min(600, bx - 250))
          : t < 7
            ? 600
            : t < 10.5
              ? 0
              : t < 13.5
                ? 200
                : 600;
      svg.setAttribute('viewBox', camera + ' 60 600 380');
    } else svg.setAttribute('viewBox', '0 60 1200 380');
    // steps
    steps.forEach(function (li, i) {
      var on = t >= STAGES[i] && t < STAGES[i + 1];
      li.classList.toggle('on', on);
      li.setAttribute('aria-pressed', String(on));
      li.style.setProperty(
        '--p',
        on ? seg(t, STAGES[i], STAGES[i + 1]) : t >= STAGES[i + 1] ? 1 : 0,
      );
    });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0,
    last = null,
    visible = true,
    playing = !reduce;
  if (window.IntersectionObserver)
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
    }).observe(svg);
  steps.forEach(function (li) {
    li.addEventListener('click', function () {
      t = STAGES[+li.dataset.s] + 0.01;
      if (!playing) {
        var s = +li.dataset.s;
        t = [3.5, 6.1, 10.2, 13.4, 17.2][s];
      }
      render(t);
    });
  });
  function frame(now) {
    requestAnimationFrame(frame);
    if (last === null) last = now;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!playing || !visible || document.hidden) return;
    t = (t + dt) % T;
    render(t);
  }
  render(reduce ? 10.2 : 0);
  if (reduce) t = 10.2;
  var pause = document.getElementById('story-pause');
  function updatePause() {
    pause.textContent = playing ? 'Pause animation' : 'Play animation';
    pause.setAttribute('aria-pressed', String(!playing));
  }
  pause.addEventListener('click', function () {
    playing = !playing;
    last = null;
    updatePause();
  });
  steps.forEach(function (li) {
    li.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        li.click();
      }
    });
  });
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  motion.addEventListener('change', function (event) {
    if (event.matches) {
      playing = false;
      t = 10.2;
      render(t);
      updatePause();
    }
  });
  function publishHeight() {
    window.parent.postMessage(
      { type: 'pentarix-story-height', height: document.body.scrollHeight },
      window.location.origin,
    );
  }
  if (window.ResizeObserver) new ResizeObserver(publishHeight).observe(document.body);
  window.addEventListener('resize', function () {
    render(t);
    publishHeight();
  });
  publishHeight();
  updatePause();
  requestAnimationFrame(frame);
})();
