const CACHE_NAME = 'site-static-v2'; // Version change kiya hai taaki naya cache ban sake
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/blog_data.js',
  '/favicon.png',
  
  // --- HTML Pages ---
  '/about.html',
  '/projects.html',
  '/contact.html',
  '/blog.html',
  '/resources.html',
  '/roadmaps.html',
  '/interview.html',
  '/portfolio.html',
  '/python-basics.html',
  '/react-basics.html',
  '/sql-basics.html',
  '/ui-navigation.html',
  '/communication-storytelling.html',
  '/css-basics.html',
  '/data-analyst-roadmap.html',
  '/data-visualizations-basics.html',
  '/database-basics.html',
  '/deployment-basics.html',
  '/devops-10.1.html',
  '/devops-10.2.html',
  '/android-publishing.html',
  '/android-storage.html',
  '/android-studio.html',
  '/android-testing.html',
  '/android-ui.html',
  '/api-basics.html',
  '/auth-basics.html',
  '/backend-language-choice.html',
  '/backend-projects.html',
  '/backend-roadmap.html',
  '/bi-tools-basics.html',
  '/devops-cloud.html',
  '/devops-containers.html',
  '/devops-engineer.html',
  '/devops-iac-ansible.html',
  '/devops-linux.html',
  '/devops-monitoring.html',
  '/devops-scripting.html',
  '/devops-security-vault.html',
  '/frontend-projects.html',
  '/frontend-roadmap.html',
  '/full-stack-developer.html',
  '/devops-2.1.html',
  '/devops-2.2.html',
  '/devops-3.html',
  '/devops-6.1.html',
  '/devops-6.2.html',
  '/devops-7.1.html',
  '/devops-7.2.html',
  '/devops-9.1.html',
  '/devops-9.2.html',
  '/devops-advanced-k8s.html',
  '/devops-cicd.html',
  '/git-basics.html',
  '/html-basics.html',
  '/internet-basics.html',
  '/javascript-basics.html',
  '/kotlin.html',
  '/math-stats-basics.html',
  '/nodejs-express-basics.html',
  '/post-api-analogy.html',
  '/post-first-website.html',
  '/android-advanced-ui.html',
  '/android-architecture.html',
  '/android-components.html',
  '/android-developer-roadmap.html',
  '/android-firebase.html',
  '/android-networking.html',
  '/post-github-pack.html',
  '/post-vscode-extensions.html',
  '/project-blog.html',
  '/project-chat-app.html',
  '/project-ecommerce.html',
  '/project-task-manager.html',
  '/project-url-shortener.html',
  '/project-weather-app.html',

  // --- Images Folder ---
  '/images/about-me.jpg',
  '/images/hero-bg.jpg',
  '/images/interview.png',
  '/images/logo.png',
  '/images/my-next-big-project.jpg',
  '/images/placeholder.txt',
  '/images/project-dashboard.jpg',
  '/images/project-ecommerce.jpg',
  '/images/resources.png',
  '/images/roadmap-android.jpg',
  '/images/roadmap-backend.jpg',
  '/images/roadmap-data-analyst-worldmap.jpg',
  '/images/roadmap-devops.jpg',
  '/images/roadmap-frontend.jpg',
  '/images/roadmap-fullstack.jpg',
  '/images/roadmap.jpg',
  '/images/social-share-image.jpg',
  '/images/street-surf.jpg',

  // --- Blog Images Folder ---
  '/images/Blog/post-api.jpg',
  '/images/Blog/post-first-website.jpg',
  '/images/Blog/post-github-pack.jpg',
  '/images/Blog/post-vscode.jpg'
];

// Install Event: Cache files
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event: Serve files from cache if offline
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});