<?php
// php-wow-demo/guestbook.php
// Modern Guestbook (CRUD) with SQLite, Bootstrap 5, modals, and security
session_start();
$dbFile = __DIR__ . '/db.sqlite';
$db = new PDO('sqlite:' . $dbFile);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// Create table if not exists
$db->exec("CREATE TABLE IF NOT EXISTS guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)");

// Handle Add/Edit/Delete
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $name = trim($_POST['name'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $id = (int)($_POST['id'] ?? 0);
    if ($action === 'add' && $name && $message) {
        $stmt = $db->prepare('INSERT INTO guestbook (name, message) VALUES (?, ?)');
        $stmt->execute([$name, $message]);
        $_SESSION['flash'] = 'Entry added!';
    } elseif ($action === 'edit' && $id && $name && $message) {
        $stmt = $db->prepare('UPDATE guestbook SET name=?, message=? WHERE id=?');
        $stmt->execute([$name, $message, $id]);
        $_SESSION['flash'] = 'Entry updated!';
    } elseif ($action === 'delete' && $id) {
        $stmt = $db->prepare('DELETE FROM guestbook WHERE id=?');
        $stmt->execute([$id]);
        $_SESSION['flash'] = 'Entry deleted!';
    }
    header('Location: guestbook.php');
    exit;
}
// Insert default entries if table is empty
if ($db->query('SELECT COUNT(*) FROM guestbook')->fetchColumn() == 0) {
    $stmt = $db->prepare('INSERT INTO guestbook (name, message) VALUES (?, ?)');
    $stmt->execute(['Alice', 'Welcome to the guestbook! This is a sample entry.']);
    $stmt->execute(['Bob', 'Feel free to add your own message.']);
}
// Fetch all entries
$entries = $db->query('SELECT * FROM guestbook ORDER BY created_at DESC')->fetchAll(PDO::FETCH_ASSOC);
function h($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guestbook (CRUD) | PHP Wow Demo</title>
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
        .dark-mode .modal-content { background: #23272a; color: #e0e0e0; border: none; }
        .dark-mode .modal-header, .dark-mode .modal-footer { background: #181b1f; border: none; color: #e0e0e0; }
        .dark-mode .form-control { background: #181b1f; color: #e0e0e0; border-color: #23272a; }
        .dark-mode .form-control:focus { background: #23272a; color: #fff; border-color: #20cfcf; box-shadow: 0 0 0 0.2rem #20cfcf33; }
        .dark-mode .form-label { color: #b0e0e6; }
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
    <div class="text-center mb-4" style="font-size:1.1em;color:#179e9e;font-weight:600;">
        Built by <span style="color:#20cfcf;">Teck</span> &mdash; <a href="https://designsbyteck.com" target="_blank" style="color:#179e9e;text-decoration:underline;">designsbyteck.com</a>
    </div>
    <div class="text-center mb-1" style="font-size:0.98em;color:#888;">
        This demo is presented for review by <a href="https://lbds.net" target="_blank" style="color:#888;text-decoration:underline;">lbds.net</a>.
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card p-4 mb-4">
                <h2 class="mb-3" style="color:#179e9e;">Guestbook</h2>
                <?php if (!empty($_SESSION['flash'])): ?>
                    <div class="alert alert-success"> <?=h($_SESSION['flash'])?> </div>
                    <?php unset($_SESSION['flash']); endif; ?>
                <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addModal">Add Entry</button>
                <div class="table-responsive">
                    <table class="table table-striped align-middle">
                        <thead>
                            <tr><th>Name</th><th>Message</th><th>Date</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                        <?php foreach ($entries as $row): ?>
                            <tr>
                                <td><?=h($row['name'])?></td>
                                <td><?=nl2br(htmlspecialchars($row['message'], ENT_QUOTES, 'UTF-8'))?></td>
                                <td><?=h(date('Y-m-d H:i', strtotime($row['created_at'])))?></td>
                                <td>
                                    <button class="btn btn-sm btn-secondary editBtn" 
                                        data-id="<?=$row['id']?>" data-name="<?=h($row['name'])?>" data-message="<?=h($row['message'])?>">Edit</button>
                                    <form method="post" action="" style="display:inline;">
                                        <input type="hidden" name="id" value="<?=$row['id']?>">
                                        <input type="hidden" name="action" value="delete">
                                        <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Delete this entry?')">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                <a href="index.php" class="d-block mt-4">&larr; Back to Dashboard</a>
            </div>
            <div class="text-center mt-4" style="font-size:1.1em;color:#179e9e;font-weight:600;">
                Built by <span style="color:#20cfcf;">Teck</span> &mdash; <a href="https://designsbyteck.com" target="_blank" style="color:#179e9e;text-decoration:underline;">designsbyteck.com</a>
            </div>
            <div class="text-center mt-1" style="font-size:0.98em;color:#888;">
                This demo is presented for review by <a href="https://lbds.net" target="_blank" style="color:#888;text-decoration:underline;">lbds.net</a>.
            </div>
        </div>
    </div>
</div>
<!-- Add Modal -->
<div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form method="post" action="">
        <input type="hidden" name="action" value="add">
        <div class="modal-header"><h5 class="modal-title">Add Entry</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="mb-3"><label class="form-label">Name</label><input name="name" class="form-control" required></div>
          <div class="mb-3"><label class="form-label">Message</label><textarea name="message" class="form-control" rows="4" required></textarea></div>
        </div>
        <div class="modal-footer"><button type="submit" class="btn btn-primary">Add</button></div>
      </form>
    </div>
  </div>
</div>
<!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form method="post" action="">
        <input type="hidden" name="action" value="edit">
        <input type="hidden" name="id" id="editId">
        <div class="modal-header"><h5 class="modal-title">Edit Entry</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="mb-3"><label class="form-label">Name</label><input name="name" id="editName" class="form-control" required></div>
          <div class="mb-3"><label class="form-label">Message</label><textarea name="message" id="editMessage" class="form-control" rows="4" required></textarea></div>
        </div>
        <div class="modal-footer"><button type="submit" class="btn btn-primary">Save</button></div>
      </form>
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
// Edit modal fill
const editBtns = document.querySelectorAll('.editBtn');
const editId = document.getElementById('editId');
const editName = document.getElementById('editName');
const editMessage = document.getElementById('editMessage');
editBtns.forEach(btn => {
    btn.onclick = function() {
        editId.value = btn.getAttribute('data-id');
        editName.value = btn.getAttribute('data-name');
        editMessage.value = btn.getAttribute('data-message');
        new bootstrap.Modal(document.getElementById('editModal')).show();
    };
});
</script>
</body>
</html> 