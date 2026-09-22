/**
 * Noodle Flow Ramen - Ultra-Polished 60fps Canvas Animation
 * Combines organic floating background ramen noodles, a high-detail vector ramen bowl,
 * interactive chopsticks lifting noodles, and soft realistic vapor steam.
 */
(function () {
    'use strict';

    const canvas = document.getElementById('noodleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Mouse & Scroll state
    const mouse = {
        x: -1000,
        y: -1000,
        targetX: -1000,
        targetY: -1000,
        active: false
    };

    let lastScrollY = window.scrollY;
    let scrollVel = 0;

    // --- 1. AMBIENT BACKGROUND FLOATING RAMEN NOODLES ---
    const BG_NOODLE_COUNT = 20;
    const bgNoodles = [];

    class BgNoodleStrand {
        constructor(index) {
            this.index = index;
            this.reset();
        }

        reset() {
            this.points = [];
            this.startX = Math.random() * (width + 100) - 50;
            const length = height * (0.6 + Math.random() * 0.5);
            const SEGMENTS = 24;
            const crimpCycles = 8 + Math.random() * 10;
            const crimpAmp = 12 + Math.random() * 14;

            for (let i = 0; i < SEGMENTS; i++) {
                const progress = i / (SEGMENTS - 1);
                const py = (progress * length) - (length * 0.1);
                const crimpX = Math.sin(progress * Math.PI * crimpCycles) * crimpAmp;
                const px = this.startX + crimpX;

                this.points.push({
                    x: px,
                    y: py,
                    baseX: px,
                    baseY: py,
                    phase: Math.random() * Math.PI * 2
                });
            }

            this.thickness = 4.5 + Math.random() * 3.5;
            this.alpha = 0.18 + Math.random() * 0.22;
            const colors = ['#ffd166', '#ffb703', '#f4a261', '#ffe066'];
            this.color = colors[this.index % colors.length];
        }

        update(t) {
            for (let i = 0; i < this.points.length; i++) {
                const p = this.points[i];
                const waveX = Math.sin(t * 1.2 + p.phase + i * 0.2) * 12;
                let targetX = p.baseX + waveX;
                let targetY = p.baseY + (scrollVel * 0.1);

                if (mouse.active) {
                    const dx = targetX - mouse.x;
                    const dy = targetY - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 180 && dist > 0) {
                        const force = (1 - dist / 180) * 45;
                        const angle = Math.atan2(dy, dx);
                        targetX += Math.cos(angle) * force;
                        targetY += Math.sin(angle) * force;
                    }
                }

                p.x += (targetX - p.x) * 0.08;
                p.y += (targetY - p.y) * 0.08;
            }
        }

        draw() {
            if (this.points.length < 3) return;

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.thickness;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 6;

            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
            for (let i = 0; i < this.points.length - 1; i++) {
                const p1 = this.points[i];
                const p2 = this.points[i + 1];
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
            }
            const last = this.points[this.points.length - 1];
            ctx.lineTo(last.x, last.y);
            ctx.stroke();
            ctx.restore();
        }
    }

    // --- 2. SOFT REALISTIC STEAM VAPOR WISPS ---
    const STEAM_COUNT = 12;
    const steamWisps = [];

    class SteamWisp {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = (Math.random() - 0.5) * 80;
            this.y = -35;
            this.radius = 15 + Math.random() * 15;
            this.vy = -(0.5 + Math.random() * 0.7);
            this.vx = (Math.random() - 0.5) * 0.4;
            this.alpha = 0.02;
            this.maxAlpha = 0.12 + Math.random() * 0.12;
            this.life = 0;
            this.maxLife = 120 + Math.random() * 80;
            this.growth = 0.25 + Math.random() * 0.2;
        }

        update() {
            this.life++;
            this.y += this.vy;
            this.x += this.vx + Math.sin(this.life * 0.04) * 0.6;
            this.radius += this.growth;

            // Smooth fade in and out
            const progress = this.life / this.maxLife;
            if (progress < 0.3) {
                this.alpha = (progress / 0.3) * this.maxAlpha;
            } else {
                this.alpha = (1 - (progress - 0.3) / 0.7) * this.maxAlpha;
            }

            if (this.life >= this.maxLife) {
                this.reset();
            }
        }

        draw(centerX, centerY) {
            ctx.save();
            ctx.beginPath();
            const grad = ctx.createRadialGradient(
                centerX + this.x, centerY + this.y, 0,
                centerX + this.x, centerY + this.y, this.radius
            );
            grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
            grad.addColorStop(0.5, `rgba(244, 236, 225, ${this.alpha * 0.6})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = grad;
            ctx.arc(centerX + this.x, centerY + this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function init() {
        resize();

        bgNoodles.length = 0;
        for (let i = 0; i < BG_NOODLE_COUNT; i++) {
            bgNoodles.push(new BgNoodleStrand(i));
        }

        steamWisps.length = 0;
        for (let i = 0; i < STEAM_COUNT; i++) {
            steamWisps.push(new SteamWisp());
        }
    }

    function resize() {
        dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        width = rect.width || window.innerWidth;
        height = rect.height || window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }

    // Event listeners
    window.addEventListener('resize', () => {
        resize();
        bgNoodles.forEach(n => n.reset());
    });

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
    });

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollVel = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;
    });

    // Render loop 60fps
    function render(currentTime) {
        const t = currentTime * 0.001;

        // Smooth mouse position
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
        scrollVel *= 0.9;

        ctx.clearRect(0, 0, width, height);

        // --- 1. RENDER AMBIENT FLOATING NOODLES IN BACKGROUND ---
        for (let i = 0; i < bgNoodles.length; i++) {
            bgNoodles[i].update(t);
            bgNoodles[i].draw();
        }

        // --- 2. CALCULATE BOWL POSITION & RESPONSIVE SCALE ---
        // On screens wider than 992px, position on the right half. On smaller, center.
        let bowlX = width > 992 ? width * 0.75 : width * 0.5;
        // Keep inside bounds so bowl is never cut off
        bowlX = Math.min(bowlX, width - 180);
        bowlX = Math.max(bowlX, 180);

        const floatY = Math.sin(t * 1.5) * 10 + (scrollVel * 0.15);
        const bowlY = (height * 0.48) + floatY;
        const bowlScale = width < 768 ? 0.75 : (width < 1200 ? 0.95 : 1.1);

        // Draw soft steam wisps floating out of bowl
        for (let i = 0; i < steamWisps.length; i++) {
            steamWisps[i].update();
            steamWisps[i].draw(bowlX, bowlY - 50 * bowlScale);
        }

        ctx.save();
        ctx.translate(bowlX, bowlY);
        ctx.scale(bowlScale, bowlScale);

        // --- 3. BOWL DROP SHADOW ---
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, 145, 155 + Math.sin(t * 1.5) * 6, 32, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.restore();

        // --- 4. BOWL CERAMIC BODY & RED ACCENT ---
        // Main Bowl Body
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, 140, 0, Math.PI, false);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        // Red Accent Stripe
        ctx.beginPath();
        ctx.arc(0, 0, 122, 0.22, Math.PI - 0.22, false);
        ctx.lineWidth = 16;
        ctx.strokeStyle = '#ef4444';
        ctx.stroke();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        // Bowl Rim (Top Oval)
        ctx.beginPath();
        ctx.ellipse(0, 0, 140, 46, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        // Rich Amber Broth Base
        ctx.beginPath();
        ctx.ellipse(0, 4, 128, 38, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ea580c';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#c2410c';
        ctx.stroke();
        ctx.restore();

        // --- 5. DENSE BED OF WAVY RAMEN NOODLES INSIDE BOWL ---
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw 28 dense crimped noodle strands inside the broth
        const BOWL_NOODLE_COUNT = 28;
        for (let i = 0; i < BOWL_NOODLE_COUNT; i++) {
            const angle = (i / BOWL_NOODLE_COUNT) * Math.PI * 2;
            const distRadius = 15 + (i % 5) * 20;
            const cx = Math.cos(angle + t * 0.3) * distRadius;
            const cy = Math.sin(angle * 1.4 + t * 0.4) * (distRadius * 0.3) + 6;

            ctx.beginPath();
            ctx.moveTo(cx - 24, cy);
            
            const wave = Math.sin(t * 2.5 + i * 0.8) * 7;
            ctx.quadraticCurveTo(cx - 12, cy - 14 + wave, cx, cy);
            ctx.quadraticCurveTo(cx + 12, cy + 14 - wave, cx + 24, cy);

            // Noodle 3D Shadow
            ctx.strokeStyle = '#9a3412';
            ctx.lineWidth = 7.5;
            ctx.stroke();

            // Noodle Core
            ctx.strokeStyle = (i % 3 === 0) ? '#ffd166' : ((i % 3 === 1) ? '#ffb703' : '#f59e0b');
            ctx.lineWidth = 5.5;
            ctx.stroke();

            // Noodle Highlight
            ctx.strokeStyle = '#fff3b0';
            ctx.lineWidth = 1.8;
            ctx.stroke();
        }
        ctx.restore();

        // --- 6. TOPPINGS (NORI, CHASHU, NITAMAGO EGG, GREEN ONIONS) ---
        
        // Nori Seaweed
        ctx.save();
        ctx.translate(-72, -22);
        ctx.rotate(-0.35);
        ctx.beginPath();
        ctx.rect(0, 0, 44, 62);
        ctx.fillStyle = '#14532d';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(12, 6); ctx.lineTo(12, 56);
        ctx.moveTo(24, 6); ctx.lineTo(24, 56);
        ctx.moveTo(36, 6); ctx.lineTo(36, 56);
        ctx.strokeStyle = '#166534';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();

        // Chashu Pork Slices
        ctx.save();
        ctx.translate(18, -18);
        ctx.rotate(0.18);
        ctx.beginPath();
        ctx.ellipse(0, 0, 46, 22, 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#fb923c';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(0, 0, 30, 12, 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffedd5';
        ctx.fill();
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();

        // Nitamago Egg
        ctx.save();
        ctx.translate(-32, -10);
        ctx.rotate(-0.12 + Math.sin(t * 1.8) * 0.04);
        ctx.beginPath();
        ctx.ellipse(0, 0, 32, 24, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(-2, 0, 16, 14, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#d97706';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-6, -4, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();

        // Green Onion Scallion Sprinkles
        ctx.save();
        const scallions = [
            { x: -10, y: 15 }, { x: 5, y: 22 }, { x: -25, y: 28 },
            { x: 25, y: 10 }, { x: 38, y: 24 }
        ];
        scallions.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#22c55e';
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = '#14532d';
            ctx.stroke();
        });
        ctx.restore();

        // --- 7. INTERACTIVE CHOPSTICKS LIFTING CRIMPED NOODLES ---
        ctx.save();

        let chopstickAngle = 0.52;
        let liftX = 0;
        let liftY = 0;

        if (mouse.active) {
            const dx = mouse.x - (bowlX + 45 * bowlScale);
            const dy = mouse.y - (bowlY - 30 * bowlScale);
            const dist = Math.hypot(dx, dy);

            if (dist < 250) {
                const factor = (1 - dist / 250);
                liftX = Math.cos(t * 3.5) * (factor * 12);
                liftY = -factor * 30 + Math.sin(t * 3.5) * 6;
                chopstickAngle += factor * 0.08;
            }
        }

        ctx.translate(45 + liftX, -30 + liftY);
        ctx.rotate(chopstickAngle);

        // Chopstick 1
        ctx.beginPath();
        ctx.roundRect(-8, -125, 10, 185, [4, 4, 2, 2]);
        ctx.fillStyle = '#b45309';
        ctx.fill();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        // Chopstick 2
        ctx.beginPath();
        ctx.roundRect(6, -120, 10, 185, [4, 4, 2, 2]);
        ctx.fillStyle = '#92400e';
        ctx.fill();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        // Lifted Noodle Bundle hanging from chopsticks
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-2, 45);
        ctx.quadraticCurveTo(-22, 85, -2, 115);
        ctx.quadraticCurveTo(18, 145, -5, 175);
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 9;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-2, 45);
        ctx.quadraticCurveTo(-22, 85, -2, 115);
        ctx.quadraticCurveTo(18, 145, -5, 175);
        ctx.strokeStyle = '#ffd166';
        ctx.lineWidth = 6.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Second strand in bundle
        ctx.beginPath();
        ctx.moveTo(8, 48);
        ctx.quadraticCurveTo(-10, 90, 8, 125);
        ctx.quadraticCurveTo(24, 155, 10, 180);
        ctx.strokeStyle = '#ffb703';
        ctx.lineWidth = 5.5;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();

        ctx.restore(); // Restore chopsticks transform

        ctx.restore(); // Restore bowl transform

        requestAnimationFrame(render);
    }

    init();
    requestAnimationFrame(render);
})();
