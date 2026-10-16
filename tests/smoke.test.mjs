import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

test('Vite generates a standalone static site', () => {
  const html = readFileSync(join('dist', 'index.html'), 'utf8');
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /assets\/.+\.js/);
  assert.match(html, /assets\/.+\.css/);
  assert.doesNotMatch(html, /cdn\.tailwindcss\.com|aistudiocdn\.com|GEMINI_API_KEY/);
  for (const filename of html.matchAll(/(?:src|href)="\/(assets\/[^"]+)"/g)) {
    assert.ok(existsSync(join('dist', filename[1])), `Missing asset ${filename[1]}`);
  }
});

test('Cloudflare serves built assets without a Worker runtime', () => {
  const config = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'));
  assert.equal(config.assets.directory, './dist');
  assert.equal(config.assets.not_found_handling, 'single-page-application');
  assert.equal(config.main, undefined);
});
