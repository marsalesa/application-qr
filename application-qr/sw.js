// Service worker: membuat scanner.html tetap bisa dibuka saat internet mati
const N='gerbang-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(N).then(c=>c.addAll([
 'scanner.html','config.js',
 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js',
 'https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js']).catch(()=>{})))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
 e.respondWith(caches.open(N).then(c=>c.match(e.request,{ignoreSearch:true}).then(h=>{
  const f=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>h);
  return h||f})))});
