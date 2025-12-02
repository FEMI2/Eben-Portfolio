// ==========================================================================
// ADVANCED IMAGE OPTIMIZATION AND LAZY LOADING
// Modern image loading with WebP support and performance optimization
// ==========================================================================

class ImageOptimizer {
    constructor() {
        this.lazyImages = [];
        this.imageObserver = null;
        this.supportsWebP = false;
        this.init();
    }

    async init() {
        // Check WebP support
        this.supportsWebP = await this.checkWebPSupport();
        
        // Initialize lazy loading
        this.initLazyLoading();
        
        // Optimize existing images
        this.optimizeExistingImages();
        
        // Add responsive image handling
        this.handleResponsiveImages();
    }

    // Check if browser supports WebP format
    checkWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    // Initialize intersection observer for lazy loading
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                // Load images 50px before they come into view
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all lazy images
            this.observeLazyImages();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }

    // Find and observe all lazy images
    observeLazyImages() {
        const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        lazyImages.forEach(img => {
            this.lazyImages.push(img);
            this.imageObserver.observe(img);
        });
    }

    // Load individual image with optimization
    loadImage(img) {
        const src = img.dataset.src || img.src;
        const optimizedSrc = this.getOptimizedImageSrc(src);
        
        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Fade in effect
            img.style.opacity = '0';
            img.src = optimizedSrc;
            img.style.transition = 'opacity 0.3s ease-in-out';
            
            // Remove data-src attribute
            if (img.dataset.src) {
                delete img.dataset.src;
            }
            
            // Fade in
            requestAnimationFrame(() => {
                img.style.opacity = '1';
            });
            
            // Add loaded class for CSS styling
            img.classList.add('loaded');
        };
        
        imageLoader.onerror = () => {
            // Fallback to original src on error
            img.src = src;
            img.classList.add('error');
        };
        
        imageLoader.src = optimizedSrc;
    }

    // Get optimized image source based on device and format support
    getOptimizedImageSrc(src) {
        if (!src) return '';
        
        // For now, return original src to avoid 404 errors
        // WebP conversion should only happen if WebP files actually exist
        return src;
    }
    
    // Check if WebP version exists before using it
    async checkWebPExists(webpSrc) {
        try {
            const response = await fetch(webpSrc, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }

    // Optimize existing images on the page
    optimizeExistingImages() {
        const images = document.querySelectorAll('img:not([data-src]):not([loading="lazy"])');
        
        images.forEach(img => {
            // Add loading attribute for native lazy loading support
            if ('loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }
            
            // Add responsive behavior
            this.makeImageResponsive(img);
        });
    }

    // Make image responsive with proper sizing
    makeImageResponsive(img) {
        if (!img.style.maxWidth) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
        
        // Add aspect ratio preservation
        if (!img.style.aspectRatio && img.width && img.height) {
            img.style.aspectRatio = `${img.width} / ${img.height}`;
        }
    }

    // Handle responsive images with srcset
    handleResponsiveImages() {
        const responsiveImages = document.querySelectorAll('img[data-srcset]');
        
        responsiveImages.forEach(img => {
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
                delete img.dataset.srcset;
            }
        });
    }

    // Fallback for browsers without IntersectionObserver
    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => this.loadImage(img));
    }

    // Preload critical images
    preloadCriticalImages(imageSrcs) {
        imageSrcs.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = this.getOptimizedImageSrc(src);
            document.head.appendChild(link);
        });
    }

    // Add new images dynamically (for dynamic content)
    addImage(imgElement) {
        if (this.imageObserver) {
            this.imageObserver.observe(imgElement);
        } else {
            this.loadImage(imgElement);
        }
    }

    // Clean up observer
    destroy() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
    }
}

// Initialize image optimizer when DOM is ready
let imageOptimizer;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        imageOptimizer = new ImageOptimizer();
    });
} else {
    imageOptimizer = new ImageOptimizer();
}

// Export for use in other scripts
window.ImageOptimizer = ImageOptimizer;
window.imageOptimizer = imageOptimizer;

// Performance monitoring for images
if ('PerformanceObserver' in window) {
    const imagePerformanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.initiatorType === 'img') {
                console.log(`Image loaded: ${entry.name} in ${entry.duration}ms`);
            }
        }
    });
    
    imagePerformanceObserver.observe({entryTypes: ['resource']});
}

console.log('Image Optimizer initialized! 🖼️');