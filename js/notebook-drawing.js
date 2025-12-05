// Interactive Notebook Drawing Tool
class NotebookDrawing {
    constructor() {
        this.isDrawing = false;
        this.canvas = null;
        this.ctx = null;
        this.currentPath = [];
        this.paths = [];
        this.init();
    }
    
    init() {
        // Create drawing canvas
        const container = document.querySelector('.lab-main');
        const canvas = document.createElement('canvas');
        canvas.id = 'notebook-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'auto';
        canvas.style.zIndex = '3'; // Below sticky notes (z-index 20)
        canvas.style.cursor = 'crosshair';
        container.appendChild(canvas);
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        
        // Set drawing style
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Drawing events
        canvas.addEventListener('mousedown', (e) => {
            // Don't draw if clicking on elements above canvas
            const elementsAbove = document.elementsFromPoint(e.clientX, e.clientY);
            const hasInteractiveElement = elementsAbove.some(el => 
                el.classList.contains('postit-note') || 
                el.closest('.postit-note') ||
                el.closest('.drawing-tool') ||
                el.closest('nav')
            );
            
            if (!hasInteractiveElement) {
                this.startDrawing(e);
            }
        });
        canvas.addEventListener('mousemove', (e) => this.draw(e));
        canvas.addEventListener('mouseup', () => this.stopDrawing());
        canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            canvas.dispatchEvent(mouseEvent);
        });
        
        window.addEventListener('resize', () => this.resize());
        
        // Clear button
        const clearBtn = document.getElementById('clear-drawing');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Clear all notes?')) {
                    this.clear();
                }
            });
        }
        
        // Load saved drawings
        this.loadDrawings();
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.redraw();
    }
    
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    
    startDrawing(e) {
        // Don't draw if clicking on sticky notes or other interactive elements
        const target = e.target;
        if (target.closest('.postit-note') || target.closest('.floating-buttons') || 
            target.closest('.drawing-tool') || target.closest('nav')) {
            return;
        }
        
        this.isDrawing = true;
        const pos = this.getMousePos(e);
        this.currentPath = [pos];
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
    }
    
    draw(e) {
        if (!this.isDrawing) return;
        
        const pos = this.getMousePos(e);
        this.currentPath.push(pos);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
    }
    
    stopDrawing() {
        if (this.isDrawing && this.currentPath.length > 0) {
            this.paths.push([...this.currentPath]);
            this.saveDrawings();
        }
        this.isDrawing = false;
        this.currentPath = [];
    }
    
    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.paths.forEach(path => {
            if (path.length > 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(path[0].x, path[0].y);
                for (let i = 1; i < path.length; i++) {
                    this.ctx.lineTo(path[i].x, path[i].y);
                }
                this.ctx.stroke();
            }
        });
    }
    
    clear() {
        this.paths = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.saveDrawings();
    }
    
    saveDrawings() {
        try {
            localStorage.setItem('notebook-drawings', JSON.stringify(this.paths));
        } catch (e) {
            console.log('Could not save drawings');
        }
    }
    
    loadDrawings() {
        try {
            const saved = localStorage.getItem('notebook-drawings');
            if (saved) {
                this.paths = JSON.parse(saved);
                this.redraw();
            }
        } catch (e) {
            console.log('Could not load drawings');
        }
    }
}

// Initialize drawing tool
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on homepage
    const isHomepage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') ||
                      !window.location.pathname.includes('.html');
    
    if (isHomepage) {
        window.notebookDrawing = new NotebookDrawing();
    }
});

