// Interactive Photobooth
class Photobooth {
    constructor() {
        this.video = null;
        this.capturedImages = [];
        this.currentFilter = 'none';
        this.params = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            noise: 0
        };
        this.effects = {
            mirror: false,
            grid: false,
            particles: false
        };
        this.init();
    }
    
    init() {
        this.setupSketch();
        this.setupControls();
        this.loadCapturedImages();
    }
    
    setupSketch() {
        const sketch = function(p) {
            let video;
            let particles = [];
            let capturedImage = null;
            
            p.setup = function() {
                let canvas = p.createCanvas(800, 600);
                canvas.parent('photobooth-canvas');
                p.colorMode(p.RGB, 255);
                
                // Try to access webcam
                video = p.createCapture(p.VIDEO);
                video.size(800, 600);
                video.hide();
                
                // Initialize particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-2, 2),
                        vy: p.random(-2, 2),
                        size: p.random(3, 8)
                    });
                }
            };
            
            p.draw = function() {
                p.clear();
                p.background(10, 10, 15);
                
                if (video && video.loadedmetadata) {
                    let img = video;
                    
                    // Apply mirror if enabled
                    if (window.photobooth && window.photobooth.effects.mirror) {
                        p.push();
                        p.translate(p.width, 0);
                        p.scale(-1, 1);
                        p.image(img, 0, 0, p.width, p.height);
                        p.pop();
                    } else {
                        p.image(img, 0, 0, p.width, p.height);
                    }
                    
                    // Apply filters
                    if (window.photobooth) {
                        let filter = window.photobooth.currentFilter;
                        let params = window.photobooth.params;
                        
                        p.loadPixels();
                        
                        for (let i = 0; i < p.pixels.length; i += 4) {
                            let r = p.pixels[i];
                            let g = p.pixels[i + 1];
                            let b = p.pixels[i + 2];
                            
                            // Brightness
                            r = p.constrain(r * (params.brightness / 100), 0, 255);
                            g = p.constrain(g * (params.brightness / 100), 0, 255);
                            b = p.constrain(b * (params.brightness / 100), 0, 255);
                            
                            // Contrast
                            let factor = (259 * (params.contrast + 255)) / (255 * (259 - params.contrast));
                            r = p.constrain(factor * (r - 128) + 128, 0, 255);
                            g = p.constrain(factor * (g - 128) + 128, 0, 255);
                            b = p.constrain(factor * (b - 128) + 128, 0, 255);
                            
                            // Saturation
                            let gray = 0.299 * r + 0.587 * g + 0.114 * b;
                            r = p.constrain(gray + (r - gray) * (params.saturation / 100), 0, 255);
                            g = p.constrain(gray + (g - gray) * (params.saturation / 100), 0, 255);
                            b = p.constrain(gray + (b - gray) * (params.saturation / 100), 0, 255);
                            
                            // Apply filter effects
                            switch(filter) {
                                case 'glitch':
                                    if (p.random() < 0.1) {
                                        r = p.random(255);
                                        g = p.random(255);
                                        b = p.random(255);
                                    }
                                    break;
                                case 'rgb':
                                    let offset = p.sin(p.millis() * 0.01) * 10;
                                    if (i % 4 === 0) r = p.pixels[i + offset] || r;
                                    if (i % 4 === 1) g = p.pixels[i + offset] || g;
                                    if (i % 4 === 2) b = p.pixels[i + offset] || b;
                                    break;
                                case 'posterize':
                                    let levels = 4;
                                    r = p.floor(r / (255 / levels)) * (255 / levels);
                                    g = p.floor(g / (255 / levels)) * (255 / levels);
                                    b = p.floor(b / (255 / levels)) * (255 / levels);
                                    break;
                                case 'invert':
                                    r = 255 - r;
                                    g = 255 - g;
                                    b = 255 - b;
                                    break;
                            }
                            
                            // Noise
                            if (params.noise > 0) {
                                r += p.random(-params.noise, params.noise);
                                g += p.random(-params.noise, params.noise);
                                b += p.random(-params.noise, params.noise);
                                r = p.constrain(r, 0, 255);
                                g = p.constrain(g, 0, 255);
                                b = p.constrain(b, 0, 255);
                            }
                            
                            p.pixels[i] = r;
                            p.pixels[i + 1] = g;
                            p.pixels[i + 2] = b;
                        }
                        
                        p.updatePixels();
                    }
                    
                    // Grid overlay
                    if (window.photobooth && window.photobooth.effects.grid) {
                        p.stroke(0, 255, 136, 50);
                        p.strokeWeight(1);
                        for (let x = 0; x < p.width; x += 50) {
                            p.line(x, 0, x, p.height);
                        }
                        for (let y = 0; y < p.height; y += 50) {
                            p.line(0, y, p.width, y);
                        }
                    }
                    
                    // Particles
                    if (window.photobooth && window.photobooth.effects.particles) {
                        for (let particle of particles) {
                            particle.x += particle.vx;
                            particle.y += particle.vy;
                            
                            if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
                            if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
                            
                            p.fill(0, 255, 136, 150);
                            p.noStroke();
                            p.ellipse(particle.x, particle.y, particle.size, particle.size);
                        }
                    }
                } else {
                    // Loading message
                    p.fill(0, 255, 136);
                    p.textAlign(p.CENTER, p.CENTER);
                    p.textSize(24);
                    p.text('Requesting camera access...', p.width / 2, p.height / 2);
                }
            };
            
            // Capture function
            window.capturePhoto = function() {
                if (video && video.loadedmetadata) {
                    let img = p.get();
                    return img.canvas.toDataURL('image/png');
                }
                return null;
            };
        };
        
        new p5(sketch);
        window.photobooth = this;
    }
    
    setupControls() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
            });
        });
        
        // Sliders
        ['brightness', 'contrast', 'saturation', 'noise'].forEach(param => {
            const slider = document.getElementById(param);
            const valueDisplay = document.getElementById(`${param}-value`);
            
            if (slider && valueDisplay) {
                slider.addEventListener('input', () => {
                    this.params[param] = parseInt(slider.value);
                    valueDisplay.textContent = slider.value;
                });
            }
        });
        
        // Toggles
        ['mirror', 'grid', 'particles'].forEach(effect => {
            const toggle = document.getElementById(effect);
            if (toggle) {
                toggle.addEventListener('change', () => {
                    this.effects[effect] = toggle.checked;
                });
            }
        });
        
        // Capture button
        const captureBtn = document.getElementById('capture-btn');
        if (captureBtn) {
            captureBtn.addEventListener('click', () => {
                this.capture();
            });
        }
        
        // Reset button
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.reset();
            });
        }
    }
    
    capture() {
        if (window.capturePhoto) {
            const dataUrl = window.capturePhoto();
            if (dataUrl) {
                this.capturedImages.push(dataUrl);
                this.saveCapturedImages();
                this.updateGallery();
            }
        }
    }
    
    reset() {
        this.currentFilter = 'none';
        this.params = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            noise: 0
        };
        this.effects = {
            mirror: false,
            grid: false,
            particles: false
        };
        
        // Reset UI
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === 'none') {
                btn.classList.add('active');
            }
        });
        
        ['brightness', 'contrast', 'saturation', 'noise'].forEach(param => {
            const slider = document.getElementById(param);
            const valueDisplay = document.getElementById(`${param}-value`);
            if (slider && valueDisplay) {
                if (param === 'noise') {
                    slider.value = 0;
                    valueDisplay.textContent = '0';
                } else {
                    slider.value = 100;
                    valueDisplay.textContent = '100';
                }
            }
        });
        
        ['mirror', 'grid', 'particles'].forEach(effect => {
            const toggle = document.getElementById(effect);
            if (toggle) {
                toggle.checked = false;
            }
        });
    }
    
    updateGallery() {
        const gallery = document.getElementById('gallery-grid');
        gallery.innerHTML = '';
        
        this.capturedImages.forEach((imgData, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${imgData}" alt="Captured image ${index + 1}">
                <button class="delete-btn" data-index="${index}">&times;</button>
            `;
            
            item.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteImage(index);
            });
            
            item.addEventListener('click', () => {
                // Could open in fullscreen or download
                this.downloadImage(imgData, `photobooth-${index + 1}.png`);
            });
            
            gallery.appendChild(item);
        });
    }
    
    deleteImage(index) {
        this.capturedImages.splice(index, 1);
        this.saveCapturedImages();
        this.updateGallery();
    }
    
    downloadImage(dataUrl, filename) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
    }
    
    saveCapturedImages() {
        localStorage.setItem('photobooth-images', JSON.stringify(this.capturedImages));
    }
    
    loadCapturedImages() {
        const saved = localStorage.getItem('photobooth-images');
        if (saved) {
            this.capturedImages = JSON.parse(saved);
            this.updateGallery();
        }
    }
}

// Initialize photobooth
document.addEventListener('DOMContentLoaded', () => {
    new Photobooth();
});

