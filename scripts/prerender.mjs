import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import products from '../src/data/products.json' with { type: 'json' };

const distDirectory = resolve('dist');
const serverDirectory = resolve(distDirectory, 'server');
const serverFiles = await readdir(serverDirectory);
const entryFile = serverFiles.find((file) => file.startsWith('entry-server.') && file.endsWith('.js'));

if (!entryFile) throw new Error('Unable to find the server render entry.');

const { render } = await import(pathToFileURL(resolve(serverDirectory, entryFile)).href);
const template = await readFile(resolve(distDirectory, 'index.html'), 'utf8');
const routes = ['/', '/catalog', '/home', '/about', '/agent', ...products.map((product) => `/product/${encodeURIComponent(product.id)}`)];

for (const route of routes) {
  const page = template.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  const outputDirectory = resolve(distDirectory, route === '/' ? '' : route.slice(1));
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(resolve(outputDirectory, 'index.html'), page);
}

await rm(serverDirectory, { recursive: true, force: true });