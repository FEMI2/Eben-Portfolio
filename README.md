# Ebenezer Iluyomade - Portfolio Website

A modern, responsive portfolio website showcasing my expertise in IT Engineering, Cybersecurity, and Cloud Computing.

## 🌟 Features

- **Modern Design**: Clean, professional layout with smooth animations and hover effects
- **Responsive**: Fully optimized for desktop, tablet, and mobile devices
- **Professional Sections**:
  - Hero section with professional portrait
  - About me with technical expertise highlights
  - Skills showcase with progress indicators
  - Professional experience timeline
  - Project portfolio with detailed descriptions
  - Service offerings with pricing tiers
  - Latest blog articles
  - Contact form and information
- **Interactive Elements**: Smooth scrolling navigation, hover animations, and dynamic content
- **SEO Optimized**: Proper meta tags, semantic HTML, and accessibility features

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript**: Interactive functionality and smooth scrolling
- **Responsive Design**: Mobile-first approach with media queries

## 📁 Project Structure

```
Personal Portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── assets/             # Images and icons
│   ├── IMG_9169.JPG   # Professional portrait
│   ├── favicon.ico    # Website favicon
│   ├── favicon.svg    # SVG favicon
│   └── apple-touch-icon.png
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd "Personal Portfolio"
   ```

2. **Open the website**
   - **Option 1**: Double-click `index.html` to open in your browser
   - **Option 2**: Use a local server for development:
     ```bash
     # Using Python 3
     python3 -m http.server 8080
     
     # Using Node.js (if you have live-server installed)
     npx live-server
     
     # Using PHP
     php -S localhost:8080
     ```

3. **View the website**
   - Open your browser and navigate to `http://localhost:8080` (if using a local server)
   - Or simply open the `index.html` file directly in your browser

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎨 Customization

### Colors
The website uses a modern color palette defined in CSS custom properties:
- Primary: `#3b82f6` (Blue)
- Secondary: `#64748b` (Slate)
- Background: `#ffffff` (White)
- Text: `#1e293b` (Dark Slate)

### Content
To customize the content:
1. Edit `index.html` for text content and structure
2. Replace images in the `assets/` folder
3. Modify `styles.css` for styling changes
4. Update `script.js` for functionality changes

### Adding New Sections
1. Add the HTML structure in `index.html`
2. Add corresponding CSS styles in `styles.css`
3. Update navigation links if needed
4. Add any required JavaScript functionality

## 📧 Contact Information

- **Email**: ebenezer.iluyomade@gmail.com
- **Phone**: +48 720 871 738
- **Location**: Wrocław, Poland
- **LinkedIn**: [linkedin.com/in/ebenezer-iluyomade](https://linkedin.com/in/ebenezer-iluyomade)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are welcome! Feel free to:
1. Open an issue for bugs or suggestions
2. Submit a pull request for improvements
3. Contact me directly for collaboration opportunities

## 🔧 Development Notes

- The website uses vanilla JavaScript for better performance
- CSS Grid and Flexbox are used for modern, flexible layouts
- Images are optimized for web performance
- The design follows modern web standards and accessibility guidelines

## 📈 Performance

- Optimized images and assets
- Minimal JavaScript for fast loading
- Efficient CSS with minimal redundancy
- Mobile-first responsive design

---

**Built with ❤️ by Ebenezer Iluyomade**

*Last updated: January 2024*
## 🆓 Free Hosting Options

- GitHub Pages (static):
  - Push this repo to GitHub
  - In repository settings, enable `Pages` with source `main` branch `/ (root)`
  - Site becomes available at `https://<your-username>.github.io/<repo-name>/`
- Render (Django backend):
  - Keep the project structure and push to GitHub
  - Import the repo at `render.com` and select `render.yaml`
  - Set env vars: `DJANGO_SETTINGS_MODULE=my_Portfolio.production_settings`, `SECRET_KEY`, `ALLOWED_HOSTS`
  - Render builds and serves via `gunicorn`

Files added for hosting:
- `render.yaml` blueprint for free Django hosting
