// Links & Resume Page
class LinksPage {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupDownloadButton();
        this.setupWindowControls();
    }
    
    setupDownloadButton() {
        const downloadBtn = document.getElementById('download-resume');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                // Create a simple PDF-like document or link to actual PDF
                // For now, we'll create a downloadable text file
                this.downloadResume();
            });
        }
    }
    
    downloadResume() {
        // Link to actual Resume.pdf file
        const link = document.createElement('a');
        link.href = 'Resume final 2025.pdf';
        link.download = 'Resume final 2025.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    setupWindowControls() {
        const closeBtn = document.querySelector('.window-control.close');
        const minimizeBtn = document.querySelector('.window-control.minimize');
        const maximizeBtn = document.querySelector('.window-control.maximize');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                // Animate window close
                const window = document.querySelector('.file-window');
                window.style.transform = 'scale(0.8)';
                window.style.opacity = '0';
                setTimeout(() => {
                    window.style.display = 'none';
                }, 300);
            });
        }
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                const windowBody = document.querySelector('.window-body');
                if (windowBody.style.display === 'none') {
                    windowBody.style.display = 'block';
                } else {
                    windowBody.style.display = 'none';
                }
            });
        }
        
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => {
                const window = document.querySelector('.file-window');
                if (window.style.maxWidth === '100%') {
                    window.style.maxWidth = '900px';
                } else {
                    window.style.maxWidth = '100%';
                }
            });
        }
    }
}

// Initialize links page
document.addEventListener('DOMContentLoaded', () => {
    new LinksPage();
});

