<?php
// php-demo/contact.php
// Simple contact form handler with validation and feedback
function h($str) { return htmlspecialchars($str, ENT_QUOTES, 'UTF-8'); }
$name = $email = $message = "";
$errors = [];
$success = false;
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $message = trim($_POST["message"] ?? "");
    if ($name === "") $errors[] = "Name is required.";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required.";
    if ($message === "") $errors[] = "Message is required.";
    if (!$errors) {
        // mail("you@example.com", "Contact Form", $message, "From: $email"); // Uncomment to send
        $success = true;
    }
}
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Form Demo</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; color: #222; }
        .container { max-width: 400px; margin: 40px auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 24px #0001; padding: 28px 24px; }
        h1 { color: #179e9e; }
        label { font-weight: 600; }
        input, textarea { width: 100%; padding: 10px; margin-bottom: 14px; border-radius: 6px; border: 1.5px solid #ddd; font-size: 1rem; }
        button { background: #20cfcf; color: #fff; border: none; border-radius: 6px; padding: 10px 22px; font-size: 1rem; font-weight: 600; cursor: pointer; }
        button:hover { background: #179e9e; }
        .msg { margin-bottom: 12px; padding: 10px; border-radius: 6px; }
        .error { background: #ffeaea; color: #b00; border: 1px solid #fbb; }
        .success { background: #e6f8f8; color: #179e9e; border: 1px solid #20cfcf; }
    </style>
</head>
<body>
<div class="container">
    <h1>Contact Us</h1>
    <?php if ($success): ?>
        <div class="msg success">Thank you, <?=h($name)?>! Your message was sent.</div>
    <?php else: ?>
        <?php foreach ($errors as $err): ?>
            <div class="msg error"><?=h($err)?></div>
        <?php endforeach; ?>
        <form method="post" action="">
            <label for="name">Name</label>
            <input name="name" id="name" value="<?=h($name)?>" required>
            <label for="email">Email</label>
            <input name="email" id="email" type="email" value="<?=h($email)?>" required>
            <label for="message">Message</label>
            <textarea name="message" id="message" rows="5" required><?=h($message)?></textarea>
            <button type="submit">Send</button>
        </form>
    <?php endif; ?>
    <p style="margin-top:1.5em;"><a href="index.php">&larr; Back to Demo Dashboard</a></p>
</div>
</body>
</html> 