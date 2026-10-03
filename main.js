/* ==========================================================
   AgriHub – External JavaScript
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Current Date & Time ---------- */
  const dtEl = document.getElementById('datetime');
  function updateClock() {
    if (!dtEl) return;
    const now = new Date();
    const options = {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    dtEl.textContent = now.toLocaleString('en-GB', options);
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ---------- 2. Auto Copyright Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 3. Active Navigation Link ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });

  /* ---------- 4. Product Category Filter ---------- */
  const filterButtons = document.querySelectorAll('#categoryFilter button');
  const productItems  = document.querySelectorAll('.product-item');

  if (filterButtons.length && productItems.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        productItems.forEach(item => {
          const match = (filter === 'all' || item.dataset.category === filter);
          item.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- 5. Product Image Gallery ---------- */
  const mainImage = document.getElementById('mainImage');
  const thumbs = document.querySelectorAll('.thumb');

  if (mainImage && thumbs.length) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function () {
        mainImage.src = this.src;
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  /* ---------- 6. Contact Form with Confirmation Popup ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }

      const name = document.getElementById('cName').value.trim();
      const confirmText = document.getElementById('confirmText');
      if (confirmText) {
        confirmText.textContent =
          'Thank you, ' + name + '! Your message has been sent to AgriHub. We will reply within 24 hours.';
      }

      const modalEl = document.getElementById('confirmModal');
      const modal = new bootstrap.Modal(modalEl);
      modal.show();

      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }
});

/* ---------- 7. Newsletter Subscription (global) ---------- */
function subscribeNewsletter(event) {
  event.preventDefault();
  const input = event.target.querySelector('input[type="email"]');
  if (input && input.value) {
    alert('Thank you for subscribing to the AgriHub newsletter!');
    input.value = '';
  }
  return false;
}