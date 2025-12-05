// Handwritten Text Animation
class HandwrittenText {
    constructor() {
        this.fullText = `I'm Siaa Kashyap. I'm a sophomore in Design & Technology at Parsons, with a minor in Communication Design, and I've found myself drawn to the strange and exciting space between art and technology. My interests shift between creative tech, UI/UX, interactive media, and generative visuals, but the core is always the same: I love designing experiences that feel alive, responsive, and emotionally engaging.

Recently, I've been experimenting with tools that let me mix both physical and digital worlds—Arduino circuits, TouchDesigner patches, p5.js sketches, and the full Adobe Suite—along with small explorations in HTML/CSS to build custom interfaces. I treat my work like a lab: each project is an experiment, each idea gets tested, and each outcome teaches me something new.`;
        
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        const textElement = document.getElementById('handwritten-text');
        if (!textElement) return;
        
        // Reset for fresh start
        this.currentIndex = 0;
        textElement.textContent = '';
        this.typeText();
    }
    
    typeText() {
        const textElement = document.getElementById('handwritten-text');
        if (!textElement) return;
        
        if (this.currentIndex < this.fullText.length) {
            // Add character with slight randomness for handwritten feel
            const char = this.fullText[this.currentIndex];
            textElement.textContent += char;
            this.currentIndex++;
            
            // Variable typing speed for natural feel
            let delay = 30 + Math.random() * 40;
            
            // Slower for punctuation
            if (char === '.' || char === ',' || char === '—') {
                delay += 100;
            }
            
            // Pause for new paragraphs
            if (char === '\n') {
                delay += 200;
            }
            
            setTimeout(() => this.typeText(), delay);
        }
    }
}

// Initialize handwritten text
document.addEventListener('DOMContentLoaded', () => {
    // Clear any existing instance
    if (window.handwrittenTextInstance) {
        window.handwrittenTextInstance = null;
    }
    window.handwrittenTextInstance = new HandwrittenText();
});

