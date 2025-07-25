// Euro Hair Studio - Premium JS Features
// Smooth scroll, scroll animations, and advanced carousel

// 1. Smooth Scroll for anchor links
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 2. Scroll Animations (fade-in, slide-up)
function animateOnScroll() {
  const animatedEls = document.querySelectorAll('[data-animate]');
  const trigger = window.innerHeight * 0.92;
  animatedEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.classList.add('animate');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// 3. Parallax Hero Blob
const heroBlob = document.querySelector('.hero-blob');
if (heroBlob) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBlob.style.transform = `translateY(${y * 0.15}px)`;
  });
}

// 4. Advanced Carousel (auto, fade, swipe)
(function() {
  const images = [
    'images/storeOne.jpg',
    'images/download.jpg',
    'images/goldwell.jpg',
    'images/amira.jpg'
  ];
  let idx = 0;
  const imgEl = document.getElementById('carousel-img');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let autoAdvance;

  if (!imgEl || !prevBtn || !nextBtn) return;

  function showImage(i) {
    imgEl.classList.remove('fade-in');
    setTimeout(() => {
      imgEl.src = images[i];
      imgEl.classList.add('fade-in');
    }, 50);
  }

  function next() {
    idx = (idx + 1) % images.length;
    showImage(idx);
  }
  function prev() {
    idx = (idx - 1 + images.length) % images.length;
    showImage(idx);
  }
  nextBtn.addEventListener('click', () => { next(); resetAuto(); });
  prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

  // Touch/Swipe support
  let startX = 0;
  imgEl.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  imgEl.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 40) { prev(); resetAuto(); }
    else if (startX - endX > 40) { next(); resetAuto(); }
  });

  function resetAuto() {
    clearInterval(autoAdvance);
    autoAdvance = setInterval(next, 4000);
  }
  autoAdvance = setInterval(next, 4000);
  showImage(idx);
})();

// 5. Fade-in animation CSS (inject if not present)
(function(){
  if (!document.getElementById('fadein-style')) {
    const style = document.createElement('style');
    style.id = 'fadein-style';
    style.innerHTML = `
      [data-animate] { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(.4,0,.2,1); }
      [data-animate].animate { opacity: 1; transform: none; }
      .fade-in { animation: fadeInImg 1s; }
      @keyframes fadeInImg { from { opacity: 0.2; } to { opacity: 1; } }
      .lightbox-gallery-arrow { position: absolute; top: 50%; transform: translateY(-50%); color: #fff; font-size: 2.5rem; cursor: pointer; background: rgba(0,0,0,0.18); border-radius: 50%; padding: 0.5rem; z-index: 1001; }
      .lightbox-gallery-arrow.left { left: 2rem; }
      .lightbox-gallery-arrow.right { right: 2rem; }
    `;
    document.head.appendChild(style);
  }
})();

// 6. Interactive Lightbox Gallery for all images
window.addEventListener('DOMContentLoaded', function() {
  const galleryImgs = Array.from(document.querySelectorAll('.gallery-img[data-gallery]'));
  if (!galleryImgs.length) return;
  let current = 0;
  let lightbox = null;
  function openLightbox(idx) {
    current = idx;
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.style.background = 'rgba(0,0,0,0.92)';
      lightbox.innerHTML = `
        <span class="lightbox-close" style="right:2rem;top:2rem;">&times;</span>
        <img src="" alt="Gallery Image" style="max-width:90vw;max-height:80vh;border-radius:1.5rem;box-shadow:0 8px 32px rgba(16,185,129,0.18);">
        <span class="lightbox-gallery-arrow left">&#8592;</span>
        <span class="lightbox-gallery-arrow right">&#8594;</span>
      `;
      document.body.appendChild(lightbox);
      // Close logic
      lightbox.querySelector('.lightbox-close').onclick = () => lightbox.style.display = 'none';
      lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = 'none'; };
      // Arrow logic
      lightbox.querySelector('.lightbox-gallery-arrow.left').onclick = (e) => { e.stopPropagation(); showImg(current-1); };
      lightbox.querySelector('.lightbox-gallery-arrow.right').onclick = (e) => { e.stopPropagation(); showImg(current+1); };
      // Swipe support
      let startX = 0;
      lightbox.querySelector('img').addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
      lightbox.querySelector('img').addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        if (endX - startX > 40) showImg(current-1);
        else if (startX - endX > 40) showImg(current+1);
      });
    }
    showImg(current);
    lightbox.style.display = 'flex';
  }
  function showImg(idx) {
    if (idx < 0) idx = galleryImgs.length-1;
    if (idx >= galleryImgs.length) idx = 0;
    current = idx;
    const img = lightbox.querySelector('img');
    img.src = galleryImgs[current].src;
    img.alt = galleryImgs[current].alt;
  }
  galleryImgs.forEach((img, i) => {
    img.onclick = (e) => { e.preventDefault(); openLightbox(i); };
  });
});
