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
<aside class="sidebar" aria-label="Navigation latérale">
  <div class="sidebar-title">Plan du cours</div>
  <nav class="sidebar-nav">
    <?php $index = 1; ?>
    <?php foreach ($links as $slug => $link): ?>
      <a href="<?php echo htmlspecialchars($link['href'], ENT_QUOTES); ?>"
         class="<?php echo $slug === $page ? 'active' : ''; ?>">
        <span><?php echo str_pad((string)$index, 2, '0', STR_PAD_LEFT); ?></span>
        <?php echo htmlspecialchars($link['label'], ENT_QUOTES); ?>
      </a>
      <?php $index++; ?>
    <?php endforeach; ?>
  </nav>
</aside>
