// Project Tiles with Drag and Drop
class ProjectTiles {
    constructor() {
        this.tiles = [];
        this.draggedTile = null;
        this.offset = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        // Your p5.js Projects
        this.projects = [
            {
                id: 1,
                title: 'think you can make it?',
                type: 'p5.js Game',
                description: 'A fast-paced narrative game about my daily rush from bed to Parsons',
                color: '#00ff88',
                iframe: 'https://editor.p5js.org/kashs015/full/w5feuM0h9',
                fullDescription: 'A fast-paced narrative game about my daily rush from bed to Parsons. I designed the scenes, obstacles, timing, and movement system to reflect the chaos of a real NYC morning. This piece taught me how to manage frame counts, collisions, and scene transitions in p5.js.',
                tech: ['p5.js', 'Game Design', 'Narrative']
            },
            {
                id: 2,
                title: 'Focus Clock',
                type: 'p5.js',
                description: 'An experimental focus timer inspired by mood, color, and rhythm',
                color: '#00d4ff',
                iframe: 'https://editor.p5js.org/kashs015/full/ewRBbnL6S',
                fullDescription: 'An experimental focus timer inspired by mood, color, and rhythm. Instead of a normal clock, the visuals shift as time passes, creating an ambient environment that encourages calm, sustained attention. This project explores generative visuals and time-based interaction.',
                tech: ['p5.js', 'Generative Art', 'Interaction Design']
            }
        ];
        
        this.renderTiles();
        this.setupDragAndDrop();
    }
    
