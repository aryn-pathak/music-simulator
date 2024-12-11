const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const checkbox = document.getElementById('myCheckbox');
const activeNotes = new Set();

let speed = 0.05;
let mouseMoveListener = null;

function stopAllSounds() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

checkbox.addEventListener('change', function() {
    if (this.checked) {
        mouseMoveListener = (event) => {
            mouseX = event.x;
            mouseY = event.y;
        };
        document.addEventListener('mousemove', mouseMoveListener);
    } else {
        if (mouseMoveListener) {
            document.removeEventListener('mousemove', mouseMoveListener);
        }
        mouseX = canvas.width/2;
        mouseY = canvas.height/2;
    }
});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = canvas.width/2;
let mouseY = canvas.height/2;
let color = "#b3b3b3";



setInterval(() => {
    console.log(`Mouse position: x=${mouseX}, y=${mouseY}`);
}, 600);

class Particle {
    constructor(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
        this.size = Math.random() * 5 + 2;
        
        // Create circular spread
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10;  // Adjust for desired spread
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        
        this.lifetime = 200;
    }

    update() {
        // Add mouse influence
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        this.x += dx * speed;  // Adjust 0.05 to control follow speed
        this.y += dy * speed;
        ctx.fillStyle = color;

        // Keep original random movement
        this.x += this.speedX;
        this.y += this.speedY;
        this.lifetime--;
    }

    draw() {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

let particles = [];
const origin = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.push(new Particle(mouseX, mouseY)); // Always add particles

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].lifetime <= 0) {
            particles.splice(i, 1);
        }
    }

    // Keep particle count in check
    if (particles.length > 100) {
        particles.splice(0, 1); // Remove oldest particle
    }

    requestAnimationFrame(animate);
}

animate();

let lastKeyPressed = null;

document.addEventListener('keydown', function(event) {
   if (event.key === lastKeyPressed) return;
   lastKeyPressed = event.key;

   let audio;
   switch(event.key) {
       case 'q':
           color = "#ff5b4f"
           speed = 0.01
           audio = new Audio('./notes/C.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case 'w':
           color = "#ff6f0f" 
           speed = 0.01
           audio = new Audio('./notes/Cs.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case 'e':
           color = "#f59700"
           speed = 0.01
           audio = new Audio('./notes/D.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case 'r':
           color = "#ebc342"
           speed = 0.01
           audio = new Audio('./notes/Ds.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case 't':
           color = "#ebaf42"
           speed = 0.01
           audio = new Audio('./notes/E.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case 'y':
           color = "#8dcf15"
           speed = 0.01
           audio = new Audio('./notes/F.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case 'u':
           color = "#67db97"
           speed = 0.01
           audio = new Audio('./notes/Fs.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case 'i':
           color = "#59ebbd"
           speed = 0.01
           audio = new Audio('./notes/G.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case 'o':
           color = "#59ceeb"
           speed = 0.01
           audio = new Audio('./notes/Gs.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case 'p':
            color = "#59a4eb"
            speed = 0.01
            audio = new Audio('./notes/A.wav')
            audio.playbackRate = 0.5;
            audio.play()
            break;
       case '[':
           color = "#5e59eb"
           speed = 0.01
           audio = new Audio('./notes/As.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
       case ']':
           color = "#bd59eb"
           speed = 0.01
           audio = new Audio('./notes/B.wav')
           audio.playbackRate = 0.5;
           audio.play()
           break;
   }
});

document.addEventListener('keyup', (event) => {
   lastKeyPressed = null;
   color = "#b3b3b3"
   speed = 0.05
   stopAllSounds();
});

document.addEventListener('mousedown', () => speed = 0.01);
document.addEventListener('mouseup', () => speed = 0.05);

//i have used "s" instead of "#" in the names of notes because special characters were causing issues with urls
