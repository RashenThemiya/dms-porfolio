(function () {
  // An animated SVG map keeps the preview usable when WebGL is unavailable.
  window.renderCustomerRouteFallback = function (host, isPaused) {
    var ns = 'http://www.w3.org/2000/svg';
    var data = window.CustomerRouteData;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function element(tag, attributes, parent) {
      var node = document.createElementNS(ns, tag);
      Object.keys(attributes || {}).forEach(function (key) {
        node.setAttribute(key, attributes[key]);
      });
      if (parent) parent.appendChild(node);
      return node;
    }
    function project(point) {
      return [440 + point[0] * 18, 330 + point[1] * 12];
    }
    host.replaceChildren();
    var svg = element(
      'svg',
      {
        viewBox: '0 0 880 640',
        width: '100%',
        height: '100%',
        role: 'img',
        'aria-label':
          'Animated route map with twelve routes, sample shops, one sales rep motorbike and one delivery vehicle',
      },
      host,
    );
    element('rect', { width: 880, height: 640, fill: '#111c30' }, svg);
    var streets = element('g', { stroke: '#2c3950', 'stroke-width': 15 }, svg);
    [-8, -2, 4, 10, 16].forEach(function (x) {
      var a = project([x, -16]),
        b = project([x, 16]);
      element('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }, streets);
    });
    [-9, -3, 3, 9].forEach(function (z) {
      var a = project([-22, z]),
        b = project([22, z]);
      element('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }, streets);
    });
    for (var x = -18; x < 22; x += 2) {
      for (var z = -14; z < 16; z += 2) {
        var nearRoad =
          [-8, -2, 4, 10, 16].some(function (v) {
            return Math.abs(v - x) < 0.8;
          }) ||
          [-9, -3, 3, 9].some(function (v) {
            return Math.abs(v - z) < 0.8;
          });
        if (nearRoad) continue;
        var p = project([x, z]);
        element(
          'rect',
          {
            x: p[0] - 9,
            y: p[1] - 6,
            width: 20,
            height: 13,
            rx: 2,
            fill: (x + z) % 4 === 0 ? '#34445f' : '#26354d',
          },
          svg,
        );
      }
    }
    var paths = [];
    data.itineraries.forEach(function (points, index) {
      var color = '#' + data.colors[index].toString(16).padStart(6, '0');
      var d = points
        .map(function (point, i) {
          var p = project(point);
          return (i ? 'L' : 'M') + p[0] + ' ' + p[1];
        })
        .join(' ');
      var path = element(
        'path',
        {
          d: d,
          fill: 'none',
          stroke: color,
          'stroke-width': 3,
          'stroke-linejoin': 'round',
          'stroke-linecap': 'round',
        },
        svg,
      );
      paths.push(path);
      var length = path.getTotalLength();
      [0.4, 0.65, 0.87].forEach(function (u) {
        var p = path.getPointAtLength(length * u);
        var shop = element('g', { transform: 'translate(' + p.x + ',' + (p.y - 15) + ')' }, svg);
        element('rect', { x: -7, y: -4, width: 14, height: 11, rx: 1, fill: '#b4a18a' }, shop);
        element('rect', { x: -8, y: -6, width: 16, height: 5, rx: 1, fill: color }, shop);
        element('rect', { x: -2, y: 1, width: 4, height: 6, fill: '#172c43' }, shop);
      });
      var end = project(points[points.length - 1]);
      element(
        'circle',
        { cx: end[0], cy: end[1], r: 11, fill: color, stroke: '#e8ecf4', 'stroke-width': 1.5 },
        svg,
      );
      var label = element(
        'text',
        {
          x: end[0],
          y: end[1] + 3,
          'text-anchor': 'middle',
          fill: '#0b1120',
          'font-size': 9,
          'font-weight': 700,
        },
        svg,
      );
      label.textContent = 'R' + (index + 1);
    });
    var origin = project(data.itineraries[0][0]);
    element(
      'circle',
      { cx: origin[0], cy: origin[1], r: 17, fill: '#1a9b63', stroke: '#fff', 'stroke-width': 2 },
      svg,
    );
    var branch = element(
      'text',
      {
        x: origin[0],
        y: origin[1] + 5,
        'text-anchor': 'middle',
        fill: '#fff',
        'font-size': 16,
        'font-weight': 700,
      },
      svg,
    );
    branch.textContent = 'B';
    function vehicle(kind, color) {
      var group = element('g', { 'data-vehicle': kind }, svg);
      if (kind === 'delivery') {
        element('rect', { x: -13, y: -7, width: 21, height: 14, rx: 2, fill: '#e8ecf4' }, group);
        element('rect', { x: 7, y: -6, width: 9, height: 12, rx: 2, fill: color }, group);
        [-8, 10].forEach(function (x) {
          [-8, 8].forEach(function (y) {
            element(
              'rect',
              { x: x - 3, y: y - 2, width: 6, height: 4, rx: 1, fill: '#080e19' },
              group,
            );
          });
        });
      } else {
        element('line', { x1: -9, y1: 0, x2: 10, y2: 0, stroke: color, 'stroke-width': 5 }, group);
        [-10, 11].forEach(function (x) {
          element(
            'circle',
            { cx: x, cy: 0, r: 4, fill: '#080e19', stroke: '#8a9bb2', 'stroke-width': 1 },
            group,
          );
        });
        element('circle', { cx: 0, cy: 0, r: 5, fill: color }, group);
        element('rect', { x: -9, y: -5, width: 6, height: 10, rx: 1, fill: '#b78958' }, group);
      }
      var label = element(
        'text',
        {
          'text-anchor': 'middle',
          fill: color,
          'font-size': 11,
          'font-weight': 700,
          'paint-order': 'stroke',
          stroke: '#0b1120',
          'stroke-width': 3,
        },
        svg,
      );
      label.textContent = kind === 'delivery' ? 'Delivery' : 'Sales rep';
      return { group: group, label: label };
    }
    var van = vehicle('delivery', '#ffb23e'),
      bike = vehicle('sales-rep', '#7dd3fc');
    function position(marker, t, duration, offset) {
      var elapsed = t + offset,
        path = paths[Math.floor(elapsed / duration) % paths.length];
      var progress = (elapsed % duration) / duration,
        back = progress >= 0.5,
        u = back ? 2 - progress * 2 : progress * 2;
      var distance = u * path.getTotalLength(),
        p = path.getPointAtLength(distance),
        q = path.getPointAtLength(Math.min(path.getTotalLength(), distance + 1));
      var angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI + (back ? 180 : 0);
      marker.group.setAttribute(
        'transform',
        'translate(' + p.x + ',' + p.y + ') rotate(' + angle + ')',
      );
      marker.label.setAttribute('x', p.x);
      marker.label.setAttribute('y', p.y - 19);
    }
    var last = null,
      time = 0,
      visible = true;
    var observer = window.IntersectionObserver
      ? new IntersectionObserver(function (entries) {
          visible = entries[0].isIntersecting;
        })
      : null;
    if (observer) observer.observe(host);
    document.getElementById('hint').textContent = 'Route map preview';
    function frame(now) {
      if (last === null) last = now;
      var delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!isPaused() && !document.hidden && visible && !reduced) time += delta;
      position(van, reduced ? 3.5 : time, 10, 0);
      position(bike, reduced ? 3.5 : time, 8, 13);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    window.addEventListener(
      'pagehide',
      function () {
        observer?.disconnect();
      },
      { once: true },
    );
  };
})();
