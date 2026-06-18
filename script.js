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

// Project Audio Players
document.querySelectorAll('.project-audio').forEach(playerContainer => {
  const btn = playerContainer.querySelector('.project-audio-btn');
  const audioEl = playerContainer.querySelector('.project-audio-element');
  const currentSpan = playerContainer.querySelector('.project-audio-current');
  const durationSpan = playerContainer.querySelector('.project-audio-duration');

  // Load metadata
  audioEl.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audioEl.duration);
  });

  // Play/pause toggle
  btn.addEventListener('click', () => {
    if (audioEl.paused) {
      // Pause other project audios
      document.querySelectorAll('.project-audio-element').forEach(otherAudio => {
        if (otherAudio !== audioEl && !otherAudio.paused) {
          otherAudio.pause();
        }
      });
      audioEl.play();
    } else {
      audioEl.pause();
    }
  });

  // Update button and time
  audioEl.addEventListener('play', () => {
    btn.textContent = '⏸';
    btn.classList.add('playing');
  });

  audioEl.addEventListener('pause', () => {
    btn.textContent = '▶';
    btn.classList.remove('playing');
  });

  audioEl.addEventListener('timeupdate', () => {
    currentSpan.textContent = formatTime(audioEl.currentTime);
  });

  // Reset on end
  audioEl.addEventListener('ended', () => {
    audioEl.currentTime = 0;
    btn.textContent = '▶';
    btn.classList.remove('playing');
  });
});

// CO2.js — Real-time carbon calculation
// Green Web Foundation Sustainable Web Design model
(async () => {
  try {
    // Import CO2.js from unpkg (ESM CDN with proper CORS)
    const { co2 } = await import('https://unpkg.com/@tgwf/co2@0.18.0/dist/esm/index.js');

    const co2Calculator = new co2();

    // Function to calculate and update footer
    const updateCarbonFootprint = () => {
      // Get page transfer size from Navigation Timing API
      const perfData = performance.getEntriesByType('navigation')[0];

      if (!perfData || !perfData.transferSize) {
        console.warn('Navigation Timing API not available yet');
        return;
      }

      const pageWeight = perfData.transferSize;

      // Calculate CO2 (green hosting = false, per Green Web Check)
      const co2Grams = co2Calculator.perByte(pageWeight, false);

      // Format: convert to grams with 2 decimals
      const co2Formatted = co2Grams.toFixed(2);

      // Update sustainability data in footer
      const sustainabilityData = document.querySelector('.sustainability-data');
      if (sustainabilityData) {
        // Calculate page weight in KB
        const pageKB = (pageWeight / 1024).toFixed(1);

        sustainabilityData.innerHTML = `
          <strong>${co2Formatted}g CO₂</strong> esta página (${pageKB}KB) ·
          WebP · Service worker · Internet Archive hosting
        `.trim();

        // Log to console for debugging
        console.log(`📊 Page sustainability metrics:
  Transfer size: ${(pageWeight / 1024).toFixed(2)} KB
  CO₂ emissions: ${co2Formatted}g
  Model: Sustainable Web Design (Green Web Foundation)
  Green hosting: No (GitHub Pages unverified)`);
      }
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      // Page already loaded, calculate now
      updateCarbonFootprint();
    } else {
      // Wait for page to load
      window.addEventListener('load', updateCarbonFootprint);
    }

  } catch (error) {
    console.error('CO2.js failed to load:', error);
    // Graceful degradation: keep original text if CO2.js fails
  }
})();
