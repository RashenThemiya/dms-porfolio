(function () {
  var paused = false;
  window.addEventListener('message', function (event) {
    if (event.origin !== window.location.origin || event.source !== window.parent || !event.data)
      return;
    if (event.data.type === 'pentarix-customer-pause') paused = event.data.paused === true;
    if (event.data.type === 'pentarix-customer-profile') {
      var c = event.data.customer;
      if (!c || typeof c.name !== 'string') return;
      document.getElementById('customer-name').textContent = c.name;
      document.getElementById('customer-summary').textContent =
        c.branches +
        ' branch / ' +
        c.reps +
        ' sales rep / ' +
        c.deliveryPersons +
        ' delivery person';
      ['routes', 'shops', 'items'].forEach(function (key) {
        if (Number.isInteger(c[key]) && c[key] >= 0)
          document.getElementById('customer-' + key).textContent = c[key];
      });
    }
  });

  var host = document.getElementById('map3d');
  if (!host) return;
  var failed = false;
  function fail() {
    if (failed) return;
    failed = true;
    window.renderCustomerRouteFallback(host, function () {
      return paused;
    });
  }
  if (typeof THREE === 'undefined') {
    fail();
    return;
  }
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
  } catch (e) {
    fail();
    return;
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  host.appendChild(renderer.domElement);
  renderer.domElement.addEventListener('webglcontextlost', function (event) {
    event.preventDefault();
    fail();
  });

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a1020, 60, 100);
  var camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
  camera.position.set(4, 27, 34);

  // lights
  scene.add(new THREE.HemisphereLight(0x9fb6ff, 0x0b1120, 0.42));
  var sun = new THREE.DirectionalLight(0xffe2c4, 1.05);
  sun.position.set(-14, 26, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  var sc = sun.shadow.camera;
  sc.left = -26;
  sc.right = 26;
  sc.top = 20;
  sc.bottom = -20;
  sc.near = 1;
  sc.far = 80;
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  // ground
  var W = 44,
    D = 32;
  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(W, D),
    new THREE.MeshStandardMaterial({ color: 0x141d31, roughness: 0.95 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // coastline (ocean on the west)
  function coastX(z) {
    return -13 + Math.sin(z * 0.22) * 1.6 + z * 0.12;
  }
  var shape = new THREE.Shape();
  shape.moveTo(-W / 2, -D / 2);
  for (var z = -D / 2; z <= D / 2; z += 1) {
    shape.lineTo(coastX(z), z);
  }
  shape.lineTo(-W / 2, D / 2);
  shape.lineTo(-W / 2, -D / 2);
  var ocean = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshStandardMaterial({
      color: 0x123a5c,
      roughness: 0.35,
      metalness: 0.1,
      emissive: 0x0a2238,
      emissiveIntensity: 0.6,
      side: THREE.DoubleSide,
    }),
  );
  ocean.rotation.x = Math.PI / 2;
  ocean.position.y = 0.02;
  scene.add(ocean);
  // shore glow line
  var shorePts = [];
  for (z = -D / 2; z <= D / 2; z += 0.5) shorePts.push(new THREE.Vector3(coastX(z), 0.04, z));
  scene.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(shorePts),
      new THREE.LineBasicMaterial({ color: 0x4fa3d9, transparent: true, opacity: 0.7 }),
    ),
  );

  // street grid (axis-aligned so the route can follow it)
  var VX = [-8, -2, 4, 10, 16],
    HZ = [-9, -3, 3, 9];
  var roadMat = new THREE.MeshStandardMaterial({ color: 0x2c3956, roughness: 0.85 });
  var dashMat = new THREE.LineDashedMaterial({
    color: 0x8a97b3,
    dashSize: 0.35,
    gapSize: 0.45,
    transparent: true,
    opacity: 0.55,
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

  // The twelve routes follow the town streets, sharing realistic approach roads.
  var depot = new THREE.Vector3(4, 0, -3);
  var routeColors = window.CustomerRouteData.colors;
  var itineraries = window.CustomerRouteData.itineraries;
  function streetPath(points, lane) {
    var path = new THREE.CurvePath();
    var vertices = points.map(function (point, index) {
      return new THREE.Vector3(point[0] + (index ? lane : 0), 0.13, point[1] + (index ? lane : 0));
    });
    var cursor = vertices[0].clone();
    for (var i = 1; i < vertices.length; i++) {
      var corner = vertices[i];
      if (i < vertices.length - 1) {
        var incoming = corner
          .clone()
          .sub(vertices[i - 1])
          .normalize();
        var outgoing = vertices[i + 1].clone().sub(corner).normalize();
        var radius = Math.min(
          0.55,
          corner.distanceTo(vertices[i - 1]) / 3,
          corner.distanceTo(vertices[i + 1]) / 3,
        );
        var entry = corner.clone().sub(incoming.multiplyScalar(radius));
        var exit = corner.clone().add(outgoing.multiplyScalar(radius));
        path.add(new THREE.LineCurve3(cursor.clone(), entry));
        path.add(new THREE.QuadraticBezierCurve3(entry, corner.clone(), exit));
        cursor = exit;
      } else path.add(new THREE.LineCurve3(cursor.clone(), corner.clone()));
    }
    return path;
  }
  var routes = [];
  var shops = [];
  var stopsXZ = [];
  itineraries.forEach(function (points, index) {
    var path = streetPath(points, ((index % 6) - 2.5) * 0.065);
    var route = {
      path: path,
      endpoint: path.getPointAt(1),
      color: routeColors[index],
      samples: path.getSpacedPoints(64),
    };
    routes.push(route);
    // Small storefronts sit beside the road, away from junctions and other shops.
    for (var sample = 0; sample < 7; sample++) {
      var u = 0.3 + sample * 0.095;
      var position = path.getPointAt(u),
        tangent = path.getTangentAt(u);
      var side = sample % 2 === 0 ? 1 : -1;
      var normal = new THREE.Vector3(-tangent.z * side, 0, tangent.x * side);
      var x = position.x + normal.x * 1.05,
        z = position.z + normal.z * 1.05;
      var blocked =
        nearRoad(x, z, 0.65) ||
        x < coastX(z) + 0.9 ||
        Math.abs(x) > W / 2 - 1 ||
        Math.abs(z) > D / 2 - 1;
      if (Math.hypot(x - depot.x, z - depot.z) < 2.8) blocked = true;
      for (var j = 0; j < shops.length; j++)
        if (Math.hypot(shops[j].x - x, shops[j].z - z) < 1.35) blocked = true;
      if (blocked) continue;
      shops.push({ x: x, z: z, angle: Math.atan2(-normal.x, -normal.z), color: route.color });
      stopsXZ.push([x, z]);
    }
  });

  function nearRoute(x, z) {
    for (var r = 0; r < routes.length; r++) {
      for (var step = 0; step < routes[r].samples.length; step++) {
        var point = routes[r].samples[step];
        if (Math.hypot(point.x - x, point.z - z) < 0.7) return true;
      }
    }
    return false;
  }

  // buildings (instanced) fill the blocks between streets
  var rng = (function (s) {
    return function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  })(42);
  var boxes = [];
  for (var gx = -W / 2 + 0.6; gx < W / 2 - 0.6; gx += 1.05) {
    for (var gz = -D / 2 + 0.6; gz < D / 2 - 0.6; gz += 1.05) {
      var x = gx,
        zz = gz;
      if (x < coastX(zz) + 1.1) continue;
      if (Math.abs(x - (depot.x + 1.65)) < 1.45 && Math.abs(zz - (depot.z - 1.8)) < 1.25) continue;
      if (nearRoad(x, zz, 1.0) || nearRoute(x, zz)) continue;
      var near = false;
      for (var k = 0; k < stopsXZ.length; k++) {
        if (Math.hypot(stopsXZ[k][0] - x, stopsXZ[k][1] - zz) < 0.75) {
          near = true;
          break;
        }
      }
      if (near || Math.hypot(depot.x - x, depot.z - zz) < 0.9 || rng() < 0.12) continue;
      var dc = Math.hypot(x + 3, zz + 13);
      var h = 0.35 + rng() * 1.1 + Math.max(0, 9 - dc) * 0.5 * rng();
      boxes.push([x, zz, h, 0.7 + rng() * 0.2, 0.7 + rng() * 0.2]);
    }
  }
  var bgeo = new THREE.BoxGeometry(1, 1, 1);
  bgeo.translate(0, 0.5, 0);
  var bmat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7, metalness: 0.05 });
  var inst = new THREE.InstancedMesh(bgeo, bmat, boxes.length);
  inst.castShadow = true;
  inst.receiveShadow = true;
  var dummy = new THREE.Object3D(),
    col = new THREE.Color();
  var palette = [0x1c2740, 0x222e4a, 0x19233a, 0x2a3858, 0x202c47];
  boxes.forEach(function (b, i) {
    dummy.position.set(b[0], 0, b[1]);
    dummy.scale.set(b[3], reduce ? b[2] : 0.001, b[4]);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
    col.setHex(palette[Math.floor(rng() * palette.length)]);
    if (rng() < 0.05) col.setHex(0x5a3a2a);
    inst.setColorAt(i, col);
  });
  scene.add(inst);

  // Colored route lines sit on road corridors and all originate at the branch.
  routes.forEach(function (route) {
    var tube = new THREE.Mesh(
      new THREE.TubeGeometry(route.path, 140, 0.052, 6, false),
      new THREE.MeshStandardMaterial({
        color: route.color,
        emissive: route.color,
        emissiveIntensity: 0.4,
        roughness: 0.4,
      }),
    );
    scene.add(tube);
    var glow = new THREE.Mesh(
      new THREE.TubeGeometry(route.path, 140, 0.13, 6, false),
      new THREE.MeshBasicMaterial({
        color: route.color,
        transparent: true,
        opacity: 0.13,
        depthWrite: false,
      }),
    );
    scene.add(glow);
    route.glow = glow;
  });

  // Distinct shopfronts: low-rise buildings, glass doors and striped awnings.
  var shopBodyGeometry = new THREE.BoxGeometry(0.9, 0.65, 0.72);
  var shopRoofGeometry = new THREE.BoxGeometry(1.0, 0.08, 0.82);
  var stripeGeometry = new THREE.BoxGeometry(0.18, 0.08, 0.32);
  var glassGeometry = new THREE.BoxGeometry(0.52, 0.4, 0.025);
  var neutralShopMaterial = new THREE.MeshStandardMaterial({ color: 0xb4a18a, roughness: 0.9 });
  var glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x172c43,
    roughness: 0.3,
    metalness: 0.2,
  });
  var creamMaterial = new THREE.MeshStandardMaterial({ color: 0xe8dfc8, roughness: 0.8 });
  var storefrontMaterials = {};
  shops.forEach(function (shop) {
    var group = new THREE.Group();
    group.position.set(shop.x, 0.05, shop.z);
    group.rotation.y = shop.angle;
    var accent =
      storefrontMaterials[shop.color] ||
      (storefrontMaterials[shop.color] = new THREE.MeshStandardMaterial({
        color: shop.color,
        roughness: 0.8,
      }));
    var body = new THREE.Mesh(shopBodyGeometry, neutralShopMaterial);
    body.position.y = 0.325;
    group.add(body);
    var roof = new THREE.Mesh(shopRoofGeometry, accent);
    roof.position.y = 0.7;
    group.add(roof);
    var glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.set(0, 0.28, 0.374);
    group.add(glass);
    for (var stripe = 0; stripe < 5; stripe++) {
      var awning = new THREE.Mesh(stripeGeometry, stripe % 2 ? creamMaterial : accent);
      awning.position.set(-0.36 + stripe * 0.18, 0.56, 0.48);
      awning.rotation.x = -0.16;
      group.add(awning);
    }
    group.traverse(function (part) {
      if (part.isMesh) {
        part.castShadow = true;
        part.receiveShadow = true;
      }
    });
    scene.add(group);
  });
  // One branch warehouse, with its entrance connected to the shared departure point.
  var warehouse = new THREE.Group();
  warehouse.position.set(depot.x + 1.65, 0, depot.z - 1.8);
  var warehouseBody = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 1.15, 1.55),
    new THREE.MeshStandardMaterial({ color: 0x58677b, roughness: 0.9 }),
  );
  warehouseBody.position.y = 0.575;
  warehouse.add(warehouseBody);
  var warehouseRoof = new THREE.Mesh(
    new THREE.BoxGeometry(2.15, 0.15, 1.7),
    new THREE.MeshStandardMaterial({ color: 0xff6b0f, roughness: 0.7 }),
  );
  warehouseRoof.position.y = 1.22;
  warehouse.add(warehouseRoof);
  var warehouseDoor = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.75, 0.03), glassMaterial);
  warehouseDoor.position.set(0, 0.375, 0.79);
  warehouse.add(warehouseDoor);
  warehouse.traverse(function (part) {
    if (part.isMesh) {
      part.castShadow = true;
      part.receiveShadow = true;
    }
  });
  scene.add(warehouse);

  // label sprites
  function textSprite(text, opt) {
    opt = opt || {};
    var c = document.createElement('canvas'),
      ctx = c.getContext('2d'),
      fs = opt.size || 64;
    ctx.font = (opt.weight || 700) + ' ' + fs + 'px Figtree, "Segoe UI", sans-serif';
    var w = Math.ceil(ctx.measureText(text).width) + fs * 0.8,
      hgt = Math.ceil(fs * 1.5);
    if (opt.circle) {
      w = hgt;
    }
    c.width = w;
    c.height = hgt;
    var labelSize = opt.circle && text.length > 2 ? fs * 0.62 : fs;
    ctx.font = (opt.weight || 700) + ' ' + labelSize + 'px Figtree, "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (opt.bg) {
      ctx.fillStyle = opt.bg;
      if (opt.circle) {
        ctx.beginPath();
        ctx.arc(w / 2, hgt / 2, hgt / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      } else {
        var r = hgt / 2;
        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(w - r, 0);
        ctx.arc(w - r, r, r, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(r, hgt);
        ctx.arc(r, r, r, Math.PI / 2, Math.PI * 1.5);
        ctx.fill();
      }
    }
    ctx.fillStyle = opt.color || '#fff';
    ctx.fillText(text, w / 2, hgt / 2 + fs * 0.05);
    var tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    tex.encoding = THREE.sRGBEncoding;
    var sp = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: tex, depthTest: opt.depthTest !== false, transparent: true }),
    );
    var sc = opt.scale || 1;
    sp.scale.set((sc * w) / hgt, sc, 1);
    return sp;
  }

  // pins
  var pins = [];
  function addPin(p, label, color, tall) {
    var g = new THREE.Group();
    g.position.set(p.x, 0, p.z);
    var ring = new THREE.Mesh(
      new THREE.RingGeometry(0.35, 0.55, 32),
      new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    g.add(ring);
    var hgt = tall ? 2.4 : 1.6;
    var stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, hgt, 8),
      new THREE.MeshStandardMaterial({ color: 0xe8ecf4, roughness: 0.5 }),
    );
    stem.position.y = hgt / 2;
    stem.castShadow = true;
    g.add(stem);
    var spr = textSprite(label, { bg: color, circle: true, size: 56, scale: tall ? 1.55 : 1.1 });
    spr.position.y = hgt + 0.45;
    g.add(spr);
    scene.add(g);
    pins.push({ g: g, ring: ring, spr: spr, base: hgt + 0.45, phase: pins.length * 0.6 });
  }
  addPin(depot, 'B', '#1a9b63', true);
  routes.forEach(function (route, index) {
    addPin(
      route.endpoint,
      'R' + (index + 1),
      '#' + route.color.toString(16).padStart(6, '0'),
      false,
    );
  });

  // area labels
  var areas = [['Branch', depot.x + 1.65, depot.z - 3, 1.0]];
  var areaSprites = [];
  function buildAreaLabels() {
    areaSprites.forEach(function (s) {
      scene.remove(s);
    });
    areaSprites = areas.map(function (a) {
      var s = textSprite(a[0], {
        color: a[0] === 'Distribution route' ? 'rgba(120,180,230,.85)' : 'rgba(232,236,244,.92)',
        size: 56,
        weight: 600,
        scale: a[3],
        depthTest: false,
      });
      s.position.set(a[1], 2.2, a[2]);
      scene.add(s);
      return s;
    });
  }
  buildAreaLabels();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(buildAreaLabels);
  }

  // delivery van marker moving along route
  var van = new THREE.Group();
  van.name = 'delivery-vehicle';
  var vanBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.42, 0.42),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }),
  );
  vanBody.position.y = 0.21;
  vanBody.castShadow = true;
  van.add(vanBody);
  var cab = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.3, 0.4),
    new THREE.MeshStandardMaterial({ color: 0xff6b0f, roughness: 0.4 }),
  );
  cab.position.set(0.48, 0.15, 0);
  cab.castShadow = true;
  van.add(cab);
  var vanLight = new THREE.PointLight(0xff8a3d, 1.2, 4);
  vanLight.position.y = 0.8;
  van.add(vanLight);
  scene.add(van);

  // Delivery wheels and a separate sales-rep motorbike.
  var tireMaterial = new THREE.MeshStandardMaterial({ color: 0x101725, roughness: 0.95 });
  var metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a9bb2,
    roughness: 0.4,
    metalness: 0.45,
  });
  var vanWheelGeometry = new THREE.CylinderGeometry(0.115, 0.115, 0.08, 12);
  [-0.2, 0.36].forEach(function (x) {
    [-0.24, 0.24].forEach(function (z) {
      var wheel = new THREE.Mesh(vanWheelGeometry, tireMaterial);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, 0.08, z);
      van.add(wheel);
    });
  });
  var deliveryLabel = textSprite('Delivery', {
    color: '#ffb23e',
    size: 50,
    scale: 0.85,
    depthTest: false,
  });
  deliveryLabel.position.y = 1.35;
  van.add(deliveryLabel);
  var bike = new THREE.Group();
  bike.name = 'sales-rep-bike';
  var bikeMaterial = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.5 });
  var wheelGeometry = new THREE.CylinderGeometry(0.17, 0.17, 0.1, 16);
  [-0.34, 0.36].forEach(function (x) {
    var wheel = new THREE.Mesh(wheelGeometry, tireMaterial);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(x, 0.18, 0);
    bike.add(wheel);
    var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.115, 10), metalMaterial);
    hub.rotation.x = Math.PI / 2;
    hub.position.copy(wheel.position);
    bike.add(hub);
  });
  function bikeBar(from, to, radius, material) {
    var start = new THREE.Vector3(from[0], from[1], from[2]),
      end = new THREE.Vector3(to[0], to[1], to[2]);
    var bar = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, start.distanceTo(end), 8),
      material,
    );
    bar.position.copy(start).add(end).multiplyScalar(0.5);
    bar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.sub(start).normalize());
    bike.add(bar);
  }
  bikeBar([-0.34, 0.18, 0], [0.05, 0.46, 0], 0.035, metalMaterial);
  bikeBar([0.05, 0.46, 0], [0.36, 0.18, 0], 0.035, metalMaterial);
  bikeBar([0.36, 0.18, 0], [0.22, 0.62, 0], 0.035, metalMaterial);
  bikeBar([0.22, 0.62, -0.15], [0.22, 0.62, 0.15], 0.025, metalMaterial);
  var tank = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.2, 0.22), bikeMaterial);
  tank.position.set(0.06, 0.43, 0);
  bike.add(tank);
  var seat = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.07, 0.22), tireMaterial);
  seat.position.set(-0.19, 0.52, 0);
  bike.add(seat);
  var rider = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.13, 0.31, 10),
    new THREE.MeshStandardMaterial({ color: 0x47648b }),
  );
  rider.position.set(-0.1, 0.76, 0);
  rider.rotation.z = -0.12;
  bike.add(rider);
  var helmet = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), bikeMaterial);
  helmet.position.set(-0.06, 0.99, 0);
  bike.add(helmet);
  bikeBar([-0.08, 0.82, -0.1], [0.22, 0.62, -0.12], 0.045, metalMaterial);
  bikeBar([-0.08, 0.82, 0.1], [0.22, 0.62, 0.12], 0.045, metalMaterial);
  var bag = new THREE.Mesh(
    new THREE.BoxGeometry(0.23, 0.23, 0.25),
    new THREE.MeshStandardMaterial({ color: 0xb78958 }),
  );
  bag.position.set(-0.4, 0.56, 0);
  bike.add(bag);
  var repLabel = textSprite('Sales rep', {
    color: '#7dd3fc',
    size: 50,
    scale: 0.85,
    depthTest: false,
  });
  repLabel.position.y = 1.55;
  bike.add(repLabel);
  bike.traverse(function (part) {
    if (part.isMesh) part.castShadow = true;
  });
  bike.scale.setScalar(1.35);
  van.scale.setScalar(1.25);
  scene.add(bike);

  // controls
  var controls = null;
  if (THREE.OrbitControls) {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    renderer.domElement.style.touchAction = 'pan-y';
    controls.target.set(depot.x, 0, depot.z);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minPolarAngle = 0.45;
    controls.maxPolarAngle = 1.12;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.55;
    controls.addEventListener('start', function () {
      var h = document.getElementById('hint');
      if (h) h.style.opacity = '0';
    });
  } else {
    camera.lookAt(depot.x, 0, depot.z);
  }

  function resize() {
    var w = host.clientWidth,
      h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = 34;
    camera.updateProjectionMatrix();
    var tgt = controls ? controls.target : new THREE.Vector3(depot.x, 0, depot.z);
    var dist = w / h < 0.9 ? 70 : w / h < 1.15 ? 60 : 54;
    var dir = camera.position.clone().sub(tgt).normalize();
    camera.position.copy(tgt).add(dir.multiplyScalar(dist));
  }
  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(host);
  } else window.addEventListener('resize', resize);
  resize();

  // render loop (paused when off-screen)
  var visible = true,
    clock = new THREE.Clock(),
    t0 = performance.now(),
    grown = reduce ? 1 : 0;
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
    }).observe(host);
  }
  var up = new THREE.Vector3(),
    tan = new THREE.Vector3();
  function frame() {
    if (failed) return;
    requestAnimationFrame(frame);
    if (failed || !visible || paused || document.hidden) return;
    var t = (performance.now() - t0) / 1000;
    // buildings rise in on load
    if (grown < 1) {
      grown = Math.min(1, t / 1.6);
      var e = 1 - Math.pow(1 - grown, 3);
      boxes.forEach(function (b, i) {
        dummy.position.set(b[0], 0, b[1]);
        dummy.scale.set(b[3], Math.max(0.001, b[2] * e), b[4]);
        dummy.updateMatrix();
        inst.setMatrixAt(i, dummy.matrix);
      });
      inst.instanceMatrix.needsUpdate = true;
    }
    pins.forEach(function (p) {
      if (!reduce) {
        p.spr.position.y = p.base + Math.sin(t * 2 + p.phase) * 0.08;
      }
      var k = reduce ? 0 : (t * 0.8 + p.phase) % 1;
      p.ring.scale.setScalar(1 + k * 0.9);
      p.ring.material.opacity = 0.55 * (1 - k);
    });
    // One delivery person and one sales rep each serve routes from the same branch.
    function positionVehicle(vehicle, duration, offset) {
      var elapsed = reduce ? 3.5 : t + offset;
      var route = routes[Math.floor(elapsed / duration) % routes.length];
      var progress = (elapsed % duration) / duration;
      var returning = progress >= 0.5;
      var u = returning ? 2 - progress * 2 : progress * 2;
      var pos = route.path.getPointAt(u);
      route.path.getTangentAt(u, tan);
      vehicle.position.set(pos.x, 0.06, pos.z);
      vehicle.rotation.y = -Math.atan2(tan.z, tan.x) + (returning ? Math.PI : 0);
    }
    positionVehicle(van, 10, 0);
    positionVehicle(bike, 8, 13);
    routes.forEach(function (route) {
      route.glow.material.opacity = reduce ? 0.13 : 0.13 + Math.sin(t * 2.4) * 0.04;
    });
    if (controls) controls.update();
    renderer.render(scene, camera);
  }
  frame();
})();
