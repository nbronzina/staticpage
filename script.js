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
  themeToggle.blur(); // Remove focus on mobile
});

// Language Toggle
const langToggle = document.getElementById('lang-toggle');

// Check for saved language preference, default to English
const savedLang = localStorage.getItem('language');

if (savedLang === 'es') {
  body.classList.add('lang-es');
  langToggle.setAttribute('aria-pressed', 'true');
  document.documentElement.lang = 'es';
}

langToggle.addEventListener('click', () => {
  const isSpanish = body.classList.toggle('lang-es');
  langToggle.setAttribute('aria-pressed', isSpanish);
  localStorage.setItem('language', isSpanish ? 'es' : 'en');
  document.documentElement.lang = isSpanish ? 'es' : 'en';
  langToggle.blur(); // Remove focus on mobile
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

// Audio players (fixed header player + project narrations).
// Starting one pauses any other that is playing.
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const players = document.querySelectorAll('[data-player]');

players.forEach(player => {
  const audio = player.querySelector('audio');
  const playBtn = player.querySelector('[data-play]');
  const pauseBtn = player.querySelector('[data-pause]');
  const stopBtn = player.querySelector('[data-stop]');
  const current = player.querySelector('[data-current]');
  const duration = player.querySelector('[data-duration]');

  const syncButtons = () => {
    playBtn.hidden = !audio.paused;
    pauseBtn.hidden = audio.paused;
  };

  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    current.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('play', () => {
    players.forEach(other => {
      const otherAudio = other.querySelector('audio');
      if (otherAudio !== audio) otherAudio.pause();
    });
    syncButtons();
  });

  audio.addEventListener('pause', syncButtons);

  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
  });

  playBtn.addEventListener('click', () => {
    audio.play();
    playBtn.blur(); // Remove focus on mobile
  });

  pauseBtn.addEventListener('click', () => {
    audio.pause();
    pauseBtn.blur(); // Remove focus on mobile
  });

  stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    stopBtn.blur(); // Remove focus on mobile
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
      const perfData = performance.getEntriesByType('navigation')[0];
      if (!perfData) {
        return;
      }

      // transferSize includes headers; the body sizes are fallbacks
      // (transferSize is 0 when served from cache)
      const pageWeight = perfData.transferSize || perfData.encodedBodySize || perfData.decodedBodySize;
      if (!pageWeight) {
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

        sustainabilityData.textContent = `Estimated ${co2Formatted}g CO₂ per page view · ${pageKB}KB · WebP · Service worker · Internet Archive archived`;
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
