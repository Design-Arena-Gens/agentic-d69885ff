<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Méthode non autorisée.';
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$return = trim($_POST['return'] ?? 'index.html');

if ($message === '') {
    header('Location: ' . $return . '#commentaires');
    exit;
}

$sanitizedEmail = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
$entry = [
    'timestamp' => date('c'),
    'name' => $name !== '' ? $name : 'Anonyme',
    'email' => $sanitizedEmail,
    'message' => $message,
];

$json = json_encode($entry, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$file = __DIR__ . DIRECTORY_SEPARATOR . 'commentaires.txt';

try {
    if (!file_exists($file)) {
        touch($file);
    }
    $fp = fopen($file, 'ab');
    if ($fp === false) {
        throw new RuntimeException('Impossible d’ouvrir le fichier des commentaires.');
    }
    if (!flock($fp, LOCK_EX)) {
        throw new RuntimeException('Impossible de verrouiller le fichier des commentaires.');
    }
    fwrite($fp, $json . PHP_EOL);
    flock($fp, LOCK_UN);
    fclose($fp);
} catch (Throwable $e) {
    error_log($e->getMessage());
}

header('Location: ' . $return . '#commentaires');
exit;
