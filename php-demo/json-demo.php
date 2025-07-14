<?php
// php-demo/json-demo.php
// Reads and displays data from data.json
$dataFile = __DIR__ . '/data.json';
$data = [];
$error = '';
if (file_exists($dataFile)) {
    $json = file_get_contents($dataFile);
    $data = json_decode($json, true);
    if (!is_array($data)) $error = 'Invalid JSON format.';
} else {
    $error = 'data.json not found.';
}
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JSON Data Demo</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; color: #222; }
        .container { max-width: 400px; margin: 40px auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 24px #0001; padding: 28px 24px; }
        h1 { color: #179e9e; }
        ul { padding-left: 1.2em; }
        .error { color: #b00; background: #ffeaea; border: 1px solid #fbb; padding: 10px; border-radius: 6px; margin-bottom: 1em; }
    </style>
</head>
<body>
<div class="container">
    <h1>JSON Data Demo</h1>
    <?php if ($error): ?>
        <div class="error"><?=htmlspecialchars($error)?></div>
    <?php elseif ($data): ?>
        <ul>
            <?php foreach ($data as $item): ?>
                <li><?=htmlspecialchars($item['name'] ?? 'Unknown')?></li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>No data found.</p>
    <?php endif; ?>
    <p style="margin-top:1.5em;"><a href="index.php">&larr; Back to Demo Dashboard</a></p>
</div>
</body>
</html> 