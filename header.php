<?php
$page = $_GET['page'] ?? 'accueil';

$links = [
    'accueil' => ['label' => 'Accueil', 'href' => 'index.html'],
    'ordinateur' => ['label' => 'Qu’est-ce qu’un ordinateur ?', 'href' => 'ordinateur.html'],
    'von-neumann' => ['label' => 'Architecture de von Neumann', 'href' => 'von-neumann.html'],
    'cpu' => ['label' => 'Le CPU', 'href' => 'cpu.html'],
    'memoire' => ['label' => 'La mémoire', 'href' => 'memoire.html'],
    'peripheriques' => ['label' => 'Les périphériques', 'href' => 'peripheriques.html'],
    'stockage' => ['label' => 'Le stockage', 'href' => 'stockage.html'],
    'systeme' => ['label' => 'Système d’exploitation', 'href' => 'systeme.html'],
    'reseaux' => ['label' => 'Réseaux et communication', 'href' => 'reseaux.html'],
    'securite' => ['label' => 'Sécurité informatique', 'href' => 'securite.html'],
    'glossaire' => ['label' => 'Glossaire', 'href' => 'glossaire.html'],
];

header('Content-Type: text/html; charset=utf-8');
?>
<header class="top-bar">
  <div class="brand">
    <span class="brand-icon">IT</span>
    Architecture &amp; Fonctionnement
  </div>
  <button class="mobile-toggle" id="mobile-menu-button" aria-label="Afficher le menu">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="14" height="2" rx="1" fill="currentColor"></rect>
      <rect x="3" y="9" width="14" height="2" rx="1" fill="currentColor"></rect>
      <rect x="3" y="13" width="14" height="2" rx="1" fill="currentColor"></rect>
    </svg>
  </button>
  <nav class="top-nav" aria-label="Navigation supérieure">
    <?php foreach ($links as $slug => $link): ?>
      <a href="<?php echo htmlspecialchars($link['href'], ENT_QUOTES); ?>"
         class="<?php echo $slug === $page ? 'active' : ''; ?>">
        <?php echo htmlspecialchars($link['label'], ENT_QUOTES); ?>
      </a>
    <?php endforeach; ?>
  </nav>
</header>
