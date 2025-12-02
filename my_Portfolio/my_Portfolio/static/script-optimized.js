// Optimized JavaScript with code splitting and async loading

// Core utilities - loaded immediately
const utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Module loader for dynamic imports
class ModuleLoader {
    constructor() {
        this.loadedModules = new Set();
        this.loadingModules = new Map();
    }
    
    async loadModule(moduleName, moduleFunction) {
        if (this.loadedModules.has(moduleName)) {
            return Promise.resolve();
        }
        
        if (this.loadingModules.has(moduleName)) {
            return this.loadingModules.get(moduleName);
        }
        
        const loadPromise = new Promise((resolve, reject) => {
            try {
                moduleFunction();
                this.loadedModules.add(moduleName);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
        
        this.loadingModules.set(moduleName, loadPromise);
        
        try {
            await loadPromise;
            this.loadingModules.delete(moduleName);
        } catch (error) {
            this.loadingModules.delete(moduleName);
            throw error;
        }
    }
}

const moduleLoader = new ModuleLoader();

// Critical modules - loaded on DOMContentLoaded
const criticalModules = {
    navigation: () => {
        const navbar = document.querySelector('.navbar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navbar) return;
        
        // Mobile menu toggle
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }
        
        // Scroll effects with throttling
        const handleScroll = utils.throttle(() => {
            const scrolled = window.pageYOffset > 50;
            navbar.classList.toggle('scrolled', scrolled);
            
            // Update active nav link
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                const navLink = document.querySelector(`a[href="#${id}"]`);
                
                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    if (navLink) navLink.classList.add('active');
                }
            });
        }, 16); // ~60fps
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks) navLinks.classList.remove('active');
                    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                }
            });
        });
    },
    
    heroAnimations: () => {
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroText) {
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateY(30px)';
            
            requestAnimationFrame(() => {
                heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            });
        }
        
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
            }, 200);
        }
    }
};

// Non-critical modules - loaded on interaction or scroll
const nonCriticalModules = {
    skillBars: () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        if (!skillBars.length) return;
        
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                if (utils.isInViewport(bar) && !bar.classList.contains('animated')) {
                    const percentage = bar.getAttribute('data-percentage') || '0';
                    bar.style.width = percentage + '%';
                    bar.classList.add('animated');
                }
            });
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const percentage = bar.getAttribute('data-percentage') || '0';
                    bar.style.width = percentage + '%';
                    bar.classList.add('animated');
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    },
    
    typingEffect: () => {
        const typingElements = document.querySelectorAll('.typing-effect');
        if (!typingElements.length) return;
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.getAttribute('data-speed')) || 100;
            
            element.textContent = '';
            element.style.borderRight = '2px solid';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    // Blinking cursor effect
                    setInterval(() => {
                        element.style.borderRight = element.style.borderRight === '2px solid transparent' 
                            ? '2px solid' : '2px solid transparent';
                    }, 500);
                }
            };
            
            // Start typing when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    },
    
    scrollAnimations: () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (!animatedElements.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    },
    
    contactForm: () => {
        const contactForm = document.querySelector('#contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                if (response.ok) {
                    submitBtn.textContent = 'Message Sent!';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                submitBtn.textContent = 'Error - Try Again';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
};

// Initialize critical modules immediately
document.addEventListener('DOMContentLoaded', async () => {
    // Load critical modules
    await Promise.all([
        moduleLoader.loadModule('navigation', criticalModules.navigation),
        moduleLoader.loadModule('heroAnimations', criticalModules.heroAnimations)
    ]);
    
    // Load non-critical modules with delay
    setTimeout(async () => {
        await Promise.all([
            moduleLoader.loadModule('skillBars', nonCriticalModules.skillBars),
            moduleLoader.loadModule('scrollAnimations', nonCriticalModules.scrollAnimations)
        ]);
    }, 100);
    
    // Load interaction-based modules on first user interaction
    const loadInteractionModules = async () => {
        await Promise.all([
            moduleLoader.loadModule('typingEffect', nonCriticalModules.typingEffect),
            moduleLoader.loadModule('contactForm', nonCriticalModules.contactForm)
        ]);
    };
    
    // Load on first interaction
    ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, loadInteractionModules, { once: true, passive: true });
    });
});

// Export for global access if needed
window.portfolioModules = {
    utils,
    moduleLoader,
    criticalModules,
    nonCriticalModules
};