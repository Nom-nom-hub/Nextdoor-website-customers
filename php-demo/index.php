<?php
// php-demo/index.php
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Demo Dashboard</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; color: #222; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 24px #0001; padding: 32px 28px; }
        h1 { color: #179e9e; margin-top: 0; }
        h2 { color: #20cfcf; margin-bottom: 0.5em; }
        ul { padding-left: 1.2em; }
        a.demo-link { color: #179e9e; text-decoration: none; font-weight: 600; }
        a.demo-link:hover { text-decoration: underline; }
        .desc { color: #555; margin-bottom: 1.5em; }
        .card { background: #f8f9fa; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px; box-shadow: 0 2px 8px #20cfcf11; }
        code { background: #eee; border-radius: 4px; padding: 2px 6px; }
    </style>
</head>
<body>
<div class="container">
    <h1>PHP Demo Dashboard</h1>
    <p class="desc">
        Welcome! This dashboard showcases several modern PHP scripts, each demonstrating a different core skill:
        <ul>
            <li>Form handling & validation</li>
            <li>File I/O & JSON parsing</li>
            <li>Visitor/session tracking</li>
            <li>Simple routing</li>
        </ul>
        All code is clean, secure, and well-commented for review.
    </p>

    <div class="card">
        <h2>1. Contact Form Handler</h2>
        <p>Validates input and (optionally) sends an email. Shows error and success messages.</p>
        <a class="demo-link" href="contact.php">Try the Contact Form &rarr;</a>
    </div>

    <div class="card">
        <h2>2. JSON Data Display</h2>
        <p>Reads and displays data from a local <code>data.json</code> file. No database needed.</p>
        <a class="demo-link" href="json-demo.php">View JSON Data Demo &rarr;</a>
    </div>

    <div class="card">
        <h2>3. Visitor Counter</h2>
        <p>Counts and displays the number of visits to the page using a text file.</p>
        <a class="demo-link" href="counter.php">See Visitor Counter &rarr;</a>
    </div>

    <div class="card">
        <h2>4. Basic Router Example</h2>
        <p>Single-file router for simple page navigation using <code>?page=about</code> or <code>?page=contact</code>.</p>
        <a class="demo-link" href="router.php">Try the Router Demo &rarr;</a>
    </div>

    <hr style="margin:2em 0;">
    <p style="font-size:0.98em;color:#888;">All code by <strong>Your Name</strong> &mdash; built for technical review.</p>
</div>
</body>
</html> 