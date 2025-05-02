
// 3D card effect
const card = document.getElementById('productCard');
const content = card.querySelector('.card-content');

// 3D Tilt effect
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;
  const rotateY = -(x - centerX) / 10;
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  content.style.transform = `translateZ(50px)`;
});

// Reset position on mouse leave
card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  content.style.transform = 'translateZ(0)';
  setTimeout(() => {
    card.style.transition = 'transform 0.5s ease';
  }, 100);
});

// Remove transition on mouse enter for smooth movement
card.addEventListener('mouseenter', () => {
  card.style.transition = 'none';
});

// Add sparkle effect on button hover
const addSparkles = (e) => {
  const btn = document.getElementById('addToCart');
  const btnRect = btn.getBoundingClientRect();
  
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const x = Math.random() * btnRect.width;
    const y = Math.random() * btnRect.height;
    
    sparkle.style.left = `${x + btnRect.left}px`;
    sparkle.style.top = `${y + btnRect.top}px`;
    sparkle.style.opacity = '1';
    
    document.body.appendChild(sparkle);
    
    // Animate the sparkle
    setTimeout(() => {
      sparkle.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px)`;
      sparkle.style.opacity = '0';
    }, 10);
    
    // Remove the sparkle after animation
    setTimeout(() => {
      document.body.removeChild(sparkle);
    }, 1000);
  }
};

const btn = document.getElementById('addToCart');
btn.addEventListener('mouseover', addSparkles);
btn.addEventListener('click', (e) => {
  e.preventDefault();
  addSparkles(e);
  
  // Add animation to show item added to cart
  btn.innerText = 'Added!';
  btn.style.background = 'rgba(0, 255, 128, 0.3)';
  
  setTimeout(() => {
    btn.innerText = 'Add to Cart';
    btn.style.background = 'rgba(255, 255, 255, 0.2)';
  }, 1500);
});

// Create a responsive parallax effect
window.addEventListener('deviceorientation', (e) => {
  if (e.beta && e.gamma) {
    const x = e.gamma / 5; // -90 to 90
    const y = e.beta / 5; // -180 to 180
    
    card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    content.style.transform = `translateZ(30px)`;
  }
});

// Create floating animation for product image on smaller screens
const checkScreenSize = () => {
  const productImg = document.querySelector('.product-img img');
  if (window.innerWidth <= 768) {
    productImg.classList.add('rotate-animation');
  } else {
    productImg.classList.remove('rotate-animation');
  }
};

window.addEventListener('resize', checkScreenSize);
checkScreenSize();
