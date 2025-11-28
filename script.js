const NAV_LINKS = [
  { slug: 'accueil', label: 'Accueil', href: 'index.html', icon: '🏠' },
  { slug: 'ordinateur', label: 'Qu’est-ce qu’un ordinateur ?', href: 'ordinateur.html', icon: '💡' },
  { slug: 'von-neumann', label: 'Architecture de von Neumann', href: 'von-neumann.html', icon: '🧠' },
  { slug: 'cpu', label: 'Le CPU', href: 'cpu.html', icon: '⚙️' },
  { slug: 'memoire', label: 'La mémoire', href: 'memoire.html', icon: '🧾' },
  { slug: 'peripheriques', label: 'Les périphériques', href: 'peripheriques.html', icon: '🖱️' },
  { slug: 'stockage', label: 'Le stockage', href: 'stockage.html', icon: '💽' },
  { slug: 'systeme', label: 'Système d’exploitation', href: 'systeme.html', icon: '🪟' },
  { slug: 'reseaux', label: 'Réseaux et communication', href: 'reseaux.html', icon: '🌐' },
  { slug: 'securite', label: 'Sécurité informatique', href: 'securite.html', icon: '🛡️' },
  { slug: 'glossaire', label: 'Glossaire', href: 'glossaire.html', icon: '📚' }
];

async function loadNavigation(currentPage) {
  const topNav = document.getElementById('top-nav');
  const sideNav = document.getElementById('side-nav');
  const params = `?page=${encodeURIComponent(currentPage)}`;

  try {
    if (topNav) {
      const header = await fetch(`header.php${params}`, { cache: 'no-cache' });
      topNav.innerHTML = await header.text();
    }
    if (sideNav) {
      const sidebar = await fetch(`sidebar.php${params}`, { cache: 'no-cache' });
      sideNav.innerHTML = await sidebar.text();
    }
    registerSidebarToggle();
  } catch (error) {
    console.error('Erreur de chargement du menu:', error);
    if (topNav) {
      topNav.innerHTML = generateFallbackTopNav(currentPage);
    }
    if (sideNav) {
      sideNav.innerHTML = generateFallbackSidebar(currentPage);
    }
  }
}

function generateFallbackTopNav(currentPage) {
  return `
    <header class="top-bar">
      <div class="brand"><span class="brand-icon">IT</span>Architecture & Fonctionnement</div>
      <nav class="top-nav">
        ${NAV_LINKS.map(link => `<a href="${link.href}" class="${link.slug === currentPage ? 'active' : ''}">${link.label}</a>`).join('')}
      </nav>
    </header>`;
}

function generateFallbackSidebar(currentPage) {
  return `
    <aside class="sidebar active">
      <div class="sidebar-title">Plan du cours</div>
      <nav class="sidebar-nav">
        ${NAV_LINKS.map((link, index) => `
          <a href="${link.href}" class="${link.slug === currentPage ? 'active' : ''}">
            <span>${String(index + 1).padStart(2, '0')}</span>${link.label}
          </a>`).join('')}
      </nav>
    </aside>`;
}

function registerSidebarToggle() {
  const toggle = document.getElementById('mobile-menu-button');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  sidebar.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      sidebar.classList.remove('active');
    }
  });
}

function initCommentForm() {
  const form = document.getElementById('comment-form');
  if (!form) return;

  const returnInput = form.querySelector('input[name="return"]');
  if (returnInput) {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    returnInput.value = path;
  }
}

async function loadComments() {
  const list = document.getElementById('comment-list');
  if (!list) return;

  try {
    const response = await fetch(`commentaires.txt?${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) {
      list.innerHTML = '<p class="comment-empty">Aucun commentaire pour le moment. Soyez le premier à poser une question !</p>';
      return;
    }

    const text = await response.text();
    const lines = text.trim().length ? text.trim().split('\n') : [];
    if (!lines.length) {
      list.innerHTML = '<p class="comment-empty">Aucun commentaire pour le moment. Soyez le premier à poser une question !</p>';
      return;
    }

    const fragment = document.createDocumentFragment();
    lines.reverse().forEach(line => {
      try {
        const entry = JSON.parse(line);
        fragment.appendChild(renderComment(entry));
      } catch (error) {
        console.warn('Commentaire invalide ignoré', error);
      }
    });
    list.innerHTML = '';
    list.appendChild(fragment);
  } catch (error) {
    console.error('Impossible de charger les commentaires', error);
    list.innerHTML = '<p class="comment-empty">Impossible de charger les commentaires pour le moment.</p>';
  }
}

function renderComment(entry) {
  const card = document.createElement('article');
  card.className = 'comment-card';

  const meta = document.createElement('div');
  meta.className = 'comment-meta';
  const name = document.createElement('strong');
  name.textContent = entry.name || 'Anonyme';
  const timestamp = document.createElement('span');
  timestamp.textContent = formatDate(entry.timestamp);
  meta.append(name, document.createTextNode(' • '), timestamp);

  if (entry.email) {
    const email = document.createElement('span');
    email.textContent = entry.email;
    meta.append(document.createTextNode(' • '), email);
  }

  const message = document.createElement('p');
  message.className = 'comment-message';
  message.textContent = entry.message || '';

  card.append(meta, message);
  return card;
}

function formatDate(value) {
  if (!value) return '';
  try {
    const date = new Date(value);
    return date.toLocaleString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return value;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = document.body.dataset.page || 'accueil';
  loadNavigation(currentPage);
  initCommentForm();
  loadComments();
});
