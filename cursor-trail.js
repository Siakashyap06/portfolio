// Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.init();
    }
    
    init() {
        const trailContainer = document.getElementById('cursor-trail');
        const canvas = document.createElement('canvas');
        canvas.id = 'trail-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        trailContainer.appendChild(canvas);
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => this.update(e));
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    update(e) {
        this.trail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
        
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const now = Date.now();
        const maxAge = 500;
        
        for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            const age = now - point.time;
            
            if (age > maxAge) {
                this.trail.splice(i, 1);
                i--;
                continue;
            }
            
            const alpha = 1 - (age / maxAge);
            const size = 3 * alpha;
            
            // Subtle trail for notebook
            this.ctx.strokeStyle = `rgba(100, 100, 100, ${alpha * 0.2})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            
            if (i > 0) {
                const prevPoint = this.trail[i - 1];
                this.ctx.moveTo(prevPoint.x, prevPoint.y);
                this.ctx.lineTo(point.x, point.y);
            }
            
            this.ctx.stroke();
            
            // Draw node
            this.ctx.fillStyle = `rgba(150, 150, 150, ${alpha * 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor trail
document.addEventListener('DOMContentLoaded', () => {
    new CursorTrail();
});
