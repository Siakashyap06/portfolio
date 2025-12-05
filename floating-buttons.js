// Post-it Note Navigation Buttons
class FloatingButtons {
    constructor() {
        this.buttons = [];
        this.draggedButton = null;
        this.offset = { x: 0, y: 0 };
        this.hasDragged = false;
        this.startPos = { x: 0, y: 0 };
        this.initialized = false;
        this.init();
    }
    
    init() {
        // Check if we're on the homepage
        const isHomepage = window.location.pathname.endsWith('index.html') || 
                          window.location.pathname.endsWith('/') ||
                          !window.location.pathname.includes('.html');
        
        // Only create buttons on homepage
        if (!isHomepage) return;
        
        this.initialized = true;
        
        const buttons = [
            {
                id: 'photobooth',
                label: 'Photobooth',
                link: 'photobooth.html',
                color: '#00d2d3', // Cyan post-it
                rotation: -1
            },
            {
                id: 'linkedin',
                label: 'LinkedIn',
                link: 'https://www.linkedin.com/in/siaa-kashyap-919708320',
                color: '#ff9ff3', // Pink post-it
                external: true,
                rotation: 2
            },
            {
                id: 'resume',
                label: 'Resume',
                link: 'Resume final 2025.pdf',
                color: '#5f27cd', // Purple post-it
                rotation: 1,
                external: true
            },
            {
                id: 'projects',
                label: 'Projects',
                link: 'projects.html',
                color: '#54a0ff', // Blue post-it
                rotation: -2
            }
        ];
        
        // Add Home button if not on homepage
        if (!isHomepage) {
            buttons.unshift({
                id: 'home',
                label: 'Home',
                link: 'index.html',
                color: '#ff6b6b', // Red post-it
                rotation: 1
            });
        }
        
        // Make buttons bigger on homepage
        if (isHomepage) {
            buttons.forEach(btn => {
                btn.isBig = true;
            });
        }
        
        this.createButtons(buttons, isHomepage);
    }
    
    createButtons(buttonsData, isHomepage = false) {
        const container = document.getElementById('floating-buttons');
        if (!container) {
            console.error('Floating buttons container not found');
            return;
        }
        container.innerHTML = '';
        
        buttonsData.forEach((btn, index) => {
            const button = document.createElement('div');
            button.className = 'postit-note';
            button.dataset.id = btn.id;
            
            // Position sticky notes on the right side
            let x, y;
            if (isHomepage && btn.isBig) {
                // Big sticky notes on the right side of homepage
                const startX = window.innerWidth - 600; // Right side
                const startY = 300; // Below title
                const spacing = 220;
                x = startX + (index % 2) * spacing;
                y = startY + Math.floor(index / 2) * 220 + Math.random() * 30;
            } else {
                // Regular scattered positions for other pages
                x = 100 + (index * 150) + Math.random() * 100;
                y = 150 + (index % 2) * 200 + Math.random() * 100;
            }
            
            button.style.left = x + 'px';
            button.style.top = y + 'px';
            button.style.setProperty('--note-color', btn.color);
            button.style.setProperty('--rotation', btn.rotation + 'deg');
            button.style.transform = `rotate(${btn.rotation}deg)`;
            
            // Make them bigger on homepage
            if (btn.isBig) {
                button.classList.add('big-postit');
            }
            
            button.innerHTML = `
                <div class="postit-content">
                    <span class="postit-label">${btn.label}</span>
                </div>
            `;
            
            // Store button data for navigation
            button.dataset.link = btn.link;
            button.dataset.external = btn.external ? 'true' : 'false';
            
            // Add mousedown listener to start drag
            button.addEventListener('mousedown', (e) => {
                this.startDrag(e, button);
            });
            
            // Click handler - navigate
            button.addEventListener('click', (e) => {
                // Only navigate if it wasn't dragged
                if (button.dataset.wasDragged !== 'true') {
                    const link = button.dataset.link;
                    const isExternal = button.dataset.external === 'true';
                    
                    if (link) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Animate note disappearing
                        button.style.transition = 'all 0.3s ease';
                        button.style.opacity = '0';
                        const rotation = button.style.getPropertyValue('--rotation') || '0deg';
                        button.style.transform = `rotate(${rotation}) scale(0.5)`;
                        
                        setTimeout(() => {
                            if (isExternal) {
                                window.open(link, '_blank');
                            } else {
                                window.location.href = link;
                            }
                        }, 300);
                    }
                }
            });
            
            container.appendChild(button);
            this.buttons.push({
                element: button,
                x: x,
                y: y,
                rotation: btn.rotation,
                link: btn.link,
                external: btn.external || false
            });
        });
        
