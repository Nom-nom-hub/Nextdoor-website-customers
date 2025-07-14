<?php
// php-demo/counter.php
// Simple visitor counter using a text file
$file = __DIR__ . '/counter.txt';
$count = 0;
if (file_exists($file)) {
    $fp = fopen($file, 'r+');
    if (flock($fp, LOCK_EX)) {
        $count = (int)fread($fp, 100);
        $count++;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, $count);
        fflush($fp);
        flock($fp, LOCK_UN);
    }
    fclose($fp);
} else {
    file_put_contents($file, '1');
    $count = 1;
}
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Visitor Counter Demo</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; color: #222; }
        .container { max-width: 400px; margin: 40px auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 24px #0001; padding: 28px 24px; }
        h1 { color: #179e9e; }
        .count { font-size: 2.2em; color: #20cfcf; font-weight: 700; }
    </style>
</head>
<body>
<div class="container">
    <h1>Visitor Counter</h1>
    <p>This page has been visited:</p>
    <div class="count"><?=$count?></div>
    <p>times.</p>
    <p style="margin-top:1.5em;"><a href="index.php">&larr; Back to Demo Dashboard</a></p>
</div>
</body>
</html> 