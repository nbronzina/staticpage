// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  body.classList.add('dark-mode');
  themeToggle.setAttribute('aria-pressed', 'true');
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  themeToggle.setAttribute('aria-pressed', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Back to Top
const backToTopButton = document.getElementById('backToTop');

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
      ticking = false;
    });
    ticking = true;
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Scroll Reveal for Sections
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

setTimeout(() => {
  document.querySelectorAll('.dirA-section, .dirA-intro').forEach(el => {
    revealObserver.observe(el);
  });
}, 100);

// Audio Player
const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('audio-play');
const pauseBtn = document.getElementById('audio-pause');
const stopBtn = document.getElementById('audio-stop');
const currentTimeSpan = document.getElementById('audio-current');
const durationSpan = document.getElementById('audio-duration');
const progressFill = document.getElementById('audio-progress-fill');
const progressBar = document.getElementById('audio-progress-bar');

// Format time helper
function formatTime(seconds) {
  if (isNaN(seconds)) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update button states
function updateButtonStates() {
  if (audio.paused) {
    playBtn.style.display = 'inline-flex';
    pauseBtn.style.display = 'none';
    playBtn.classList.remove('active');
    pauseBtn.classList.remove('active');
  } else {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
    pauseBtn.classList.add('active');
  }
}

// Load metadata
audio.addEventListener('loadedmetadata', () => {
  durationSpan.textContent = formatTime(audio.duration);
});

// Play button
playBtn.addEventListener('click', () => {
  audio.play();
  updateButtonStates();
});

// Pause button
pauseBtn.addEventListener('click', () => {
  audio.pause();
  updateButtonStates();
});

// Stop button
stopBtn.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
  progressFill.style.width = '0%';
  updateButtonStates();
});

// Update progress
audio.addEventListener('timeupdate', () => {
  currentTimeSpan.textContent = formatTime(audio.currentTime);
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${percent}%`;
});

// When audio ends, reset
audio.addEventListener('ended', () => {
  audio.currentTime = 0;
  progressFill.style.width = '0%';
  updateButtonStates();
});

// Audio play/pause events for state sync
audio.addEventListener('play', updateButtonStates);
audio.addEventListener('pause', updateButtonStates);

// Click on progress bar to seek
progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
});

// Initialize button states
updateButtonStates();
