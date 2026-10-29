// Builds ./www : bundles Tailwind, the Vazirmatn font and supabase-js locally so the app works 100% offline
const fs = require('fs'), path = require('path'), cp = require('child_process');
const root = __dirname, www = path.join(root, 'www');
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(path.join(www, 'fonts'), { recursive: true });

cp.execSync('npx tailwindcss -i ./tw.css -o ./www/tailwind.css --content "./src/index.html" --minify', { stdio: 'inherit', cwd: root });

const fdir = path.join(root, 'node_modules/@fontsource/vazirmatn/files');
let css = '';
for (const w of [400, 500, 700, 900]) {
  const f = fs.readdirSync(fdir).find(n => new RegExp('^vazirmatn-arabic-' + w + '-normal\\.woff2$').test(n));
  if (!f) { console.warn('font file missing for weight', w); continue; }
  fs.copyFileSync(path.join(fdir, f), path.join(www, 'fonts', f));
  css += "@font-face{font-family:'Vazirmatn';font-weight:" + w + ";font-style:normal;font-display:swap;src:url(fonts/" + f + ") format('woff2')}\n";
}
fs.writeFileSync(path.join(www, 'fonts.css'), css);

fs.copyFileSync(path.join(root, 'node_modules/@supabase/supabase-js/dist/umd/supabase.js'), path.join(www, 'supabase.js'));

let html = fs.readFileSync(path.join(root, 'src/index.html'), 'utf8');
html = html
  .replace(/<script[^>]*src="https:\/\/cdn\.tailwindcss\.com[^"]*"[^>]*><\/script>/, '<link rel="stylesheet" href="tailwind.css">')
  .replace(/<script[^>]*src="https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase[^"]*"[^>]*><\/script>/, '<script src="supabase.js"></script>')
  .replace(/<link rel="preconnect"[^>]*>\s*/g, '')
  .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/, '<link rel="stylesheet" href="fonts.css">');
fs.writeFileSync(path.join(www, 'index.html'), html);
for (const f of ['manifest.json', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'sw.js']) fs.copyFileSync(path.join(root, 'src', f), path.join(www, f));
console.log('www ready');
