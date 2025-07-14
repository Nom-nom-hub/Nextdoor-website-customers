<?php
// php-demo/router.php
// Simple router demo
$page = $_GET['page'] ?? 'home';
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Router Demo</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; color: #222; }
        .container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 24px #0001; padding: 28px 24px; }
        h1 { color: #179e9e; }
        nav { margin-bottom: 1.5em; }
        a { color: #179e9e; text-decoration: none; font-weight: 600; margin-right: 18px; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
<div class="container">
    <h1>Router Demo</h1>
    <nav>
        <a href="router.php?page=home">Home</a>
        <a href="router.php?page=about">About</a>
        <a href="router.php?page=contact">Contact</a>
    </nav>
    <?php if ($page === 'about'): ?>
        <h2>About Us</h2>
        <p>This is the about page. We build modern PHP demos for technical review.</p>
    <?php elseif ($page === 'contact'): ?>
        <h2>Contact</h2>
        <p>Email us at <a href="mailto:info@example.com">info@example.com</a></p>
    <?php else: ?>
        <h2>Home</h2>
        <p>Welcome to our PHP router demo. Use the links above to navigate.</p>
    <?php endif; ?>
    <p style="margin-top:1.5em;"><a href="index.php">&larr; Back to Demo Dashboard</a></p>
</div>
</body>
</html> 