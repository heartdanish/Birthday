const balloonColors = [
    '#ff6b6b', '#4d96ff', '#ffd93d', '#6bcb77', 
    '#ff9ff3', '#a55eea', '#ff7675', '#74b9ff',
    '#fd79a8', '#e17055', '#00cec9', '#6c5ce7'
];

const particlesContainer = document.getElementById('particles');
const balloonsContainer = document.getElementById('balloons-container');
const homepage = document.getElementById('homepage');
const birthdaySection = document.getElementById('birthday-section');
const startBtn = document.getElementById('start-btn');
const confettiContainer = document.getElementById('confetti-container');
const fireworksContainer = document.getElementById('fireworks');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const starsContainer = document.getElementById('stars');

let balloons = [];
let isMusicPlaying = false;

function createStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.width = `${1 + Math.random() * 2}px`;
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const colors = ['#ff6b6b', '#4d96ff', '#ffd93d', '#6bcb77', '#ff9ff3', '#a55eea'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 3 + Math.random() * 8;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 10;
    
    particle.style.background = color;
    particle.style.left = `${left}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

function initParticles() {
    for (let i = 0; i < 30; i++) {
        setTimeout(createParticle, i * 200);
    }
    
    setInterval(() => {
        if (document.querySelectorAll('.particle').length < 50) {
            createParticle();
        }
    }, 300);
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const size = 50 + Math.random() * 30;
    const left = Math.random() * 90 + 5;
    const duration = 10 + Math.random() * 8;
    const delay = Math.random() * 15;
    
    balloon.style.background = `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.9), ${color})`;
    balloon.style.boxShadow = `inset -10px -10px 20px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.2)`;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.3}px`;
    balloon.style.left = `${left}%`;
    balloon.style.animationDuration = `${duration}s`;
    balloon.style.animationDelay = `${delay}s`;
    
    balloonsContainer.appendChild(balloon);
    balloons.push(balloon);
}

function initBalloons() {
    const balloonCount = window.innerWidth < 768 ? 20 : 35;
    for (let i = 0; i < balloonCount; i++) {
        setTimeout(createBalloon, i * 300);
    }
    
    setInterval(() => {
        if (balloons.length < 60 && !birthdaySection.classList.contains('hidden')) {
            createBalloon();
        }
    }, 800);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    const colors = ['#ff6b6b', '#4d96ff', '#ffd93d', '#6bcb77', '#ff9ff3', '#a55eea', '#fd79a8'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const size = 8 + Math.random() * 12;
    const duration = 3 + Math.random() * 3;
    const delay = Math.random() * 2;
    const shapes = ['50%', '0', '30% 70% 70% 30% / 30% 30% 70% 70%'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    confetti.style.background = `linear-gradient(135deg, ${color}, ${color}88)`;
    confetti.style.left = `${left}%`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.borderRadius = shape;
    confetti.style.animationDuration = `${duration}s`;
    confetti.style.animationDelay = `${delay}s`;
    confetti.style.top = '-20px';
    
    confettiContainer.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, (duration + delay) * 1000);
}

function startConfetti() {
    for (let i = 0; i < 80; i++) {
        setTimeout(createConfetti, i * 30);
    }
    
    const confettiInterval = setInterval(createConfetti, 150);
    setTimeout(() => clearInterval(confettiInterval), 10000);
}

function createFirework(x, y) {
    const colors = ['#ff6b6b', '#4d96ff', '#ffd93d', '#6bcb77', '#ff9ff3', '#a55eea', '#fd79a8', '#00cec9'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5;
        const distance = 80 + Math.random() * 150;
        const duration = 0.8 + Math.random() * 0.7;
        
        particle.style.background = color;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        particle.style.animationDuration = `${duration}s`;
        
        fireworksContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

function startFireworks() {
    const fireworkInterval = setInterval(() => {
        const x = 20 + Math.random() * 60;
        const y = 15 + Math.random() * 25;
        createFirework(x, y);
    }, 400);
    
    setTimeout(() => {
        clearInterval(fireworkInterval);
    }, 8000);
    
    setTimeout(() => {
        const secondRound = setInterval(() => {
            const x = 10 + Math.random() * 80;
            const y = 10 + Math.random() * 30;
            createFirework(x, y);
        }, 600);
        setTimeout(() => clearInterval(secondRound), 6000);
    }, 4000);
}

function createFlyingEmoji(x, y, emoji) {
    const flying = document.createElement('div');
    flying.className = 'flying-emoji';
    flying.textContent = emoji;
    
    const rect = document.body.getBoundingClientRect();
    flying.style.left = `${x}px`;
    flying.style.top = `${y}px`;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 300 + Math.random() * 400;
    const duration = 1 + Math.random() * 0.5;
    const rotation = (Math.random() - 0.5) * 720;
    
    flying.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
    flying.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
    flying.style.setProperty('--rotation', `${rotation}deg`);
    flying.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(flying);
    
    setTimeout(() => {
        flying.remove();
    }, duration * 1000);
}

function handleEmojiClick(e) {
    const clicked = e.target;
    const emojis = ['🎉', '🎈', '🎂', '✨', '🎁', '🥳', '🎊', '⭐', '🌟', '💫', '🌈', '💝'];
    const rect = clicked.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            createFlyingEmoji(x, y, randomEmoji);
        }, i * 40);
    }
    
    clicked.style.transform = 'scale(1.3) rotate(15deg)';
    setTimeout(() => {
        clicked.style.transform = '';
    }, 300);
}

function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
}

function startParty() {
    homepage.style.opacity = '0';
    homepage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        homepage.classList.add('hidden');
        birthdaySection.classList.remove('hidden');
        
        setTimeout(() => {
            birthdaySection.style.opacity = '1';
            birthdaySection.style.transform = 'scale(1)';
        }, 50);
        
        startConfetti();
        startFireworks();
        
        if (isMusicPlaying) {
            bgMusic.volume = 0.4;
            bgMusic.play().catch(() => {});
        }
    }, 600);
}

function init() {
    createStars();
    initParticles();
    initBalloons();
    
    startBtn.addEventListener('click', startParty);
    musicToggle.addEventListener('click', toggleMusic);
    
    document.querySelectorAll('.showcase-emoji').forEach(emoji => {
        emoji.style.cursor = 'pointer';
        emoji.addEventListener('click', handleEmojiClick);
    });
    
    window.addEventListener('resize', () => {
        if (balloons.length < 35 && window.innerWidth >= 768) {
            createBalloon();
        }
    });
}

document.addEventListener('DOMContentLoaded', init);