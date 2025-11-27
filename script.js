// Preloader Animation
const preloader = document.querySelector('.preloader');

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

  document.body.style.overflow = 'hidden';
  setTimeout(updateProgress, 200);
}

class WaveformAnimation {
  constructor() {
    this.canvas = document.getElementById('waveform');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 10;
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
            this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
          }
        }
      }
    }
    this.time += 0.05;
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
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

function initScrollAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  
  // Stats Observer
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-counter');
        counters.forEach(counter => {
          if (counter.textContent === '0') animateCounter(counter);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) statsObserver.observe(statsSection);
}

// AI Art Gallery
const aiArtGallery = document.querySelector('.ai-art-gallery');
if (aiArtGallery) {
  const images = aiArtGallery.querySelectorAll('.ai-art-image');
  let currentIndex = 0;
  setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }, 3000);
}

// Mobile Menu
function toggleMobileMenu() {
  const menu = document.querySelector('.mobile-menu');
  const btn = document.querySelector('.mobile-menu-btn');
  const body = document.body;
  
  menu.classList.toggle('active');
  btn.classList.toggle('active');
  
  if (menu.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}

// Draggable 3D Carousel
class Draggable3DCarousel {
  constructor(element) {
    this.element = element;
    this.carousel = element.querySelector('.carousel-3d');
    this.rotation = 0;
    this.isDragging = false;
    this.startX = 0;
    this.lastX = 0;
    this.velocity = 0;
    this.autoRotateSpeed = 0.2;
    this.isAutoRotating = true;
    
    this.init();
  }

  init() {
    this.element.addEventListener('mousedown', (e) => this.startDrag(e.clientX));
    window.addEventListener('mousemove', (e) => this.drag(e.clientX));
    window.addEventListener('mouseup', () => this.endDrag());
    
    this.element.addEventListener('touchstart', (e) => this.startDrag(e.touches[0].clientX));
    window.addEventListener('touchmove', (e) => this.drag(e.touches[0].clientX));
    window.addEventListener('touchend', () => this.endDrag());
    
    this.animate();
  }

  startDrag(clientX) {
    this.isDragging = true;
    this.isAutoRotating = false;
    this.startX = clientX;
    this.lastX = clientX;
    this.velocity = 0;
    this.element.style.cursor = 'grabbing';
  }

  drag(clientX) {
    if (!this.isDragging) return;
    const delta = clientX - this.lastX;
    this.rotation += delta * 0.5;
    this.velocity = delta;
    this.lastX = clientX;
  }

  endDrag() {
    this.isDragging = false;
    this.element.style.cursor = 'grab';
    // Resume auto-rotation after interaction? Let's keep it manual for a bit then resume
    setTimeout(() => { if(!this.isDragging) this.isAutoRotating = true; }, 3000);
  }

  animate() {
    if (!this.isDragging) {
      this.rotation += this.velocity;
      this.velocity *= 0.95;
      
      if (Math.abs(this.velocity) < 0.01 && this.isAutoRotating) {
        this.rotation -= this.autoRotateSpeed;
      }
    }
    this.carousel.style.transform = `perspective(1000px) rotateY(${this.rotation}deg)`;
    requestAnimationFrame(() => this.animate());
  }
}

// AutoScroll for Marquees
class AutoScroll {
  constructor(element, speed = 0.5) {
    this.element = element;
    this.speed = speed;
    this.isHovered = false;
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;
    
    this.init();
  }

  init() {
    this.cloneContent();
    
    this.element.addEventListener('mouseenter', () => this.isHovered = true);
    this.element.addEventListener('mouseleave', () => { this.isHovered = false; this.isDragging = false; });
    
    this.element.addEventListener('mousedown', (e) => this.startDrag(e));
    window.addEventListener('mousemove', (e) => this.drag(e));
    window.addEventListener('mouseup', () => this.endDrag());
    
    this.element.addEventListener('touchstart', (e) => { this.isHovered = true; this.startDrag(e.touches[0]); });
    window.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
    window.addEventListener('touchend', () => { this.isHovered = false; this.endDrag(); });

    this.animate();
  }

  cloneContent() {
    const children = Array.from(this.element.children);
    children.forEach(child => {
      this.element.appendChild(child.cloneNode(true));
    });
  }

  startDrag(e) {
    this.isDragging = true;
    this.startX = e.pageX || e.clientX;
    this.scrollLeft = this.element.scrollLeft;
    this.element.style.cursor = 'grabbing';
  }

  drag(e) {
    if (!this.isDragging) return;
    const x = e.pageX || e.clientX;
    const walk = (x - this.startX) * 2;
    this.element.scrollLeft = this.scrollLeft - walk;
  }

  endDrag() {
    this.isDragging = false;
    this.element.style.cursor = 'grab';
  }

  animate() {
    if (!this.isHovered && !this.isDragging) {
      this.element.scrollLeft += this.speed;
      if (this.element.scrollLeft >= this.element.scrollWidth / 2) {
        this.element.scrollLeft = 0;
      }
    }
    requestAnimationFrame(() => this.animate());
  }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  new WaveformAnimation();
  initScrollAnimations();
  
  const menuBtn = document.querySelector('.mobile-menu-btn');
  if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);

  const carouselContainer = document.querySelector('.carousel-3d-wrapper');
  if (carouselContainer) new Draggable3DCarousel(carouselContainer);

  const techTrack = document.querySelector('.tech-logos-wrapper');
  if (techTrack) new AutoScroll(techTrack, 1);
});
