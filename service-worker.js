// ตั้งชื่อ Cache ของเรา
const CACHE_NAME = 'chlorine-calc-v1';
// รายการไฟล์ที่ต้องการให้ใช้งานแบบ Offline ได้
const urlsToCache = [
  'index.html',
  'manifest.json'
];

// ติดตั้ง Service Worker และเก็บไฟล์ลง Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// เรียกใช้งานไฟล์จาก Cache เมื่อไม่มีอินเทอร์เน็ต
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // ถ้าเจอใน Cache ให้ใช้จาก Cache, ถ้าไม่เจอให้โหลดจาก Network ปกติ
        return response || fetch(event.request);
      })
  );
});