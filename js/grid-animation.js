// Animated Grid Background using p5.js
let gridSketch = function(p) {
    let gridSize = 50;
    let time = 0;
    
    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('grid-canvas');
        p.noFill();
    };
    
    p.draw = function() {
        p.clear();
        time += 0.005;
        
        // Very subtle grid for notebook aesthetic
        p.stroke(200, 200, 200, 5);
        p.strokeWeight(0.5);
        
        // Minimal grid dots
        for (let x = 0; x < p.width; x += gridSize * 2) {
            for (let y = 0; y < p.height; y += gridSize * 2) {
                let distance = p.dist(x, y, p.mouseX, p.mouseY);
                let alpha = p.map(distance, 0, 400, 15, 2);
                alpha = p.constrain(alpha, 2, 15);
                
                p.stroke(150, 150, 150, alpha);
                p.point(x, y);
            }
        }
    };
    
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

new p5(gridSketch);
