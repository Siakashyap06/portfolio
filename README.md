# Digital Lab Notebook Portfolio

A playful, tech-driven portfolio website designed as an interactive Digital Lab Notebook. Everything works **standalone** - just open `index.html` in your browser!

## 🚀 How to Use

**No server needed!** Simply:
1. Open `index.html` in any web browser
2. That's it! Everything works locally

Or double-click `index.html` in Finder to open it.

## 📁 File Structure

```
final portfolio/
├── index.html          # Homepage
├── projects.html       # Projects page
├── about.html          # About page
├── photobooth.html     # Photobooth page
├── links.html          # Links & Resume page
├── styles.css          # Main styles
├── projects.css        # Projects page styles
├── about.css           # About page styles
├── photobooth.css      # Photobooth page styles
├── links.css           # Links page styles
├── Resume.pdf          # Your resume
├── images/             # Put your project images here
└── js/
    ├── grid-animation.js    # Animated grid background
    ├── cursor-trail.js      # Circuit trail cursor effect
    ├── project-tiles.js     # Homepage project tiles
    ├── projects-desk.js     # Projects page functionality
    ├── about.js             # About page functionality
    ├── photobooth.js        # Photobooth functionality
    ├── links.js             # Links page functionality
    └── main.js              # Main utilities
```

## ✨ Features

### Homepage
- Animated glowing grid that responds to mouse
- Draggable project tiles that jiggle
- Circuit trail cursor effects
- Live p5.js sketches on each tile
- Glitch text animations

### Projects Page
- Interactive desk workspace
- Drag and rearrange projects
- Click to expand with details

### About Page
- Research profile style
- Blueprint frames
- Glowing skill nodes
- Abstract p5.js portrait

### Photobooth Page
- Interactive webcam filters
- Link to your GitHub photobooth
- Real-time effects and controls

### Links & Resume Page
- Your actual LinkedIn profile
- Download your Resume.pdf
- Contact information

## 🎨 Customization

### Add Your Projects

Edit `js/project-tiles.js` (homepage) and `js/projects-desk.js` (projects page):

```javascript
{
    id: 1,
    title: 'Your Project',
    type: 'p5.js',
    description: 'Short description',
    color: '#00ff88',
    image: 'images/your-image.jpg',      // Optional: use your image
    fullDescription: 'Long description...', // Optional: detailed text
    link: 'https://your-link.com',        // Optional: project link
    tech: ['p5.js', 'JavaScript']         // Optional: tech tags
}
```

### Add Project Images

1. Create an `images` folder in the project directory
2. Add your images (jpg, png, etc.)
3. Reference them in project objects: `image: 'images/your-image.jpg'`

### Update Contact Info

Edit `links.html` to update:
- Email
- LinkedIn (already set to your profile)
- GitHub
- Other links

## 🌐 Browser Compatibility

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

**Note:** Photobooth page requires camera permissions.

## 📝 Notes

- All files work standalone - no build process needed
- Uses CDN for p5.js (requires internet connection)
- Resume.pdf is included and ready to download
- LinkedIn link is already set to your profile
- Photobooth links to your GitHub project

Enjoy your Digital Lab Notebook! 🧪✨
