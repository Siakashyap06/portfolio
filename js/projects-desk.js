// Projects Desk with Enhanced Interactivity
class ProjectsDesk {
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
            },
            {
                id: 3,
                title: 'Can you remember',
                type: 'Arduino Game',
                description: 'A fun game made with Arduino where a random sequence is generated and each round a new element is added. Challenge yourself to see how many can you remember.',
                color: '#ff6b6b',
                video: 'Can you remember(memory game).mov',
                fullDescription: 'A fun game made with Arduino where a random sequence is generated and each round a new element is added. Challenge yourself to see how many can you remember. This project combines hardware programming with game design, creating an interactive memory challenge that tests your ability to recall increasingly complex patterns.',
                tech: ['Arduino', 'Hardware', 'Game Design', 'Embedded Systems']
            },
            {
                id: 4,
                title: 'Yin Yang',
                type: 'Illustrator Design',
                description: 'I experimented with Illustrator using the Pen Tool and the color wheel to explore balance and contrast.',
                color: '#9b59b6',
                image: 'Screenshot 2025-08-26 at 11.40.10 PM.png',
                fullDescription: 'I experimented with Illustrator using the Pen Tool and the color wheel to explore balance and contrast. I created layered geometric shapes in complementary and split-complementary color schemes to reflect harmony and opposition. The first composition uses bright, warm hues with cool accents to convey lightness and energy, while the second relies on darker, muted tones for depth and calmness. Hand-drawn floral outlines add an organic layer against the geometric background, merging softness with structure. Together, these contrasting compositions represent the yin–yang duality of vibrancy and stillness within visual design.',
                tech: ['Adobe Illustrator', 'Graphic Design', 'Color Theory', 'Pen Tool']
            },
            {
                id: 5,
                title: 'hot or iced ?',
                type: 'TouchDesigner Interactive',
                description: 'A hand-controlled TouchDesigner animation where viewers can "play" between Hot and Iced coffee moods using simple hand gestures.',
                color: '#ff8c42',
                video: 'ScreenRecording_12-01-2025 21-58-01_1.mov',
                fullDescription: 'This projection showcases my hand-controlled TouchDesigner animation, where viewers can "play" between Hot and Iced coffee moods using simple hand gestures. As you move your hand, the system switches between two dynamic visual worlds—warm swirling steam textures for hot coffee and crisp, icy particle animations for cold coffee. The interaction feels playful and responsive, turning a simple choice into a sensory experience. The project explores how intuitive gesture control can transform everyday decisions into immersive visual storytelling.',
                tech: ['TouchDesigner', 'Interactive Media', 'Gesture Control', 'Visual Storytelling']
            },
            {
                id: 6,
                title: 'Coffee: A Generative Animation',
                type: 'TouchDesigner Animation',
                description: 'A small animation created on TouchDesigner using different TOP and CHOP functions, which moves when a key is pressed.',
                color: '#8B4513',
                video: 'assignment1.mov',
                fullDescription: 'This is a small animation created on TouchDesigner using different TOP and CHOP functions, which moves when a key is pressed. The project explores generative animation techniques through interactive keyboard control, demonstrating how simple inputs can drive complex visual transformations.',
                tech: ['TouchDesigner', 'Generative Animation', 'TOP', 'CHOP', 'Interactive']
            },
            {
                id: 7,
                title: 'Interactive TouchDesigner Animation',
                type: 'TouchDesigner Interactive',
                description: 'This is a grid based mouse controlled animation made on TouchDesigner.',
                color: '#4a90e2',
                video: 'Screen Recording 2025-10-29 at 12.58.08 AM.mov',
                fullDescription: 'This is a grid based mouse controlled animation made on TouchDesigner. The project explores interactive visual systems where mouse movement controls the grid-based animation, creating a responsive and engaging user experience.',
                tech: ['TouchDesigner', 'Interactive Media', 'Grid Animation', 'Mouse Control']
            },
            {
                id: 8,
                title: 'City of Dreams',
                type: 'Photoshop Collage',
                description: 'A surreal "City of Dreams" built by layering and composing architectural blocks, cultural motifs, and symbolic elements.',
                color: '#9b59b6',
                image: 'Screenshot 2025-08-26 at 11.48.05 PM.png',
                fullDescription: 'For this project, I used Adobe Photoshop to build a surreal "City of Dreams" by layering and composing architectural blocks, cultural motifs, and symbolic elements. The collage combines patterned arches, traditional Indian fabrics, elephants, and a classical dancer within a fantastical night setting under the moon. By juxtaposing real textures with imagined structures, I aimed to blur the line between memory and imagination. Each building block carries cultural resonance while contributing to a whimsical dreamscape. The work reflects how cities are not only physical spaces but also layered narratives of heritage, aspiration, and personal vision.',
                tech: ['Adobe Photoshop', 'Digital Collage', 'Surrealism', 'Cultural Art']
            },
            {
                id: 9,
                title: 'THE LAST WORD REFLECTION',
                type: 'Digital Art Triptych',
                description: 'A triptych capturing a journey through time and identity, exploring past, roots, and future.',
                color: '#6c5ce7',
                image: 'Screenshot 2025-08-27 at 12.01.50 AM (1).png',
                fullDescription: 'This triptych captures a journey through time and identity. In the first panel, I revisit my past—monochromatic and distant—where my younger self lingers like a fading shadow. The central piece anchors me to what never fades: my parents and Indian roots, ever-present and deeply woven into who I am. The final panel shows me walking into a radiant, uncertain future, full of color and possibility, yet undefined. The work uses varying artistic styles and color palettes to visually represent the narrative of a journey through time and identity.',
                tech: ['Digital Art', 'Triptych', 'Identity', 'Narrative Art']
            }
        ];
        
        this.renderTiles();
        this.setupDragAndDrop();
    }
    
    renderTiles() {
        const container = document.getElementById('desk-container');
        container.innerHTML = '';
        
        this.projects.forEach((project, index) => {
            const tile = document.createElement('div');
            tile.className = 'project-tile';
            tile.dataset.id = project.id;
            
            // Grid layout that keeps all tiles visible
            const tilesPerRow = 3;
            const tileWidth = 280;
            const tileSpacing = 50;
            const rowHeight = 350;
            const startX = 100;
            const startY = 150;
            
            const col = index % tilesPerRow;
            const row = Math.floor(index / tilesPerRow);
            
            // Calculate position with some random offset for notebook feel
            const x = startX + col * (tileWidth + tileSpacing) + Math.random() * 30;
            const y = startY + row * rowHeight + Math.random() * 40;
            
            tile.style.left = x + 'px';
            tile.style.top = y + 'px';
            tile.style.width = '280px';
            tile.style.height = 'auto';
            tile.style.minHeight = '200px';
            
            tile.innerHTML = `
                <div class="project-tile-header">
                    <div class="project-tile-title" style="font-family: 'Kalam', cursive; font-size: 1.4rem; color: #333; margin-bottom: 0.5rem; font-weight: bold;">${project.title}</div>
                    <div class="project-tile-type" style="font-family: 'Kalam', cursive; font-size: 0.85rem; color: #666; background: rgba(0,0,0,0.05); padding: 0.3rem 0.6rem; border-radius: 4px; display: inline-block;">${project.type}</div>
                </div>
                <div class="project-tile-canvas" id="canvas-${project.id}" style="margin: 1rem 0; width: 100%; height: 150px; border-radius: 4px; overflow: hidden; position: relative;">
                    ${project.image ? `<img src="${encodeURI(project.image)}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">` : ''}
                    ${project.video ? `<video style="width: 100%; height: 100%; object-fit: cover;" muted preload="metadata"><source src="${encodeURI(project.video)}" type="video/quicktime"><source src="${encodeURI(project.video)}" type="video/mp4"></video><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; pointer-events: none;"><span style="color: white; font-size: 1.5rem; margin-left: 3px;">▶</span></div>` : ''}
                </div>
                <div class="project-tile-description" style="font-family: 'Kalam', cursive; font-size: 0.95rem; color: #555; line-height: 1.6;">${project.description}</div>
            `;
            
            container.appendChild(tile);
            this.tiles.push(tile);
            
            // Create p5.js sketch only if no image and no video is provided
            if (!project.image && !project.video) {
                this.createTileSketch(project.id, project.color);
            }
            
            // Ensure image loads properly and is visible
            if (project.image) {
                const canvasDiv = tile.querySelector(`#canvas-${project.id}`);
                const img = tile.querySelector('img');
                if (img && canvasDiv) {
                    // Clear any p5.js canvas that might have been created
                    const p5Canvas = canvasDiv.querySelector('canvas');
                    if (p5Canvas) {
                        p5Canvas.remove();
                    }
                    // Ensure image is visible
                    img.style.display = 'block';
                    img.style.visibility = 'visible';
                    img.style.opacity = '1';
                    img.onload = () => {
                        img.style.display = 'block';
                        img.style.visibility = 'visible';
                    };
                    img.onerror = () => {
                        console.error('Failed to load image:', project.image);
                        console.error('Trying path:', encodeURI(project.image));
                    };
                }
            }
            
            // Auto-play video on hover if video exists
            if (project.video) {
                const video = tile.querySelector('video');
                if (video) {
                    video.onerror = (e) => {
                        console.error('Video load error:', project.video, e);
                        console.error('Video path:', encodeURI(project.video));
                    };
                    video.onloadedmetadata = () => {
                        console.log('Video loaded successfully:', project.video);
                    };
                    tile.addEventListener('mouseenter', () => {
                        video.play().catch((err) => {
                            console.error('Video play error:', err);
                        });
                    });
                    tile.addEventListener('mouseleave', () => {
                        video.pause();
                        video.currentTime = 0;
                    });
                }
            }
        });
        
        // Calculate container height based on project positions (after a short delay for rendering)
        setTimeout(() => {
            this.updateContainerHeight();
        }, 100);
    }
    
    updateContainerHeight() {
        const container = document.getElementById('desk-container');
        if (!container || this.tiles.length === 0) return;
        
        let maxBottom = 0;
        this.tiles.forEach(tile => {
            const top = parseFloat(tile.style.top) || 0;
            const height = tile.offsetHeight || 200;
            const bottom = top + height;
            if (bottom > maxBottom) {
                maxBottom = bottom;
            }
        });
        
        // Set minimum height to accommodate all projects with padding
        container.style.minHeight = Math.max(maxBottom + 300, 800) + 'px';
    }
    
    createTileSketch(id, color) {
        const sketch = function(p) {
            let time = 0;
            
            p.setup = function() {
                let canvas = p.createCanvas(280, 150);
                canvas.parent(`canvas-${id}`);
                p.noFill();
            };
            
            p.draw = function() {
                p.clear();
                p.background(245, 245, 220); // Notebook background
                
                time = p.millis() * 0.001;
                
                // Subtle notebook-style sketch
                p.stroke(100, 100, 100, 50);
                p.strokeWeight(1);
                
                // Simple flowing lines
                for (let i = 0; i < 20; i++) {
                    let angle = (p.TWO_PI / 20) * i + time * 0.5;
                    let radius = 30 + p.sin(time + i * 0.3) * 15;
                    let x = p.width / 2 + p.cos(angle) * radius;
                    let y = p.height / 2 + p.sin(angle) * radius;
                    
                    // Simple dots
                    p.fill(150, 150, 150, 80);
                    p.noStroke();
                    p.ellipse(x, y, 4, 4);
                    
                    // Connect to center
                    p.stroke(150, 150, 150, 30);
                    p.line(p.width / 2, p.height / 2, x, y);
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
        const container = document.getElementById('desk-container');
        const containerRect = container.getBoundingClientRect();
        this.offset.x = e.clientX - rect.left;
        this.offset.y = e.clientY - rect.top;
        tile.classList.add('dragging');
        e.preventDefault();
    }
    
    drag(e) {
        if (this.draggedTile) {
            this.isDragging = true;
            const container = document.getElementById('desk-container');
            const containerRect = container.getBoundingClientRect();
            const x = e.clientX - containerRect.left - this.offset.x;
            const y = e.clientY - containerRect.top - this.offset.y;
            
            this.draggedTile.style.left = Math.max(0, Math.min(x, containerRect.width - 300)) + 'px';
            this.draggedTile.style.top = Math.max(0, y) + 'px'; // Allow vertical scrolling beyond container
            
            // Update container height after drag
            setTimeout(() => this.updateContainerHeight(), 100);
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
            
            // Build tech tags if available
            const techTags = project.tech ? `
                <div class="tech-tags">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            ` : '';
            
            // Use full description if available, otherwise use short description
            const description = project.fullDescription || project.description;
            
            // Build iframe, video, or image content
            let projectContent = '';
            if (project.iframe) {
                projectContent = `
                    <div class="project-iframe-container">
                        <iframe src="${project.iframe}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
            } else if (project.video) {
                projectContent = `
                    <div class="detail-canvas" id="detail-canvas-${project.id}" style="display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.05);">
                        <video controls preload="metadata" style="width: 100%; height: 100%; max-height: 600px; border-radius: 4px; object-fit: contain;">
                            <source src="${encodeURI(project.video)}" type="video/quicktime">
                            <source src="${encodeURI(project.video)}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
            } else if (project.image) {
                projectContent = `
                    <div class="detail-canvas" id="detail-canvas-${project.id}" style="display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.05);">
                        <img src="${encodeURI(project.image)}" alt="${project.title}" style="width: 100%; height: 100%; max-height: 600px; border-radius: 4px; object-fit: contain;">
                    </div>
                `;
            } else {
                projectContent = `<div class="detail-canvas" id="detail-canvas-${project.id}"></div>`;
            }
            
            modalBody.innerHTML = `
                <div class="project-detail">
                    <div class="detail-section">
                        <h3 style="font-family: 'Kalam', cursive;">Type: ${project.type}</h3>
                        <p style="font-family: 'Kalam', cursive;">${description}</p>
                        ${techTags}
                        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link" style="font-family: 'Kalam', cursive;">View Project →</a>` : ''}
                    </div>
                    ${projectContent}
                </div>
            `;
            
            modal.classList.add('active');
            
            // Add error handling for video in modal
            if (project.video) {
                setTimeout(() => {
                    const modalVideo = modalBody.querySelector('video');
                    if (modalVideo) {
                        modalVideo.onerror = (e) => {
                            console.error('Modal video load error:', project.video, e);
                            console.error('Video path:', encodeURI(project.video));
                        };
                        modalVideo.onloadedmetadata = () => {
                            console.log('Modal video loaded successfully:', project.video);
                        };
                    }
                }, 100);
            }
            
            // Create expanded canvas with controls only if no iframe, no video, and no image
            if (!project.iframe && !project.video && !project.image) {
                setTimeout(() => {
                    this.createDetailSketch(project.id, project.color);
                    this.setupControls(project.id);
                }, 100);
            }
        }
    }
    
    createDetailSketch(id, color) {
        const sketch = function(p) {
            let time = 0;
            
            p.setup = function() {
                let canvas = p.createCanvas(800, 400);
                canvas.parent(`detail-canvas-${id}`);
            };
            
            p.draw = function() {
                p.clear();
                p.background(245, 245, 220); // Notebook background
                
                time = p.millis() * 0.001;
                
                // Simple notebook-style sketch
                let centerX = p.width / 2;
                let centerY = p.height / 2;
                
                // Subtle flowing lines
                for (let i = 0; i < 30; i++) {
                    let angle = (p.TWO_PI / 30) * i + time * 0.3;
                    let radius = 60 + p.sin(time + i * 0.2) * 30;
                    let x = centerX + p.cos(angle) * radius;
                    let y = centerY + p.sin(angle) * radius;
                    
                    // Simple dots
                    p.fill(150, 150, 150, 100);
                    p.noStroke();
                    p.ellipse(x, y, 5, 5);
                    
                    // Connect to center
                    p.stroke(150, 150, 150, 40);
                    p.line(centerX, centerY, x, y);
                }
            };
        };
        
        new p5(sketch);
    }
    
    setupControls(projectId) {
        // Controls removed for notebook aesthetic
    }
}

// Initialize projects desk
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsDesk();
});

