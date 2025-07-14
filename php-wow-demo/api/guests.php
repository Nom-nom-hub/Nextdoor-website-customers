<?php
// php-wow-demo/api/guests.php
// RESTful API endpoint for guestbook entries (JSON)
header('Content-Type: application/json');
$dbFile = __DIR__ . '/../db.sqlite';
if (!file_exists($dbFile)) {
    echo json_encode([]);
    exit;
}
try {
    $db = new PDO('sqlite:' . $dbFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $db->query('SELECT id, name, message, created_at FROM guestbook ORDER BY created_at DESC');
    $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($entries);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error.']);
} 