// About Page - Research Profile
class AboutPage {
    constructor() {
        this.init();
    }
    
    init() {
        this.createPhotoSketch();
        this.renderSkills();
        this.renderInspirations();
    }
    
    createPhotoSketch() {
        const sketch = function(p) {
            let time = 0;
            
            p.setup = function() {
                let canvas = p.createCanvas(300, 300);
                canvas.parent('photo-sketch');
                p.colorMode(p.HSB, 360, 100, 100);
            };
            
            p.draw = function() {
                p.clear();
                p.background(10, 10, 15);
                
                time = p.millis() * 0.001;
                
                let centerX = p.width / 2;
                let centerY = p.height / 2;
                
                // Create abstract portrait-like pattern
                // Face outline
                p.stroke(120, 80, 80);
                p.strokeWeight(3);
                p.noFill();
                p.ellipse(centerX, centerY, 200 + p.sin(time) * 10, 250 + p.cos(time) * 10);
                
                // Eyes
                let eyeY = centerY - 30;
                p.fill(180, 70, 90);
                p.noStroke();
                p.ellipse(centerX - 40, eyeY, 30 + p.sin(time * 2) * 5, 20);
                p.ellipse(centerX + 40, eyeY, 30 + p.sin(time * 2) * 5, 20);
                
                // Glowing nodes
                for (let i = 0; i < 8; i++) {
                    let angle = (p.TWO_PI / 8) * i + time;
                    let radius = 80;
                    let x = centerX + p.cos(angle) * radius;
                    let y = centerY + p.sin(angle) * radius;
                    
                    let hue = (i * 45 + time * 20) % 360;
                    p.fill(hue, 100, 100, 0.8);
                    p.noStroke();
                    p.ellipse(x, y, 15, 15);
                    
                    // Connect to center
                    p.stroke(hue, 50, 50, 0.3);
                    p.line(centerX, centerY, x, y);
                }
                
                // Central node
                p.fill(120, 100, 100);
                p.noStroke();
                p.ellipse(centerX, centerY, 20 + p.sin(time * 3) * 5, 20 + p.sin(time * 3) * 5);
            };
        };
        
        new p5(sketch);
    }
    
    renderSkills() {
        const skills = [
            { name: 'p5.js', level: 'Expert' },
            { name: 'JavaScript', level: 'Advanced' },
            { name: 'TouchDesigner', level: 'Intermediate' },
            { name: 'Arduino', level: 'Intermediate' },
            { name: 'Creative Coding', level: 'Expert' },
            { name: 'WebGL', level: 'Intermediate' },
            { name: 'Python', level: 'Advanced' },
            { name: 'Physical Computing', level: 'Intermediate' }
        ];
        
        const container = document.getElementById('skills-grid');
        container.innerHTML = '';
        
        skills.forEach(skill => {
            const node = document.createElement('div');
            node.className = 'skill-node';
            node.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level">${skill.level}</div>
            `;
            
            // Add glow effect on hover
            node.addEventListener('mouseenter', () => {
                node.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.5)';
            });
            
            node.addEventListener('mouseleave', () => {
                node.style.boxShadow = '';
            });
            
            container.appendChild(node);
        });
    }
    
    renderInspirations() {
        const inspirations = [
            'Generative Art',
            'Interactive Installations',
            'Data Visualization',
            'Sound Design',
            'Physical Computing',
            'Algorithmic Composition',
            'Real-time Systems',
            'Experimental Media',
            'Human-Computer Interaction',
            'Digital Fabrication'
        ];
        
        const container = document.getElementById('inspirations-list');
        container.innerHTML = '';
        
        inspirations.forEach(inspiration => {
            const item = document.createElement('div');
            item.className = 'inspiration-item';
            item.textContent = inspiration;
            container.appendChild(item);
        });
    }
}

// Initialize about page
document.addEventListener('DOMContentLoaded', () => {
    new AboutPage();
});

