const CACHE_NAME = 'adhkar-v24'; 
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap',
  'https://raw.githubusercontent.com/farok6799/azkar/main/adhkar-icon.png',
  'https://raw.githubusercontent.com/farok6799/azkar/main/adhan.mp3'
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// تفعيل الـ Service Worker وحذف النسخ القديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// جلب الملفات من الكاش في حال عدم وجود إنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
