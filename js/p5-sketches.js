// Other p5 Sketches Page
document.addEventListener('DOMContentLoaded', () => {
    const sketches = [
        {
            title: 'Cypress, Texas',
            link: 'https://editor.p5js.org/kashs015/full/nzpA86czJ',
            description: 'A motion-based sketch inspired by shifting landscapes.'
        },
        {
            title: 'Face Generator',
            link: 'https://editor.p5js.org/kashs015/full/WAygfGzbc',
            description: 'A playful generative system that creates abstract faces.'
        },
        {
            title: 'Optical Illusion Study',
            link: 'https://editor.p5js.org/kashs015/full/GXLUd8pyL',
            description: 'An animation exploring color-based optical illusions.'
        },
        {
            title: 'Water Tracker',
            link: 'https://editor.p5js.org/kashs015/full/pEkNYDGRI',
            description: 'A visualization experimenting with tracking water flow through animated shapes.'
        }
    ];
    
    const container = document.getElementById('sketches-container');
    
    sketches.forEach(sketch => {
        const card = document.createElement('div');
        card.className = 'sketch-card';
        
        card.innerHTML = `
            <div class="sketch-title">${sketch.title}</div>
            <a href="${sketch.link}" target="_blank" class="sketch-link">View Sketch</a>
        `;
        
        container.appendChild(card);
    });
});