        // Global mouse events for dragging
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDrag());
    }
    
    startDrag(e, button) {
        this.draggedButton = button;
        this.hasDragged = false;
        this.startPos.x = e.clientX;
        this.startPos.y = e.clientY;
        const rect = button.getBoundingClientRect();
        this.offset.x = e.clientX - rect.left;
        this.offset.y = e.clientY - rect.top;
        button.classList.add('dragging');
        button.style.zIndex = '1000';
        // Don't prevent default here - let click work
    }
    
    drag(e) {
        if (this.draggedButton) {
            // Check if mouse moved significantly (dragged vs clicked)
            const moveDistance = Math.sqrt(
                Math.pow(e.clientX - this.startPos.x, 2) + 
                Math.pow(e.clientY - this.startPos.y, 2)
            );
            
            if (moveDistance > 5) {
                this.hasDragged = true;
                // Mark that this button was dragged, not clicked
                this.draggedButton.dataset.wasDragged = 'true';
            }
            
            const x = e.clientX - this.offset.x;
            const y = e.clientY - this.offset.y;
            
            // Keep within bounds (account for bigger post-its)
            const isBig = this.draggedButton.classList.contains('big-postit');
            const width = isBig ? 200 : 140;
            const height = isBig ? 200 : 140;
            const maxX = window.innerWidth - width;
            const maxY = window.innerHeight - height;
            
            this.draggedButton.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
            this.draggedButton.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
        }
    }
    
    stopDrag() {
        if (this.draggedButton) {
            const button = this.draggedButton;
            const wasDragged = button.dataset.wasDragged === 'true';
            
            button.classList.remove('dragging');
            button.style.zIndex = '';
            
            // If it wasn't dragged, it was a click - navigate immediately
            if (!wasDragged) {
                const link = button.dataset.link;
                const isExternal = button.dataset.external === 'true';
                
                if (link) {
                    // Animate note disappearing
                    button.style.transition = 'all 0.3s ease';
                    button.style.opacity = '0';
                    const rotation = button.style.getPropertyValue('--rotation') || '0deg';
                    button.style.transform = `rotate(${rotation}) scale(0.5)`;
                    
                    setTimeout(() => {
                        if (isExternal) {
                            window.open(link, '_blank');
                        } else {
                            window.location.href = link;
                        }
                    }, 300);
                }
            }
            
            // Clean up
            delete button.dataset.wasDragged;
            
            // Reset after a short delay
            setTimeout(() => {
                this.hasDragged = false;
                this.draggedButton = null;
            }, 50);
        }
    }
}

// Initialize floating buttons
function initFloatingButtons() {
    const container = document.getElementById('floating-buttons');
    if (!container) {
        // Retry if container not ready yet
        setTimeout(initFloatingButtons, 100);
        return;
    }
    
    // Check if we're on homepage
    const isHomepage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') ||
                      !window.location.pathname.includes('.html');
    
    if (!isHomepage) return;
    
    // Always recreate buttons on homepage (in case they were removed/faded)
    // Clear container first
    container.innerHTML = '';
    new FloatingButtons();
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingButtons);
} else {
    // DOM already loaded
    initFloatingButtons();
}

// Also initialize on pageshow (for back/forward navigation)
window.addEventListener('pageshow', (e) => {
    // Reinitialize if buttons are missing
    initFloatingButtons();
});
