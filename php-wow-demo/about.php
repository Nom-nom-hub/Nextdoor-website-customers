<?php
// php-wow-demo/about.php
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About | PHP Wow Demo Suite</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        body { background: #f8f9fa; font-family: 'Inter', Arial, sans-serif; }
        .navbar {
            background: rgba(255,255,255,0.85)!important;
            box-shadow: 0 2px 16px #0001;
            backdrop-filter: blur(8px);
            position: sticky; top: 0; z-index: 100;
        }
        .navbar-brand { color: #20cfcf !important; font-weight: 800; letter-spacing: 1px; font-size: 1.5em; }
        .dark-mode .navbar, .dark-mode .navbar-brand { background: rgba(16,18,20,0.92) !important; color: #20cfcf !important; }
        .dark-toggle { cursor: pointer; font-size: 1.3em; margin-left: 1em; color: #179e9e; }
        .card { box-shadow: 0 4px 24px #0001; border: none; border-radius: 1.2rem; transition: transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s; background: #fff; position: relative; overflow: hidden; }
        .card:hover, .card:focus-within { transform: translateY(-6px) scale(1.025); box-shadow: 0 8px 32px #179e9e22; z-index: 2; }
        .card-title { color: #179e9e; font-weight: 700; font-size: 1.25em; }
        .dark-mode body, .dark-mode .container { background: #181b1f !important; color: #e0e0e0; }
        .dark-mode .card { background: #23272a; color: #e0e0e0; }
        .dark-mode .btn-primary { background: #179e9e; border: none; }
        .dark-mode .btn-primary:hover { background: #20cfcf; }
        .dark-mode .text-muted, .dark-mode footer.text-muted, .dark-mode footer span, .dark-mode footer a { color: #b0e0e6 !important; }
        .btn-primary { background: #179e9e; border: none; font-weight: 600; letter-spacing: 0.5px; transition: background 0.15s, box-shadow 0.15s; }
        .btn-primary:hover, .btn-primary:focus { background: #20cfcf; box-shadow: 0 2px 8px #179e9e33; }
        @media (max-width: 767px) { .card-title { font-size: 1.1em; } }
    </style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light mb-4">
    <div class="container">
        <a class="navbar-brand" href="index.php">PHP Demo Suite</a>
        <span class="dark-toggle" id="darkToggle" title="Toggle dark mode">&#9788;</span>
    </div>
</nav>
<div class="container">
    <div class="text-center mb-1" style="font-size:0.98em;color:#888;">
        This demo is presented for review by <a href="https://lbds.net" target="_blank" style="color:#888;text-decoration:underline;">lbds.net</a>.
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card p-4 mb-4">
                <h2 class="mb-3" style="color:#179e9e;">About / README</h2>
                <p><strong>Project Purpose:</strong> This suite demonstrates modern, real-world PHP skills for technical review and job applications. It is designed to impress with both code quality and user experience.</p>
                <h5>Features</h5>
                <ul>
                    <li>AJAX Contact Form (CSRF, validation, no reload)</li>
                    <li>Guestbook CRUD (SQLite, modals, XSS-safe)</li>
                    <li>File Upload (drag-and-drop, preview, validation)</li>
                    <li>Login/Logout (session, flash messages, secure password)</li>
                    <li>REST API endpoint (JSON)</li>
                    <li>Responsive, dark mode, Bootstrap 5</li>
                </ul>
                <h5>Tech Stack</h5>
                <ul>
                    <li>PHP 8+</li>
                    <li>SQLite (no setup required)</li>
                    <li>Bootstrap 5 (CDN)</li>
                    <li>Vanilla JS (for AJAX, modals, validation)</li>
                </ul>
                <h5>Security Practices</h5>
                <ul>
                    <li>Prepared statements for all DB access</li>
                    <li>CSRF protection on forms</li>
                    <li>Input validation and XSS-safe output</li>
                    <li>Secure password hashing/verification</li>
                </ul>
                <h5>Usage Instructions</h5>
                <ul>
                    <li>Run on any PHP 8+ server (local or remote)</li>
                    <li>No database setup needed (SQLite auto-creates)</li>
                    <li>Test each feature from the dashboard</li>
                </ul>
                <p class="mt-4"><a href="index.php">&larr; Back to Dashboard</a></p>
                <div class="text-center mt-1" style="font-size:0.98em;color:#888;">
                    This demo is presented for review by <a href="https://lbds.net" target="_blank" style="color:#888;text-decoration:underline;">lbds.net</a>.
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script>
// Dark mode toggle and auto-detect
const darkToggle = document.getElementById('darkToggle');
function setDarkMode(on) {
    document.documentElement.classList.toggle('dark-mode', on);
    darkToggle.innerHTML = on ? '&#9790;' : '&#9788;';
    localStorage.setItem('dark-mode', on ? '1' : '0');
}
// On load: system or saved
(function(){
    const saved = localStorage.getItem('dark-mode');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(saved === '1' || (saved === null && sys));
})();
darkToggle.onclick = function() {
    setDarkMode(!document.documentElement.classList.contains('dark-mode'));
};
</script>
</body>
</html> 