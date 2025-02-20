const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 18000;  // ✅ 2000 ta zarracha
const maxSpeed = 10;
const mouseRepelForce = 100;  // ✅ Sichqonchadan qochish kuchi

let mouse = { x: null, y: null };

// 🖱 Sichqoncha joylashuvini olish
window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// 📏 Ekran o'lchami o'zgarganda canvasni moslashtirish
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 🔵 Zarrachalar obyektini yaratish
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // ✅ Kichik zarrachalar yo'qolmasligi uchun
        this.speedX = (Math.random() - 0.5) * maxSpeed;
        this.speedY = (Math.random() - 0.5) * maxSpeed;
        this.color = "#00FF00";  // ✅ Yashil rang
    }

    update() {
        // 🖱 Sichqoncha ta'siri: zarrachalar undan qochadi
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            let angle = Math.atan2(dy, dx);
            this.speedX = Math.cos(angle) * maxSpeed;
            this.speedY = Math.sin(angle) * maxSpeed;
        }

        // 🏃 Harakat
        this.x += this.speedX;
        this.y += this.speedY;

        // 🖥 Ekran chetlariga yetganda qaytib kelish
        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 🔄 Zarrachalar yaratish
function createParticles() {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}
createParticles();

// ✍ NURISLOM yozuvini chizish
function drawText() {
    ctx.fillStyle = "#FF0000"; // ✅ Qizil rang
    ctx.font = "bold 80px Arial";  // ✅ Katta shrift
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("NURISLOM", canvas.width / 2, canvas.height / 2);
}

// 🔄 Animatsiya qilish
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 📌 1️⃣ Avval yozuvni chizamiz
    drawText();

    // 📌 2️⃣ Keyin zarrachalarni chizamiz
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    requestAnimationFrame(animate);
}
animate();
