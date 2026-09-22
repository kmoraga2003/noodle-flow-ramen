/**
 * Noodle Flow Ramen - High-Performance 60fps Canvas Animation
 * Centered multi-bowl composition with stabilized 39-frame Ramen sequence
 * and authentic rising vapor bubbles.
 */
(function () {
    'use strict';

    const canvas = document.getElementById('noodleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Load 39 pixel-stabilized transparent ramen bowl frames
    const TOTAL_FRAMES = 39;
    const frames = [];
    let loadedFramesCount = 0;
    let allFramesLoaded = false;
    const cacheBuster = Date.now();

    for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        const num = String(i).padStart(2, '0');
        img.src = `/images/ramen-frames/frame_${num}.png?v=${cacheBuster}`;
        img.onload = () => {
            loadedFramesCount++;
            if (loadedFramesCount === TOTAL_FRAMES) {
                allFramesLoaded = true;
            }
        };
        frames.push(img);
    }

    // --- STEAM VAPOR BUBBLES ---
    class SteamBubble {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = (Math.random() - 0.5) * 70;
            this.y = -35 - Math.random() * 20;
            this.radius = 9 + Math.random() * 15;
            this.vy = -(0.6 + Math.random() * 1.1);
            this.vx = (Math.random() - 0.5) * 0.45;
            this.alpha = 0.18 + Math.random() * 0.28;
            this.life = 1;
            this.decay = 0.008 + Math.random() * 0.008;
            this.growth = 0.16 + Math.random() * 0.18;
        }

        update() {
            this.y += this.vy;
            this.x += this.vx + Math.sin(this.y * 0.03) * 0.3;
            this.radius += this.growth;
            this.life -= this.decay;
            if (this.life <= 0) {
                this.reset();
            }
        }

        draw(centerX, centerY, scale = 1) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX + this.x * scale, centerY + this.y * scale, this.radius * scale, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.globalAlpha = this.alpha * this.life;
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 10 * scale;
            ctx.fill();
            ctx.restore();
        }
    }

    // Multiple steam generators for the bowls
    const centerSteam = [];
    const leftSteam = [];
    const rightSteam = [];

    function init() {
        resize();

        centerSteam.length = 0;
        leftSteam.length = 0;
        rightSteam.length = 0;

        for (let i = 0; i < 16; i++) centerSteam.push(new SteamBubble());
        for (let i = 0; i < 10; i++) leftSteam.push(new SteamBubble());
        for (let i = 0; i < 10; i++) rightSteam.push(new SteamBubble());
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
    window.addEventListener('resize', resize);

    // 60FPS Animation Loop
    let currentFrameIndex = 0;
    let lastFrameTime = performance.now();
    const FRAME_DURATION = 1000 / 24; // 24 fps smooth playback

    function render(currentTime) {
        if (currentTime - lastFrameTime >= FRAME_DURATION) {
            currentFrameIndex = (currentFrameIndex + 1) % TOTAL_FRAMES;
            lastFrameTime = currentTime;
        }

        ctx.clearRect(0, 0, width, height);

        const isDesktop = width > 992;
        const isTablet = width > 768;

        // --- 1. SIDE RAMEN BOWLS (LEFT & RIGHT) ON DESKTOP/TABLET ---
        if (isTablet && (allFramesLoaded || loadedFramesCount > 0)) {
            // Left Bowl
            const leftX = width * (isDesktop ? 0.16 : 0.12);
            const leftY = height * 0.52;
            const sideScale = isDesktop ? 0.62 : 0.48;
            const leftFrameIdx = (currentFrameIndex + 13) % TOTAL_FRAMES;
            const leftImg = frames[leftFrameIdx];

            // Left Steam
            for (let i = 0; i < leftSteam.length; i++) {
                leftSteam[i].update();
                leftSteam[i].draw(leftX - 25 * sideScale, leftY - 90 * sideScale, sideScale);
            }

            if (leftImg && leftImg.complete) {
                ctx.save();
                ctx.translate(leftX, leftY);
                ctx.scale(sideScale, sideScale);
                ctx.globalAlpha = 0.85;
                ctx.drawImage(leftImg, -500, -650);
                ctx.restore();
            }

            // Right Bowl
            const rightX = width * (isDesktop ? 0.84 : 0.88);
            const rightY = height * 0.52;
            const rightFrameIdx = (currentFrameIndex + 26) % TOTAL_FRAMES;
            const rightImg = frames[rightFrameIdx];

            // Right Steam
            for (let i = 0; i < rightSteam.length; i++) {
                rightSteam[i].update();
                rightSteam[i].draw(rightX - 25 * sideScale, rightY - 90 * sideScale, sideScale);
            }

            if (rightImg && rightImg.complete) {
                ctx.save();
                ctx.translate(rightX, rightY);
                ctx.scale(sideScale, sideScale);
                ctx.globalAlpha = 0.85;
                ctx.drawImage(rightImg, -500, -650);
                ctx.restore();
            }
        }

        // --- 2. MAIN CENTER RAMEN BOWL ---
        const centerX = width * 0.5;
        const centerY = height * 0.52;
        const mainScale = width < 768 ? 0.72 : (width < 1200 ? 0.95 : 1.08);

        // Center Steam
        for (let i = 0; i < centerSteam.length; i++) {
            centerSteam[i].update();
            centerSteam[i].draw(centerX - 40 * mainScale, centerY - 140 * mainScale, mainScale);
        }

        // Draw Center Bowl Frame
        if (allFramesLoaded || loadedFramesCount > 0) {
            const currentImg = frames[currentFrameIndex];
            if (currentImg && currentImg.complete) {
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.scale(mainScale, mainScale);
                ctx.drawImage(currentImg, -500, -650);
                ctx.restore();
            }
        }

        requestAnimationFrame(render);
    }

    init();
    requestAnimationFrame(render);
})();