    renderTiles() {
        const container = document.getElementById('projects-container');
        container.innerHTML = '';
        
        this.projects.forEach((project, index) => {
            const tile = document.createElement('div');
            tile.className = 'project-tile';
            tile.dataset.id = project.id;
            tile.style.position = 'absolute';
            
            // Random initial position
            const x = Math.random() * (window.innerWidth - 350);
            const y = 200 + Math.random() * 400;
            tile.style.left = x + 'px';
            tile.style.top = y + 'px';
            
            tile.innerHTML = `
                <div class="project-tile-header">
                    <div class="project-tile-title">${project.title}</div>
                    <div class="project-tile-type">${project.type}</div>
                </div>
                <div class="project-tile-canvas" id="canvas-${project.id}">
                    ${project.image ? `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">` : ''}
                </div>
                <div class="project-tile-description">${project.description}</div>
            `;
            
            container.appendChild(tile);
            this.tiles.push(tile);
            
            // Create p5.js sketch only if no image
            if (!project.image) {
                this.createTileSketch(project.id, project.color);
            }
        });
    }
    
    createTileSketch(id, color) {
        const sketch = function(p) {
            p.setup = function() {
                let canvas = p.createCanvas(280, 150);
                canvas.parent(`canvas-${id}`);
                p.noFill();
            };
            
            p.draw = function() {
                p.clear();
                p.background(10, 10, 15);
                
                let time = p.millis() * 0.001;
                
                // Animated pattern
                p.stroke(color);
                p.strokeWeight(2);
                
                for (let i = 0; i < 20; i++) {
                    let x = p.map(p.sin(time + i * 0.5), -1, 1, 0, p.width);
                    let y = p.map(p.cos(time + i * 0.3), -1, 1, 0, p.height);
                    
                    p.fill(color, 50);
                    p.noStroke();
                    p.ellipse(x, y, 10, 10);
                    
                    p.stroke(color, 100);
                    p.noFill();
                    p.ellipse(x, y, 20 + p.sin(time * 2 + i) * 10, 20 + p.sin(time * 2 + i) * 10);
                }
                
                // Draw connecting lines
                p.stroke(color, 30);
                for (let i = 0; i < 10; i++) {
                    let x1 = p.map(p.sin(time + i), -1, 1, 0, p.width);
                    let y1 = p.map(p.cos(time + i), -1, 1, 0, p.height);
                    let x2 = p.map(p.sin(time + i + 1), -1, 1, 0, p.width);
                    let y2 = p.map(p.cos(time + i + 1), -1, 1, 0, p.height);
                    p.line(x1, y1, x2, y2);
                }
            };
        };
        
        new p5(sketch);
    }
    
    setupDragAndDrop() {
        this.tiles.forEach(tile => {
            tile.addEventListener('mousedown', (e) => this.startDrag(e, tile));
            tile.addEventListener('click', (e) => {
                if (!this.isDragging) {
                    this.openProject(tile);
                }
            });
        });
        
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDrag());
    }
    
    startDrag(e, tile) {
        this.draggedTile = tile;
        this.isDragging = false;
        const rect = tile.getBoundingClientRect();
        this.offset.x = e.clientX - rect.left;
        this.offset.y = e.clientY - rect.top;
        tile.classList.add('dragging');
        e.preventDefault();
    }
    
    drag(e) {
        if (this.draggedTile) {
            this.isDragging = true;
            const x = e.clientX - this.offset.x;
            const y = e.clientY - this.offset.y;
            
            this.draggedTile.style.left = x + 'px';
            this.draggedTile.style.top = y + 'px';
            this.draggedTile.style.position = 'absolute';
        }
    }
    
    stopDrag() {
        if (this.draggedTile) {
            this.draggedTile.classList.remove('dragging');
            setTimeout(() => {
                this.isDragging = false;
            }, 100);
        }
        this.draggedTile = null;
    }
    
    openProject(tile) {
        const projectId = parseInt(tile.dataset.id);
        const project = this.projects.find(p => p.id === projectId);
        
        if (project) {
            const modal = document.getElementById('project-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');
            
            modalTitle.textContent = project.title;
            
            const techTags = project.tech ? `
                <div class="tech-tags">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            ` : '';
            
            const description = project.fullDescription || project.description;
            
            // Build iframe or image content
            let projectContent = '';
            if (project.iframe) {
                projectContent = `
                    <div class="project-iframe-container">
                        <iframe src="${project.iframe}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
            } else if (project.image) {
                projectContent = `
                    <div class="detail-canvas" id="detail-canvas-${project.id}">
                        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;">
                    </div>
                `;
            } else {
                projectContent = `<div class="detail-canvas" id="detail-canvas-${project.id}"></div>`;
            }
            
            modalBody.innerHTML = `
                <div class="project-detail">
                    <div class="detail-section">
                        <h3>Type: ${project.type}</h3>
                        <p>${description}</p>
                        ${techTags}
                        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>` : ''}
                    </div>
                    ${projectContent}
                </div>
            `;
            
            modal.classList.add('active');
            
            // Create expanded canvas only if no iframe and no image
            if (!project.iframe && !project.image) {
                setTimeout(() => {
                    this.createDetailSketch(project.id, project.color);
                }, 100);
            }
        }
    }
    
    createDetailSketch(id, color) {
        const sketch = function(p) {
            p.setup = function() {
                let canvas = p.createCanvas(800, 400);
                canvas.parent(`detail-canvas-${id}`);
                p.noFill();
            };
            
            p.draw = function() {
                p.clear();
                p.background(10, 10, 15);
                
                let time = p.millis() * 0.001;
                
                // More complex pattern for detail view
                p.stroke(color);
                p.strokeWeight(3);
                
                for (let i = 0; i < 50; i++) {
                    let angle = (p.TWO_PI / 50) * i + time;
                    let radius = 100 + p.sin(time * 2 + i * 0.1) * 50;
                    let x = p.width / 2 + p.cos(angle) * radius;
                    let y = p.height / 2 + p.sin(angle) * radius;
                    
                    p.fill(color, 80);
                    p.noStroke();
                    p.ellipse(x, y, 15, 15);
                    
                    // Connect to center
                    p.stroke(color, 50);
                    p.line(p.width / 2, p.height / 2, x, y);
                }
                
                // Central node
                p.fill(color);
                p.noStroke();
                p.ellipse(p.width / 2, p.height / 2, 30, 30);
            };
        };
        
        new p5(sketch);
    }
}

// Initialize project tiles
document.addEventListener('DOMContentLoaded', () => {
    new ProjectTiles();
});
