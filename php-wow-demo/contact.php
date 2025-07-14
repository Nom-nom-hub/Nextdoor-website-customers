<?php
// php-wow-demo/contact.php
session_start();
// Generate CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
$csrf_token = $_SESSION['csrf_token'];

// Handle AJAX POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ajax'])) {
    header('Content-Type: application/json');
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $token = $_POST['csrf_token'] ?? '';
    $errors = [];
    if ($token !== $_SESSION['csrf_token']) $errors[] = 'Invalid CSRF token.';
    if ($name === '') $errors[] = 'Name is required.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required.';
    if ($message === '') $errors[] = 'Message is required.';
    if ($errors) {
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }
    // mail('you@example.com', 'Contact Form', $message, "From: $email"); // Uncomment to send
    echo json_encode(['success' => true, 'msg' => "Thank you, $name! Your message was sent."]);
    exit;
}
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form (AJAX) | PHP Wow Demo</title>
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
    <div class="text-center mb-4" style="font-size:1.1em;color:#179e9e;font-weight:600;">
        Built by <span style="color:#20cfcf;">Teck</span> &mdash; <a href="https://designsbyteck.com" target="_blank" style="color:#179e9e;text-decoration:underline;">designsbyteck.com</a>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6">
            <div class="card p-4">
                <h2 class="mb-3" style="color:#179e9e;">Contact Us</h2>
                <form id="contactForm" autocomplete="off">
                    <input type="hidden" name="csrf_token" value="<?=$csrf_token?>">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                        <div class="invalid-feedback">Name is required.</div>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                        <div class="invalid-feedback">Valid email is required.</div>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
                        <div class="invalid-feedback">Message is required.</div>
                    </div>
                    <button type="submit" class="btn btn-primary">Send</button>
                </form>
                <div id="formMsg" class="mt-3"></div>
                <a href="index.php" class="d-block mt-4">&larr; Back to Dashboard</a>
                <div class="text-center mt-1" style="font-size:0.98em;color:#888;">
                    This demo is presented for review by <a href="https://lbds.net" target="_blank" style="color:#888;text-decoration:underline;">lbds.net</a>.
                </div>
                <div class="text-center mt-4" style="font-size:1.1em;color:#179e9e;font-weight:600;">
                    Built by <span style="color:#20cfcf;">Teck</span> &mdash; <a href="https://designsbyteck.com" target="_blank" style="color:#179e9e;text-decoration:underline;">designsbyteck.com</a>
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
// Live validation
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    formMsg.innerHTML = '';
    let valid = true;
    ['name','email','message'].forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim() || (id==='email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value))) {
            el.classList.add('is-invalid');
            valid = false;
        } else {
            el.classList.remove('is-invalid');
        }
    });
    if (!valid) return;
    // AJAX submit
    const data = new FormData(form);
    data.append('ajax', '1');
    fetch('contact.php', { method: 'POST', body: data })
        .then(r => r.json())
        .then(res => {
            if (res.success) {
                formMsg.innerHTML = `<div class='alert alert-success'>${res.msg}</div>`;
                form.reset();
            } else {
                formMsg.innerHTML = res.errors.map(e => `<div class='alert alert-danger'>${e}</div>`).join('');
            }
        })
        .catch(() => {
            formMsg.innerHTML = `<div class='alert alert-danger'>Server error. Please try again later.`;
        });
});
</script>
</body>
</html> 