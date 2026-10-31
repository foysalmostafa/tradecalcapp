/**
 * IndexNow URL Submitter for tradecalcapp.com
 * Run this script after every deployment:
 *   node submit-indexnow.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ── Config ────────────────────────────────────────────────────────────────────
const HOST = 'tradecalcapp.com';
const KEY  = 'ecb1f8f56b334ef5bb44c4a8edfadb5d';
const OUT_DIR = path.join(__dirname, 'out');

// ── Collect all URLs from the out/ folder ─────────────────────────────────────
function collectUrls(dir, baseDir = dir) {
  let urls = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      urls = urls.concat(collectUrls(fullPath, baseDir));
    } else if (entry.name.endsWith('.html')) {
      // Convert file path → URL path
      let urlPath = fullPath
        .replace(baseDir, '')
        .replace(/\\/g, '/')           // Windows backslashes
        .replace(/\/index\.html$/, '/') // /foo/index.html → /foo/
        .replace(/\.html$/, '');        // /foo.html → /foo

      if (urlPath === '') urlPath = '/';

      // Skip Next.js internal pages
      if (urlPath === '/_not-found' || urlPath.startsWith('/_')) continue;

      urls.push(`https://${HOST}${urlPath}`);
    }
  }

  return urls;
}

// ── Submit to IndexNow ────────────────────────────────────────────────────────
function submitToIndexNow(urls) {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  });

  const options = {
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('📂 Scanning out/ for HTML pages...');
  const urls = collectUrls(OUT_DIR);
  console.log(`✅ Found ${urls.length} URLs\n`);

  // IndexNow accepts max 10,000 URLs per request — split just in case
  const BATCH_SIZE = 10000;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`🚀 Submitting batch of ${batch.length} URLs to IndexNow...`);

    const result = await submitToIndexNow(batch);

    if (result.status === 200 || result.status === 202) {
      console.log(`✅ Success! Status: ${result.status}`);
    } else if (result.status === 422) {
      console.log(`⚠️  Some URLs were invalid (422). Check your domain or key.`);
    } else if (result.status === 429) {
      console.log(`⚠️  Rate limited (429). Wait a day and try again.`);
    } else {
      console.log(`❌ Unexpected status: ${result.status}`);
      console.log('Response:', result.body);
    }
  }

  console.log('\n📋 URLs submitted:');
  urls.forEach((u) => console.log('  ', u));
}

main().catch(console.error);
