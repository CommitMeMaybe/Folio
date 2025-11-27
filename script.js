// Preloader Animation
const preloader = document.querySelector('.preloader');

// Only run preloader if it exists on the page
if (preloader) {
  let loadProgress = 0;
  const progressBar = document.querySelector('.loader-progress');
  const percentage = document.querySelector('.loader-percentage');

  function updateProgress() {
    loadProgress += Math.random() * 15;
    
    if (loadProgress >= 100) {
      loadProgress = 100;
      progressBar.style.width = '100%';
      percentage.textContent = '100%';
      
      setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.style.overflow = 'auto';
      }, 500);
    } else {
      progressBar.style.width = loadProgress + '%';
      percentage.textContent = Math.floor(loadProgress) + '%';
      setTimeout(updateProgress, 100);
    }
  }

  // Start preloader
  document.body.style.overflow = 'hidden';
  setTimeout(updateProgress, 200);
}

class WaveformAnimation {
  constructor() {
    this.canvas = document.getElementById('waveform');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.gridSize = 10; // Smaller grid for finer pixels
    this.rows = 0;
    this.cols = 0;
    this.time = 0;
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cols = Math.ceil(this.canvas.width / this.gridSize);
    this.rows = Math.ceil(this.canvas.height / this.gridSize);
  }

  noise(x, y, t) {
    // Moving x with time creates the left-to-right flow
    // x * 0.05 - t * 0.1: The minus t makes it move right
    const val1 = Math.sin((x * 0.05) - (t * 0.2)); 
    const val2 = Math.cos((y * 0.05) + (t * 0.1));
    const val3 = Math.sin((x + y) * 0.02 + t);
    return (val1 + val2 + val3) / 3;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const startRow = Math.floor(this.rows * 0.4);

    for (let y = startRow; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const noiseVal = this.noise(x, y, this.time);
        
        const heightFactor = (y - startRow) / (this.rows - startRow);
        const threshold = 0.6 - (heightFactor * 0.4);
        
        if (noiseVal > threshold) {
          const alpha = Math.min(0.9, (noiseVal - threshold) * 3) * heightFactor * 0.35;
          
          if (alpha > 0.01) {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.fillRect(
              x * this.gridSize, 
              y * this.gridSize, 
              this.gridSize - 1, 
              this.gridSize - 1
            );
          }
        }
      }
    }
    
    this.time += 0.05; // Increased tempo
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WaveformAnimation();
    initScrollAnimations();
});

// Counter Animation for Stats
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-counter');
      counters.forEach(counter => {
        if (counter.textContent === '0') {
          animateCounter(counter);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// AI Art Gallery Cycling Animation
const aiArtGallery = document.querySelector('.ai-art-gallery');
if (aiArtGallery) {
  const images = aiArtGallery.querySelectorAll('.ai-art-image');
  let currentIndex = 0;

  function cycleArtwork() {
    // Remove active class from current image
    images[currentIndex].classList.remove('active');
    
    // Move to next image
    currentIndex = (currentIndex + 1) % images.length;
    
    // Add active class to next image
    images[currentIndex].classList.add('active');
  }

  // Cycle every 3 seconds
  setInterval(cycleArtwork, 3000);
}

// Spotify Player Modal Functions
function openSpotifyPlayer() {
  const modal = document.getElementById('spotifyModal');
  modal.classList.add('active');
}

function closeSpotifyPlayer() {
  const modal = document.getElementById('spotifyModal');
  modal.classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('spotifyModal');
  if (e.target === modal) {
    closeSpotifyPlayer();
  }
});

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.querySelector('.mobile-menu');
  const btn = document.querySelector('.mobile-menu-btn');
  const body = document.body;
  
  menu.classList.toggle('active');
  btn.classList.toggle('active');
  
  // Prevent scrolling when menu is open
  if (menu.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}

// Add event listener to button
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMobileMenu);
  }
});
