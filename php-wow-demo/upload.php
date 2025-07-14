<?php
// php-wow-demo/upload.php
// Modern file upload demo with Bootstrap 5, drag-and-drop, preview, validation
$uploadDir = __DIR__ . '/uploads/';
if (!is_dir($uploadDir)) mkdir($uploadDir);
$maxSize = 2 * 1024 * 1024; // 2MB
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
$msg = '';
$uploadedFile = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    if ($file['error'] === UPLOAD_ERR_NO_FILE) {
        $msg = 'No file selected.';
    } elseif ($file['error'] !== UPLOAD_ERR_OK) {
        $msg = 'Upload error.';
    } elseif ($file['size'] > $maxSize) {
        $msg = 'File too large (max 2MB).';
    } elseif (!in_array($file['type'], $allowedTypes)) {
        $msg = 'Invalid file type.';
    } else {
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $safeName = uniqid('upload_', true) . '.' . $ext;
        move_uploaded_file($file['tmp_name'], $uploadDir . $safeName);
        $uploadedFile = 'uploads/' . $safeName;
        $msg = 'File uploaded successfully!';
    }
}
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload | PHP Wow Demo</title>
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
        .dark-mode .upload-area { background: #23272a; color: #20cfcf; border-color: #179e9e; }
        .dark-mode .text-muted, .dark-mode footer.text-muted, .dark-mode footer span, .dark-mode footer a { color: #b0e0e6 !important; }
        .btn-primary { background: #179e9e; border: none; font-weight: 600; letter-spacing: 0.5px; transition: background 0.15s, box-shadow 0.15s; }
        .btn-primary:hover, .btn-primary:focus { background: #20cfcf; box-shadow: 0 2px 8px #179e9e33; }
        .preview-img { max-width: 100%; max-height: 180px; margin: 18px auto 0; display: block; border-radius: 8px; object-fit: contain; background: #f8f9fa; box-shadow: 0 2px 8px #0001; }
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
        <div class="col-md-7 col-lg-6">
            <div class="card p-4">
                <h2 class="mb-3" style="color:#179e9e;">File Upload</h2>
                <?php if ($msg): ?>
                    <div class="alert alert-info"><?=$msg?></div>
                <?php endif; ?>
                <form id="uploadForm" method="post" enctype="multipart/form-data">
                    <div id="uploadArea" class="upload-area mb-3">
                        <span id="uploadText">Drag & drop a file here or click to select</span>
                        <input type="file" name="file" id="fileInput" style="display:none;">
                    </div>
                    <div id="preview"></div>
                    <button type="submit" class="btn btn-primary">Upload</button>
                </form>
                <div id="uploadMsg" class="mt-3"></div>
                <?php if ($uploadedFile): ?>
                    <div class="mt-3">
                        <strong>Uploaded File:</strong><br>
                        <?php if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $uploadedFile)): ?>
                            <img src="<?=$uploadedFile?>" class="preview-img" alt="Uploaded Image">
                        <?php else: ?>
                            <a href="<?=$uploadedFile?>" target="_blank">Download File</a>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
                <a href="index.php" class="d-block mt-4">&larr; Back to Dashboard</a>
                <div class="text-center mt-1" style="font-size:0.98em;color:#888;">
                    This demo is presented for review by <a href="https://lbds.net" target="_blank" style="color:#888;text-decoration:underline;">lbds.net</a>.
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script>
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const uploadForm = document.getElementById('uploadForm');
const uploadMsg = document.getElementById('uploadMsg');
// Drag & drop
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('dragover'); });
uploadArea.addEventListener('dragleave', e => { e.preventDefault(); uploadArea.classList.remove('dragover'); });
uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    fileInput.files = e.dataTransfer.files;
    showPreview();
});
fileInput.addEventListener('change', showPreview);
function showPreview() {
    preview.innerHTML = '';
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > <?=$maxSize?>) {
        preview.innerHTML = '<div class="alert alert-danger">File too large (max 2MB).</div>';
        fileInput.value = '';
        return;
    }
    if (!['image/jpeg','image/png','image/gif','application/pdf'].includes(file.type)) {
        preview.innerHTML = '<div class="alert alert-danger">Invalid file type.</div>';
        fileInput.value = '';
        return;
    }
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
            preview.innerHTML = `<img src="${e.target.result}" class="preview-img" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '<div class="alert alert-info">PDF selected: ' + file.name + '</div>';
    }
}
// Prevent form submit if no file selected
uploadForm.addEventListener('submit', function(e) {
    uploadMsg.innerHTML = '';
    if (!fileInput.files.length) {
        e.preventDefault();
        uploadMsg.innerHTML = '<div class="alert alert-danger">Please select a file to upload.</div>';
        return false;
    }
});
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