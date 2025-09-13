// Responsive Image Optimization with WebP Support

class ResponsiveImageManager {
    constructor() {
        this.webpSupported = null;
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.connectionSpeed = this.getConnectionSpeed();
        this.init();
    }
    
    async init() {
        await this.checkWebPSupport();
        this.setupResponsiveImages();
        this.setupLazyLoading();
        this.setupImageErrorHandling();
    }
    
    // Check WebP support
    async checkWebPSupport() {
        if (this.webpSupported !== null) return this.webpSupported;
        
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                this.webpSupported = (webP.height === 2);
                resolve(this.webpSupported);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    // Get connection speed
    getConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const effectiveType = connection.effectiveType;
            
            switch (effectiveType) {
                case 'slow-2g':
                case '2g':
                    return 'slow';
                case '3g':
                    return 'medium';
                case '4g':
                default:
                    return 'fast';
            }
        }
        return 'medium';
    }
    
    // Generate responsive image sources
    generateImageSources(basePath, alt = '', sizes = []) {
        const defaultSizes = [
            { width: 320, suffix: '_mobile' },
            { width: 768, suffix: '_tablet' },
            { width: 1024, suffix: '_desktop' },
            { width: 1920, suffix: '_large' }
        ];
        
        const imageSizes = sizes.length ? sizes : defaultSizes;
        const extension = this.webpSupported ? '.webp' : '.jpg';
        const quality = this.getImageQuality();
        
        let sources = [];
        let srcset = [];
        
        // Generate WebP sources if supported
        if (this.webpSupported) {
            imageSizes.forEach(size => {
                const src = `${basePath}${size.suffix}${extension}`;
                srcset.push(`${src} ${size.width}w`);
            });
            
            sources.push({
                type: 'image/webp',
                srcset: srcset.join(', '),
                sizes: this.generateSizesAttribute()
            });
        }
        
        // Generate fallback JPEG sources
        srcset = [];
        imageSizes.forEach(size => {
            const src = `${basePath}${size.suffix}.jpg`;
            srcset.push(`${src} ${size.width}w`);
        });
        
        sources.push({
            type: 'image/jpeg',
            srcset: srcset.join(', '),
            sizes: this.generateSizesAttribute()
        });
        
        return {
            sources,
            fallback: `${basePath}_desktop.jpg`,
            alt
        };
    }
    
    // Generate sizes attribute based on breakpoints
    generateSizesAttribute() {
        return '(max-width: 320px) 320px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px';
    }
    
    // Get image quality based on connection speed
    getImageQuality() {
        switch (this.connectionSpeed) {
            case 'slow':
                return 60;
            case 'medium':
                return 75;
            case 'fast':
            default:
                return 85;
        }
    }
    
    // Setup responsive images
    setupResponsiveImages() {
        const images = document.querySelectorAll('img[data-responsive]');
        
        images.forEach(img => {
            this.convertToResponsiveImage(img);
        });
    }
    
    // Convert regular image to responsive picture element
    convertToResponsiveImage(img) {
        const basePath = img.dataset.responsive;
        const alt = img.alt || '';
        const customSizes = img.dataset.sizes ? JSON.parse(img.dataset.sizes) : [];
        
        const imageData = this.generateImageSources(basePath, alt, customSizes);
        
        // Create picture element
        const picture = document.createElement('picture');
        
        // Add source elements
        imageData.sources.forEach(source => {
            const sourceEl = document.createElement('source');
            sourceEl.type = source.type;
            sourceEl.srcset = source.srcset;
            sourceEl.sizes = source.sizes;
            picture.appendChild(sourceEl);
        });
        
        // Create new img element
        const newImg = document.createElement('img');
        newImg.src = imageData.fallback;
        newImg.alt = imageData.alt;
        newImg.loading = 'lazy';
        newImg.decoding = 'async';
        
        // Copy classes and attributes
        if (img.className) newImg.className = img.className;
        if (img.id) newImg.id = img.id;
        
        // Copy data attributes except responsive ones
        Array.from(img.attributes).forEach(attr => {
            if (attr.name.startsWith('data-') && !attr.name.includes('responsive') && !attr.name.includes('sizes')) {
                newImg.setAttribute(attr.name, attr.value);
            }
        });
        
        picture.appendChild(newImg);
        
        // Replace original image
        img.parentNode.replaceChild(picture, img);
    }
    
    // Setup lazy loading with Intersection Observer
    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without Intersection Observer
            lazyImages.forEach(img => this.loadImage(img));
        }
    }
    
    // Load individual image
    loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
        }
        
        img.classList.add('loaded');
    }
    
    // Setup image error handling
    setupImageErrorHandling() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target);
            }
        }, true);
    }
    
    // Handle image loading errors
    handleImageError(img) {
        // Try fallback formats
        if (img.src.includes('.webp')) {
            img.src = img.src.replace('.webp', '.jpg');
        } else if (!img.dataset.errorHandled) {
            // Show placeholder or default image
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            img.alt = 'Image not available';
            img.dataset.errorHandled = 'true';
        }
    }
    
    // Preload critical images
    preloadCriticalImages(imagePaths) {
        imagePaths.forEach(path => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = path;
            
            // Disable WebP conversion to avoid 404 errors
            // Only convert if WebP files actually exist
            
            document.head.appendChild(link);
        });
    }
    
    // Dynamic image loading based on viewport
    loadImagesInViewport() {
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isVisible) {
                this.loadImage(img);
            }
        });
    }
    
    // Optimize images for current device
    optimizeForDevice() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Adjust image quality based on device pixel ratio
            if (this.devicePixelRatio > 2 && this.connectionSpeed === 'fast') {
                // Load high-DPI images for retina displays with fast connection
                if (img.srcset && !img.srcset.includes('2x')) {
                    const highDpiSrc = img.src.replace(/\.(jpg|jpeg|png|webp)$/i, '@2x.$1');
                    img.srcset += `, ${highDpiSrc} 2x`;
                }
            }
            
            // Add CSS for better image rendering
            img.style.imageRendering = this.devicePixelRatio > 1 ? 'crisp-edges' : 'auto';
        });
    }
    
    // Monitor image performance
    monitorImagePerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.initiatorType === 'img') {
                        console.log(`Image loaded: ${entry.name} in ${entry.duration}ms`);
                        
                        // Track slow loading images
                        if (entry.duration > 1000) {
                            console.warn(`Slow image loading detected: ${entry.name}`);
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }
}

// Initialize responsive image manager
document.addEventListener('DOMContentLoaded', () => {
    window.responsiveImageManager = new ResponsiveImageManager();
    
    // Monitor performance
    window.responsiveImageManager.monitorImagePerformance();
    
    // Optimize for current device
    window.responsiveImageManager.optimizeForDevice();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.responsiveImageManager.loadImagesInViewport();
        }, 250);
    });
});

// Export for global access
window.ResponsiveImageManager = ResponsiveImageManager;