<?php
// php-wow-demo/index.php
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Demo Suite</title>
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
        .hero {
            background: linear-gradient(120deg, #e6f8f8 0%, #f8f9fa 100%);
            border-radius: 1.5rem;
            box-shadow: 0 8px 32px #0001;
            padding: 2.5rem 2rem 2rem 2rem;
            margin-bottom: 2.5rem;
            text-align: center;
            position: relative;
            overflow: hidden;
            animation: fadeInDown 1s cubic-bezier(.4,2,.6,1) 0.1s both;
        }
        .hero h1 { font-size: 2.5em; font-weight: 800; color: #179e9e; margin-bottom: 0.5em; }
        .hero p { font-size: 1.25em; color: #444; margin-bottom: 1.2em; }
        .hero .badge-lbds {
            background: #20cfcf; color: #fff; font-weight: 600; font-size: 1em;
            border-radius: 1em; padding: 0.4em 1.2em; box-shadow: 0 2px 8px #179e9e33;
            display: inline-block; margin-bottom: 0.5em;
        }
        .dark-mode body, .dark-mode .container { background: #181b1f !important; color: #e0e0e0; }
        .dark-mode .hero { background: linear-gradient(120deg, #181b1f 0%, #23272a 100%) !important; color: #e0e0e0; }
        .dark-mode .hero h1 { color: #20cfcf; }
        .dark-mode .hero p { color: #b0e0e6; }
        .dark-mode .hero .badge-lbds { background: #179e9e; color: #fff; }
        .card {
            box-shadow: 0 4px 24px #0001; border: none; border-radius: 1.2rem;
            transition: transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s;
            background: #fff; position: relative; overflow: hidden;
            animation: fadeInUp 0.8s cubic-bezier(.4,2,.6,1) both;
        }
        .card:hover, .card:focus-within {
            transform: translateY(-6px) scale(1.025);
            box-shadow: 0 8px 32px #179e9e22;
            z-index: 2;
        }
        .card-title { color: #179e9e; font-weight: 700; font-size: 1.25em; display: flex; align-items: center; gap: 0.5em; }
        .card-icon {
            font-size: 1.5em; color: #20cfcf; background: #e6f8f8; border-radius: 50%; padding: 0.4em 0.6em; margin-right: 0.2em;
            box-shadow: 0 2px 8px #20cfcf22;
            display: inline-flex; align-items: center; justify-content: center;
        }
        .dark-mode .card { background: #23272a; color: #e0e0e0; }
        .dark-mode .card-title { color: #20cfcf; }
        .dark-mode .card-icon { background: #101214; color: #20cfcf; }
        .dark-mode .btn-primary { background: #179e9e; border: none; }
        .dark-mode .btn-primary:hover { background: #20cfcf; }
        .dark-mode .text-muted, .dark-mode footer.text-muted, .dark-mode footer span, .dark-mode footer a { color: #b0e0e6 !important; }
        .btn-primary {
            background: #179e9e; border: none; font-weight: 600; letter-spacing: 0.5px;
            transition: background 0.15s, box-shadow 0.15s;
        }
        .btn-primary:hover, .btn-primary:focus { background: #20cfcf; box-shadow: 0 2px 8px #179e9e33; }
        .row.g-4 { row-gap: 2.2rem; }
        @media (max-width: 767px) {
            .hero { padding: 1.5rem 0.5rem 1.2rem 0.5rem; }
            .card-title { font-size: 1.1em; }
        }
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-32px); }
            to { opacity: 1; transform: none; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(32px); }
            to { opacity: 1; transform: none; }
        }
    </style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light mb-4">
    <div class="container">
        <span class="navbar-brand">PHP Demo Suite</span>
        <span class="dark-toggle" id="darkToggle" title="Toggle dark mode">&#9788;</span>
    </div>
</nav>
<div class="container">
    <section class="hero">
        <div class="badge-lbds">For review by lbds.net</div>
        <h1>Modern PHP Demo Suite</h1>
        <p>Showcasing advanced PHP, security, and UI/UX skills for high-end roles.<br>Built by <a href="https://designsbyteck.com" target="_blank" style="color:#179e9e;font-weight:600;">Teck</a></p>
    </section>
    <div class="row g-4">
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title"><span class="card-icon">&#9993;</span>Contact Form (AJAX)</h5>
                    <p class="card-text">Live validation, CSRF protection, no reload. Modern UI.</p>
                    <a href="contact.php" class="btn btn-primary">Try Demo</a>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title"><span class="card-icon">&#128221;</span>Guestbook (CRUD)</h5>
                    <p class="card-text">Add, edit, delete, and list entries. SQLite, modals, secure code.</p>
                    <a href="guestbook.php" class="btn btn-primary">Try Demo</a>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title"><span class="card-icon">&#128206;</span>File Upload</h5>
                    <p class="card-text">Drag-and-drop, preview, validation, secure server-side handling.</p>
                    <a href="upload.php" class="btn btn-primary">Try Demo</a>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title"><span class="card-icon">&#128274;</span>Login / Logout</h5>
                    <p class="card-text">Session-based demo user, flash messages, secure login/logout.</p>
                    <a href="login.php" class="btn btn-primary">Try Demo</a>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title"><span class="card-icon">&#128187;</span>API Endpoint</h5>
                    <p class="card-text">RESTful endpoint returns JSON of guestbook entries.</p>
                    <a href="api/guests.php" class="btn btn-primary" target="_blank">View API</a>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title"><span class="card-icon">&#8505;</span>About / README</h5>
                    <p class="card-text">Project info, tech stack, security, and best practices.</p>
                    <a href="about.php" class="btn btn-primary">Learn More</a>
                </div>
            </div>
        </div>
    </div>
    <footer class="mt-5 text-center text-muted" style="font-size:0.98em;">
        &copy; <?=date('Y')?> Teck &mdash; <a href="https://designsbyteck.com" target="_blank" style="color:#179e9e;">designsbyteck.com</a><br>
        <span style="color:#888;">This demo is presented for review by <a href="https://lbds.net" target="_blank" style="color:#888;text-decoration:underline;">lbds.net</a>.</span>
    </footer>
</div>
<script>
// Dark mode toggle and auto-detect
const darkToggle = document.getElementById('darkToggle');
function setDarkMode(on) {
    document.documentElement.classList.toggle('dark-mode', on);
    darkToggle.innerHTML = on ? '\u263E' : '\u263C';
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