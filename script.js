// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference, default to light mode
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
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

// Format time helper
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update button states
function updateButtonStates() {
  if (audio.paused) {
    playBtn.style.display = 'inline-flex';
    pauseBtn.style.display = 'none';
  } else {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
  }
}

// Load metadata
audio.addEventListener('loadedmetadata', () => {
  durationSpan.textContent = formatTime(audio.duration);
});

// Play button
playBtn.addEventListener('click', () => {
  audio.play();
});

// Pause button
pauseBtn.addEventListener('click', () => {
  audio.pause();
});

// Stop button
stopBtn.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
  currentTimeSpan.textContent = '0:00';
  updateButtonStates();
});

// Update current time
audio.addEventListener('timeupdate', () => {
  currentTimeSpan.textContent = formatTime(audio.currentTime);
});

// When audio ends, reset
audio.addEventListener('ended', () => {
  audio.currentTime = 0;
  updateButtonStates();
});

// Audio play/pause events for state sync
audio.addEventListener('play', updateButtonStates);
audio.addEventListener('pause', updateButtonStates);

// Initialize button states
updateButtonStates();

// Project Audio Players
document.querySelectorAll('.project-audio').forEach(playerContainer => {
  const playBtn = playerContainer.querySelector('.project-audio-play');
  const pauseBtn = playerContainer.querySelector('.project-audio-pause');
  const stopBtn = playerContainer.querySelector('.project-audio-stop');
  const audioEl = playerContainer.querySelector('.project-audio-element');
  const currentSpan = playerContainer.querySelector('.project-audio-current');
  const durationSpan = playerContainer.querySelector('.project-audio-duration');

  // Update button states
  function updateProjectButtonStates() {
    if (audioEl.paused) {
      playBtn.style.display = 'inline-flex';
      pauseBtn.style.display = 'none';
    } else {
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-flex';
    }
  }

  // Load metadata
  audioEl.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audioEl.duration);
  });

  // Play button
  playBtn.addEventListener('click', () => {
    // Pause other project audios
    document.querySelectorAll('.project-audio-element').forEach(otherAudio => {
      if (otherAudio !== audioEl && !otherAudio.paused) {
        otherAudio.pause();
      }
    });
    audioEl.play();
  });

  // Pause button
  pauseBtn.addEventListener('click', () => {
    audioEl.pause();
  });

  // Stop button
  stopBtn.addEventListener('click', () => {
    audioEl.pause();
    audioEl.currentTime = 0;
    currentSpan.textContent = '0:00';
    updateProjectButtonStates();
  });

  // Update current time
  audioEl.addEventListener('timeupdate', () => {
    currentSpan.textContent = formatTime(audioEl.currentTime);
  });

  // When audio ends, reset
  audioEl.addEventListener('ended', () => {
    audioEl.currentTime = 0;
    updateProjectButtonStates();
  });

  // Audio play/pause events for state sync
  audioEl.addEventListener('play', updateProjectButtonStates);
  audioEl.addEventListener('pause', updateProjectButtonStates);

  // Initialize button states
  updateProjectButtonStates();
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
      let pageWeight = 0;
      let method = '';

      // Try method 1: Navigation Timing API (works on desktop)
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData && perfData.transferSize) {
        pageWeight = perfData.transferSize;
        method = 'Navigation Timing API';
      } else {
        // Method 2: Sum all resources (fallback for mobile)
        const resources = performance.getEntriesByType('resource');
        pageWeight = resources.reduce((total, resource) => {
          return total + (resource.transferSize || 0);
        }, 0);

        // Add document size if available
        if (perfData && perfData.encodedBodySize) {
          pageWeight += perfData.encodedBodySize;
        }

        method = 'Resource Timing API (summed)';
      }

      // If we still don't have data, keep fallback
      if (!pageWeight || pageWeight === 0) {
        console.log('📊 Unable to calculate page size on this browser');
        return;
      }

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
  Method: ${method}
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
