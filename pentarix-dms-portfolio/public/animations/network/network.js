(function () {
  var host = document.getElementById('city3d');
  if (!host) return;
  if (typeof THREE === 'undefined') {
    host.classList.add('nogl');
    return;
  }
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    host.classList.add('nogl');
    return;
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  host.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0b1120, 55, 120);
  var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 400);
  var target = new THREE.Vector3(0, 0, 4);

  scene.add(new THREE.HemisphereLight(0x9fb6ff, 0x0b1120, 0.45));
  var sun = new THREE.DirectionalLight(0xffe2c4, 1.0);
  sun.position.set(-30, 50, 24);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  var sc = sun.shadow.camera;
  sc.left = -55;
  sc.right = 55;
  sc.top = 40;
  sc.bottom = -40;
  sc.near = 1;
  sc.far = 150;
  sun.shadow.bias = -0.0006;
  scene.add(sun);

  var W = 96,
    D = 64;
  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(W, D),
    new THREE.MeshStandardMaterial({ color: 0x141d31, roughness: 0.95 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // coastline on the west
  function coastX(z) {
    return -34 + Math.sin(z * 0.16) * 2.4 + z * 0.1;
  }
  var shape = new THREE.Shape();
  shape.moveTo(-W / 2, -D / 2);
  for (var z = -D / 2; z <= D / 2; z += 1) shape.lineTo(coastX(z), z);
  shape.lineTo(-W / 2, D / 2);
  shape.lineTo(-W / 2, -D / 2);
  var ocean = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshStandardMaterial({
      color: 0x123a5c,
      roughness: 0.35,
      emissive: 0x0a2238,
      emissiveIntensity: 0.6,
      side: THREE.DoubleSide,
    }),
  );
  ocean.rotation.x = Math.PI / 2;
  ocean.position.y = 0.02;
  scene.add(ocean);
  var shore = [];
  for (z = -D / 2; z <= D / 2; z += 0.5) shore.push(new THREE.Vector3(coastX(z), 0.05, z));
  scene.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(shore),
      new THREE.LineBasicMaterial({ color: 0x4fa3d9, transparent: true, opacity: 0.6 }),
    ),
  );

  // street grid
  var STEP = 6,
    VX = [],
    HZ = [];
  for (var x = -30; x <= 44; x += STEP) VX.push(x);
  for (z = -24; z <= 24; z += STEP) HZ.push(z);
  var roadMat = new THREE.MeshStandardMaterial({ color: 0x2c3956, roughness: 0.85 });
  var dashMat = new THREE.LineDashedMaterial({
    color: 0x7d8aa6,
    dashSize: 0.4,
    gapSize: 0.5,
    transparent: true,
    opacity: 0.45,
  });
  var RW = 0.8;
  function addRoad(x1, z1, x2, z2) {
    var vert = x1 === x2,
      len = vert ? Math.abs(z2 - z1) : Math.abs(x2 - x1);
    var m = new THREE.Mesh(new THREE.BoxGeometry(vert ? RW : len, 0.04, vert ? len : RW), roadMat);
    m.position.set((x1 + x2) / 2, 0.02, (z1 + z2) / 2);
    m.receiveShadow = true;
    scene.add(m);
    var ln = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, 0.05, z1),
        new THREE.Vector3(x2, 0.05, z2),
      ]),
      dashMat,
    );
    ln.computeLineDistances();
    scene.add(ln);
  }
  VX.forEach(function (x) {
    var z0 = -D / 2;
    for (var z = -D / 2; z < D / 2; z += 0.5) {
      if (coastX(z) < x - 1) {
        z0 = z;
        break;
      }
    }
    addRoad(x, z0, x, D / 2);
  });
  HZ.forEach(function (z) {
    addRoad(coastX(z) + 0.6, z, W / 2, z);
  });
  function nearRoad(x, z, pad) {
    for (var i = 0; i < VX.length; i++) if (Math.abs(x - VX[i]) < pad) return true;
    for (i = 0; i < HZ.length; i++) if (Math.abs(z - HZ[i]) < pad) return true;
    return false;
  }

  var rng = (function (s) {
    return function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  })(7);

  // branches: each depot sits on a junction, one colour per company
  var COMPANIES = [0xff6b0f, 0x22c38e, 0x8b7bff, 0xffc23e, 0x3fb7ff];
  var branches = [
    { name: 'Peliyagoda', gx: -24, gz: -12, c: 0 },
    { name: 'Kelaniya', gx: -12, gz: -18, c: 1 },
    { name: 'Nugegoda', gx: -6, gz: 12, c: 2 },
    { name: 'Maharagama', gx: 18, gz: 12, c: 0 },
    { name: 'Kaduwela', gx: 30, gz: -12, c: 3 },
    { name: 'Kottawa', gx: 36, gz: 18, c: 4 },
  ];

  // routes: walk the grid from each branch, never reversing
  var routes = [];
  function walk(b, len) {
    var p = [b.gx, b.gz],
      pts = [p.slice()],
      dir = null,
      dirs = [
        [STEP, 0],
        [-STEP, 0],
        [0, STEP],
        [0, -STEP],
      ];
    for (var i = 0; i < len; i++) {
      var opts = dirs.filter(function (d) {
        if (dir && d[0] === -dir[0] && d[1] === -dir[1]) return false;
        var nx = p[0] + d[0],
          nz = p[1] + d[1];
        if (nx < VX[0] || nx > VX[VX.length - 1] || nz < HZ[0] || nz > HZ[HZ.length - 1])
          return false;
        if (coastX(nz) > nx - 2) return false;
        return true;
      });
      if (!opts.length) break;
      var straight =
        dir &&
        opts.some(function (d) {
          return d[0] === dir[0] && d[1] === dir[1];
        });
      var d = straight && rng() < 0.45 ? dir : opts[Math.floor(rng() * opts.length)];
      p = [p[0] + d[0], p[1] + d[1]];
      if (dir && d[0] === dir[0] && d[1] === dir[1]) pts[pts.length - 1] = p.slice();
      else pts.push(p.slice());
      dir = d;
    }
    return pts;
  }
  function pathFrom(pts, off, y) {
    var cp = pts.map(function (c) {
      return new THREE.Vector3(c[0] + off, y, c[1] + off);
    });
    var path = new THREE.CurvePath(),
      cursor = cp[0].clone(),
      CR = 1.1;
    for (var i = 1; i < cp.length; i++) {
      var a = cp[i - 1],
        b = cp[i];
      if (i < cp.length - 1) {
        var din = b.clone().sub(a).normalize(),
          dout = cp[i + 1].clone().sub(b).normalize();
        var p1 = b.clone().sub(din.clone().multiplyScalar(CR)),
          p2 = b.clone().add(dout.clone().multiplyScalar(CR));
        path.add(new THREE.LineCurve3(cursor.clone(), p1));
        path.add(new THREE.QuadraticBezierCurve3(p1, b.clone(), p2));
        cursor = p2;
      } else path.add(new THREE.LineCurve3(cursor.clone(), b.clone()));
    }
    return path;
  }
  var offs = [-0.24, 0.24, 0];
  branches.forEach(function (b, bi) {
    for (var r = 0; r < 2 + (bi % 2); r++) {
      var pts = walk(b, 5 + Math.floor(rng() * 3));
      if (pts.length < 3) continue;
      routes.push({ b: b, col: COMPANIES[b.c], path: pathFrom(pts, offs[r % 3], 0.12 + r * 0.01) });
    }
  });

  // route tubes + shop pins
  var shops = [];
  routes.forEach(function (rt) {
    var len = rt.path.getLength();
    var core = new THREE.Mesh(
      new THREE.TubeGeometry(rt.path, Math.max(80, Math.floor(len * 4)), 0.12, 8, false),
      new THREE.MeshStandardMaterial({
        color: rt.col,
        emissive: rt.col,
        emissiveIntensity: 0.7,
        roughness: 0.4,
      }),
    );
    scene.add(core);
    var glow = new THREE.Mesh(
      new THREE.TubeGeometry(rt.path, Math.max(80, Math.floor(len * 4)), 0.3, 8, false),
      new THREE.MeshBasicMaterial({
        color: rt.col,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      }),
    );
    scene.add(glow);
    rt.glow = glow;
    var n = Math.max(3, Math.floor(len / 7));
    var tmp = new THREE.Vector3();
    for (var i = 1; i <= n; i++) {
      var u = i / (n + 0.5),
        p = rt.path.getPointAt(u);
      rt.path.getTangentAt(u, tmp);
      var side = i % 2 ? 1 : -1;
      shops.push({ x: p.x - tmp.z * 0.85 * side, z: p.z + tmp.x * 0.85 * side, col: rt.col });
    }
  });
  var pinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6);
  pinGeo.translate(0, 0.45, 0);
  var headGeo = new THREE.SphereGeometry(0.22, 12, 10);
  var stemMat = new THREE.MeshStandardMaterial({ color: 0xdfe5f0 });
  var shopRings = [];
  shops.forEach(function (s, i) {
    var stem = new THREE.Mesh(pinGeo, stemMat);
    stem.position.set(s.x, 0, s.z);
    scene.add(stem);
    var head = new THREE.Mesh(
      headGeo,
      new THREE.MeshStandardMaterial({ color: s.col, emissive: s.col, emissiveIntensity: 0.5 }),
    );
    head.position.set(s.x, 1.0, s.z);
    scene.add(head);
    var ring = new THREE.Mesh(
      new THREE.RingGeometry(0.25, 0.4, 24),
      new THREE.MeshBasicMaterial({
        color: s.col,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(s.x, 0.06, s.z);
    scene.add(ring);
    shopRings.push({ m: ring, ph: rng() });
  });

  // buildings fill blocks, kept off roads, shops and depots
  var boxes = [];
  for (var gx = -W / 2 + 0.6; gx < W / 2 - 0.6; gx += 1.1) {
    for (var gz = -D / 2 + 0.6; gz < D / 2 - 0.6; gz += 1.1) {
      var bx = gx,
        bz = gz;
      if (bx < coastX(bz) + 1.1 || nearRoad(bx, bz, 1.0)) continue;
      var near = false;
      for (var k = 0; k < shops.length; k++) {
        if (Math.abs(shops[k].x - bx) < 0.7 && Math.abs(shops[k].z - bz) < 0.7) {
          near = true;
          break;
        }
      }
      for (k = 0; k < branches.length && !near; k++) {
        if (Math.abs(branches[k].gx + 2 - bx) < 2 && Math.abs(branches[k].gz + 2 - bz) < 2)
          near = true;
      }
      if (near || rng() < 0.14) continue;
      var dc = Math.hypot(bx + 22, bz + 10);
      var h = 0.35 + rng() * 1.1 + Math.max(0, 12 - dc) * 0.4 * rng();
      boxes.push([bx, bz, h, 0.75 + rng() * 0.2, 0.75 + rng() * 0.2]);
    }
  }
  var bgeo = new THREE.BoxGeometry(1, 1, 1);
  bgeo.translate(0, 0.5, 0);
  var inst = new THREE.InstancedMesh(
    bgeo,
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 }),
    boxes.length,
  );
  inst.castShadow = true;
  inst.receiveShadow = true;
  var dummy = new THREE.Object3D(),
    col = new THREE.Color(),
    pal = [0x1c2740, 0x222e4a, 0x19233a, 0x2a3858, 0x202c47];
  boxes.forEach(function (b, i) {
    dummy.position.set(b[0], 0, b[1]);
    dummy.scale.set(b[3], reduce ? b[2] : 0.001, b[4]);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
    col.setHex(pal[Math.floor(rng() * pal.length)]);
    if (rng() < 0.05) col.setHex(0x5a3a2a);
    inst.setColorAt(i, col);
  });
  scene.add(inst);

  // depots: warehouse block + beacon in company colour
  function label(text, color) {
    var c = document.createElement('canvas'),
      x = c.getContext('2d'),
      fs = 56;
    x.font = '600 ' + fs + 'px Figtree, "Segoe UI", sans-serif';
    var w = Math.ceil(x.measureText(text).width) + fs * 1.2,
      h = Math.ceil(fs * 1.6);
    c.width = w;
    c.height = h;
    x.font = '600 ' + fs + 'px Figtree, "Segoe UI", sans-serif';
    x.fillStyle = 'rgba(11,17,32,.78)';
    var r = h / 2;
    x.beginPath();
    x.moveTo(r, 0);
    x.lineTo(w - r, 0);
    x.arc(w - r, r, r, -Math.PI / 2, Math.PI / 2);
    x.lineTo(r, h);
    x.arc(r, r, r, Math.PI / 2, Math.PI * 1.5);
    x.fill();
    x.fillStyle = color;
    x.beginPath();
    x.arc(r, r, fs * 0.22, 0, Math.PI * 2);
    x.fill();
    x.fillStyle = '#e8ecf4';
    x.textBaseline = 'middle';
    x.fillText(text, r + fs * 0.45, h / 2 + 2);
    var tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 4;
    var sp = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }),
    );
    sp.scale.set((1.9 * w) / h, 1.9, 1);
    return sp;
  }
  var beacons = [],
    labels = [];
  function buildLabels() {
    labels.forEach(function (l) {
      scene.remove(l);
    });
    labels = [];
    branches.forEach(function (b) {
      var l = label(b.name, '#' + COMPANIES[b.c].toString(16).padStart(6, '0'));
      l.position.set(b.gx + 2, 4.6, b.gz + 2);
      scene.add(l);
      labels.push(l);
    });
  }
  branches.forEach(function (b) {
    var c = COMPANIES[b.c];
    var wh = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 1.3, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x31405f, roughness: 0.6 }),
    );
    wh.position.set(b.gx + 2, 0.65, b.gz + 2);
    wh.castShadow = true;
    scene.add(wh);
    var roof = new THREE.Mesh(
      new THREE.BoxGeometry(2.7, 0.14, 2.3),
      new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.35 }),
    );
    roof.position.set(b.gx + 2, 1.36, b.gz + 2);
    scene.add(roof);
    var beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 2.4, 8),
      new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.7 }),
    );
    beam.position.set(b.gx + 2, 2.6, b.gz + 2);
    scene.add(beam);
    var orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 16, 12),
      new THREE.MeshBasicMaterial({ color: c }),
    );
    orb.position.set(b.gx + 2, 3.9, b.gz + 2);
    scene.add(orb);
    var halo = new THREE.Mesh(
      new THREE.RingGeometry(0.6, 1.3, 32),
      new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      }),
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.set(b.gx + 2, 0.07, b.gz + 2);
    scene.add(halo);
    beacons.push({ orb: orb, halo: halo, ph: rng() * 6 });
  });
  buildLabels();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildLabels);

  // vehicles: reps on bikes and delivery lorries travel the routes
  var vehicles = [];
  function makeBike(c) {
    var g = new THREE.Group();
    var body = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.22, 0.18),
      new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.3 }),
    );
    body.position.y = 0.22;
    g.add(body);
    var rider = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.11, 0.34, 8),
      new THREE.MeshStandardMaterial({ color: 0x2c4a7c }),
    );
    rider.position.set(-0.04, 0.48, 0);
    g.add(rider);
    var helmet = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 10, 8),
      new THREE.MeshStandardMaterial({ color: c }),
    );
    helmet.position.set(-0.02, 0.72, 0);
    g.add(helmet);
    var lamp = new THREE.PointLight(c, 0.8, 2.2);
    lamp.position.set(0.4, 0.4, 0);
    g.add(lamp);
    g.traverse(function (o) {
      if (o.isMesh) o.castShadow = true;
    });
    return g;
  }
  function makeLorry(c) {
    var g = new THREE.Group();
    var box = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.72, 0.62),
      new THREE.MeshStandardMaterial({ color: 0xe8ecf4, roughness: 0.5 }),
    );
    box.position.set(-0.15, 0.48, 0);
    g.add(box);
    var cab = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.52, 0.6),
      new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.25 }),
    );
    cab.position.set(0.66, 0.38, 0);
    g.add(cab);
    var stripe = new THREE.Mesh(
      new THREE.BoxGeometry(1.22, 0.1, 0.64),
      new THREE.MeshStandardMaterial({ color: c }),
    );
    stripe.position.set(-0.15, 0.3, 0);
    g.add(stripe);
    var lamp = new THREE.PointLight(0xfff2d6, 0.9, 3);
    lamp.position.set(1, 0.4, 0);
    g.add(lamp);
    g.traverse(function (o) {
      if (o.isMesh) o.castShadow = true;
    });
    return g;
  }
  routes.forEach(function (rt, i) {
    var b = makeBike(rt.col);
    scene.add(b);
    vehicles.push({ g: b, path: rt.path, speed: 0.035 + rng() * 0.02, ph: rng(), y: 0.05 });
    if (i % 2 === 0) {
      var l = makeLorry(rt.col);
      scene.add(l);
      vehicles.push({ g: l, path: rt.path, speed: 0.02 + rng() * 0.012, ph: rng(), y: 0.04 });
    }
  });

  // area names
  [
    ['Colombo', -22, -20, 1.6],
    ['Indian Ocean', -41, 14, 1.3],
  ].forEach(function (a) {
    var c = document.createElement('canvas'),
      x = c.getContext('2d');
    c.width = 512;
    c.height = 96;
    x.font = '600 56px Figtree, sans-serif';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillStyle = a[0] === 'Indian Ocean' ? 'rgba(120,180,230,.8)' : 'rgba(232,236,244,.85)';
    x.fillText(a[0], 256, 50);
    var tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    var sp = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }),
    );
    sp.scale.set(a[3] * 5.3, a[3], 1);
    sp.position.set(a[1], 2.5, a[2]);
    scene.add(sp);
  });

  // publish counts for the overlay
  var set = function (id, v) {
    var el = document.getElementById(id);
    if (el) el.textContent = v;
  };
  set('net-branches', branches.length);
  set('net-routes', routes.length);
  set('net-reps', routes.length);
  set('net-lorries', vehicles.length - routes.length);
  set('net-shops', shops.length);
  window.parent.postMessage(
    {
      type: 'pentarix-network-counts',
      branches: branches.length,
      routes: routes.length,
      reps: routes.length,
      lorries: vehicles.length - routes.length,
    },
    window.location.origin,
  );

  // camera: slow orbit, no user controls so the hero text stays usable
  var angle = -0.35,
    radius = 54,
    height = 30;
  function placeCam() {
    var w = host.clientWidth,
      h = host.clientHeight,
      asp = w / h;
    var r = asp < 0.9 ? radius * 1.25 : radius;
    camera.position.set(
      target.x + Math.sin(angle) * r,
      height * (asp < 0.9 ? 1.15 : 1),
      target.z + Math.cos(angle) * r,
    );
    camera.lookAt(target);
  }
  function resize() {
    var w = host.clientWidth,
      h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    placeCam();
  }
  if (window.ResizeObserver) new ResizeObserver(resize).observe(host);
  else window.addEventListener('resize', resize);
  resize();

  var paused = false;
  window.addEventListener('message', function (event) {
    if (
      event.origin === window.location.origin &&
      event.source === window.parent &&
      event.data &&
      event.data.type === 'pentarix-route-pause'
    )
      paused = event.data.paused === true;
  });
  var visible = true;
  if (window.IntersectionObserver)
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
    }).observe(host);
  var t0 = performance.now(),
    grown = reduce ? 1 : 0,
    tan = new THREE.Vector3();
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || paused || document.hidden) return;
    var t = (performance.now() - t0) / 1000;
    if (grown < 1) {
      grown = Math.min(1, t / 1.8);
      var e = 1 - Math.pow(1 - grown, 3);
      boxes.forEach(function (b, i) {
        dummy.position.set(b[0], 0, b[1]);
        dummy.scale.set(b[3], Math.max(0.001, b[2] * e), b[4]);
        dummy.updateMatrix();
        inst.setMatrixAt(i, dummy.matrix);
      });
      inst.instanceMatrix.needsUpdate = true;
    }
    var mt = reduce ? 8 : t;
    vehicles.forEach(function (v) {
      var k = (v.ph + mt * v.speed) % 2,
        u = k < 1 ? k : 2 - k,
        back = k >= 1;
      u = 0.02 + u * 0.96;
      var p = v.path.getPointAt(u);
      v.path.getTangentAt(u, tan);
      v.g.position.set(p.x, v.y, p.z);
      var a = Math.atan2(tan.z, tan.x);
      v.g.rotation.y = -(back ? a + Math.PI : a);
    });
    shopRings.forEach(function (s) {
      var k = (mt * 0.6 + s.ph) % 1;
      s.m.scale.setScalar(1 + k * 1.2);
      s.m.material.opacity = 0.5 * (1 - k);
    });
    beacons.forEach(function (b) {
      var k = (mt * 0.5 + b.ph) % 1;
      b.halo.scale.setScalar(1 + k * 1.4);
      b.halo.material.opacity = 0.4 * (1 - k);
      b.orb.position.y = 3.9 + Math.sin(mt * 2 + b.ph) * 0.12;
    });
    if (!reduce) {
      angle = -0.35 + Math.sin(t * 0.05) * 0.55;
      placeCam();
    }
    var wide = host.clientWidth / host.clientHeight > 1.1,
      pv = new THREE.Vector3();
    labels.forEach(function (l) {
      pv.copy(l.position).project(camera);
      var o = wide ? Math.max(0, Math.min(1, (pv.x + 0.05) / 0.2)) : 0.85;
      l.material.opacity = o;
    });
    renderer.render(scene, camera);
  }
  frame();
})();
