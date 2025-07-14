<?php
// php-wow-demo/login.php
// Demo login/logout with session, flash messages, Bootstrap 5
session_start();
$demoUser = [
    'username' => 'demo',
    'password' => password_hash('password123', PASSWORD_DEFAULT)
];
$msg = '';
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: login.php');
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';
    if ($user === $demoUser['username'] && password_verify($pass, $demoUser['password'])) {
        $_SESSION['user'] = $user;
        $_SESSION['flash'] = 'Login successful!';
        header('Location: login.php');
        exit;
    } else {
        $msg = 'Invalid username or password.';
    }
}
$loggedIn = isset($_SESSION['user']);
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Demo | PHP Wow Demo</title>
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
        <div class="col-md-6 col-lg-5">
            <div class="card p-4">
                <h2 class="mb-3" style="color:#179e9e;">Login Demo</h2>
                <?php if (!empty($_SESSION['flash'])): ?>
                    <div class="alert alert-success"><?=htmlspecialchars($_SESSION['flash'])?></div>
                    <?php unset($_SESSION['flash']); endif; ?>
                <?php if ($msg): ?>
                    <div class="alert alert-danger"><?=htmlspecialchars($msg)?></div>
                <?php endif; ?>
                <?php if ($loggedIn): ?>
                    <div class="alert alert-info mb-3">Logged in as <strong><?=htmlspecialchars($_SESSION['user'])?></strong></div>
                    <a href="?logout=1" class="btn btn-danger">Logout</a>
                <?php else: ?>
                    <form method="post" autocomplete="off">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" name="username" required autofocus>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                    <div class="mt-3 text-muted" style="font-size:0.98em;">
                        <strong>Demo user:</strong> demo<br>
                        <strong>Password:</strong> password123
                    </div>
                <?php endif; ?>
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
</script>
</body>
</html> 