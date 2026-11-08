import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';
import { screens } from '../src/data/home/screens.js';
import { customerStats } from '../src/data/home/customers.js';

const root = process.cwd();
async function filesIn(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const name = path.join(directory, entry.name);
      return entry.isDirectory() ? filesIn(name) : [name];
    }),
  );
  return nested.flat();
}

// Build checks module imports; this additionally checks public URLs, which Vite
// deliberately copies without resolving them against the filesystem.
const files = [...(await filesIn('src')), ...(await filesIn('public/animations'))];
let assets = 0;
for (const file of files) {
  if (!/\.(js|jsx|css|html)$/.test(file)) continue;
  const source = await fs.readFile(file, 'utf8');
  for (const match of source.matchAll(
    /['"`]((?:\/(?:images|icons|logo|animations|vendor)\/)[^'"`\s<>]+\.(?:png|webp|svg|jpg|jpeg|html|js|css))['"`]/g,
  )) {
    await fs.access(path.join(root, 'public', match[1]));
    assets++;
  }
}
assert.equal(screens.length, 4);
assert.equal(
  screens.find((screen) => screen.name === 'Items').image,
  '/images/screens/screen-3.webp',
);
assert.equal(
  screens.find((screen) => screen.name === 'Branches').image,
  '/images/screens/screen-2.webp',
);
assert.deepEqual(
  customerStats.map(([value]) => value),
  ['1', '12', '865', '247', '1', '1'],
);

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/app/App.jsx');
  for (const route of ['/', '/features', '/solutions', '/pricing', '/about', '/contact']) {
    const html = renderToStaticMarkup(
      React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(App)),
    );
    assert.equal((html.match(/<header\b/g) || []).length, 1, `${route}: shared navigation`);
    assert.equal((html.match(/<main\b/g) || []).length, 1, `${route}: main content`);
    assert.equal((html.match(/<footer\b/g) || []).length, 1, `${route}: shared footer`);
    if (route === '/' || route === '/pricing') {
      for (const price of ['Rs. 150,000', 'Rs. 395,000', 'Rs. 1M']) assert.ok(html.includes(price));
    }
    if (route === '/') {
      const sections = [...html.matchAll(/<section[^>]* id="([^"]+)"/g)].map((match) => match[1]);
      assert.deepEqual(sections, [
        'why',
        'how-it-works',
        'features',
        'screens',
        'customers',
        'pricing',
      ]);
      assert.ok(html.includes('Thilina Distributors'));
    }
    if (route === '/contact') assert.ok(!html.includes('<form'), 'email form removed');
    assert.ok(html.includes('href="tel:+94751352570"'), `${route}: call link`);
    assert.ok(!html.includes('href="/contact"'), `${route}: demo/contact actions call directly`);
    console.log(`PASS ${route}`);
  }
  console.log(`PASS ${assets} public asset references and Home content invariants`);
} finally {
  await server.close();
}
