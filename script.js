const balloonColors = [
    '#ff6b6b', '#4d96ff', '#ffd93d', '#6bcb77', 
    '#ff9ff3', '#a55eea', '#ff7675', '#74b9ff'
];

const balloonsContainer = document.getElementById('balloons-container');
const homepage = document.getElementById('homepage');
const birthdaySection = document.getElementById('birthday-section');
const startBtn = document.getElementById('start-btn');
const confettiContainer = document.getElementById('confetti-container');
const fireworksContainer = document.getElementById('fireworks');
const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');

let balloons = [];
let confettiInterval;
let fireworksInterval;

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const size = 40 + Math.random() * 40;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 8;
    const floatDuration = 2 + Math.random() * 3;
    
    balloon.style.background = `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.8), ${color})`;
    balloon.style.setProperty('--balloon-color', color);
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.4}px`;
    balloon.style.left = `${left}%`;
    balloon.style.animation = `fall ${duration}s linear infinite, float ${floatDuration}s ease-in-out infinite`;
    balloon.style.animationDelay = `${Math.random() * 10}s, ${Math.random() * 5}s`;
    
    balloonsContainer.appendChild(balloon);
    balloons.push(balloon);
}

function initBalloons() {
    const balloonCount = window.innerWidth < 768 ? 25 : 40;
    for (let i = 0; i < balloonCount; i++) {
        setTimeout(createBalloon, i * 200);
    }
    
    setInterval(() => {
        if (balloons.length < 50) {
            createBalloon();
        }
    }, 500);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    const colors = ['#ff6b6b', '#4d96ff', '#ffd93d', '#6bcb77', '#ff9ff3'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const size = 8 + Math.random() * 10;
    const duration = 3 + Math.random() * 2;
    const delay = Math.random() * 2;
    
    confetti.style.background = color;
    confetti.style.left = `${left}%`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.animationDuration = `${duration}s`;
    confetti.style.animationDelay = `${delay}s`;
    
    confettiContainer.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, (duration + delay) * 1000);
}

function startConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(createConfetti, i * 50);
    }
    
    confettiInterval = setInterval(createConfetti, 200);
}

function createFirework(x, y) {
    const colors = ['#ff6b6b', '#4d96ff', '#ffd93d', '#6bcb77', '#ff9ff3'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.background = color;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        const angle = (i / 30) * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const duration = 1 + Math.random() * 0.5;
        
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        particle.style.animation = `firework ${duration}s ease-out forwards`;
        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        
        fireworksContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

function startFireworks() {
    const positions = [
        { x: 20, y: 20 },
        { x: 80, y: 25 },
        { x: 50, y: 15 },
        { x: 30, y: 30 },
        { x: 70, y: 35 },
        { x: 15, y: 40 },
        { x: 85, y: 45 }
    ];
    
    let index = 0;
    const fireworkInterval = setInterval(() => {
        if (index >= positions.length) {
            index = 0;
        }
        createFirework(positions[index].x, positions[index].y);
        index++;
    }, 500);
    
    setTimeout(() => {
        clearInterval(fireworkInterval);
    }, 5000);
}

function playClickSound() {
    clickSound.volume = 0.5;
    clickSound.play().catch(() => {});
}

function startParty() {
    playClickSound();
    
    homepage.style.opacity = '0';
    
    setTimeout(() => {
        homepage.classList.add('hidden');
        birthdaySection.classList.remove('hidden');
        
        startConfetti();
        startFireworks();
        
        try {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(() => {});
        } catch (e) {
            console.log('Audio autoplay blocked');
        }
    }, 800);
}

startBtn.addEventListener('click', startParty);

initBalloons();

window.addEventListener('resize', () => {
    const balloonCount = window.innerWidth < 768 ? 25 : 40;
    if (balloons.length < balloonCount) {
        for (let i = balloons.length; i < balloonCount; i++) {
            createBalloon();
        }
    }
});