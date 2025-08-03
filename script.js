// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.sunIcon = document.getElementById('sun-icon');
        this.moonIcon = document.getElementById('moon-icon');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemPrefersDark) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
        
        // Add event listener for theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    setTheme(theme) {
        if (theme === 'dark') {
            this.body.setAttribute('data-theme', 'dark');
            this.sunIcon.classList.add('hidden');
            this.moonIcon.classList.remove('hidden');
        } else {
            this.body.removeAttribute('data-theme');
            this.sunIcon.classList.remove('hidden');
            this.moonIcon.classList.add('hidden');
        }
        
        localStorage.setItem('theme', theme);
    }
    
    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Button Interactions
class ButtonManager {
    constructor() {
        this.listenBtn = document.querySelector('.listen-btn');
        this.readBtn = document.querySelector('.read-btn');
        
        this.init();
    }
    
    init() {
        // Listen button functionality
        this.listenBtn.addEventListener('click', () => {
            this.handleListenClick();
        });
        
        // Read button functionality
        this.readBtn.addEventListener('click', () => {
            this.handleReadClick();
        });
        
        // Add ripple effect to buttons
        this.addRippleEffect(this.listenBtn);
        this.addRippleEffect(this.readBtn);
    }
    
    handleListenClick() {
        // Add visual feedback
        this.listenBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.listenBtn.style.transform = '';
        }, 150);
        
        // Here you would typically start audio playback
        console.log('Starting audio playback...');
        
        // Show notification (you can replace this with actual functionality)
        this.showNotification('Audio feature coming soon!', 'info');
    }
    
    handleReadClick() {
        // Add visual feedback
        this.readBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.readBtn.style.transform = '';
        }, 150);
        
        // Here you would typically open the reading interface
        console.log('Opening reading interface...');
        
        // Show notification (you can replace this with actual functionality)
        this.showNotification('Reading feature coming soon!', 'info');
    }
    
    addRippleEffect(button) {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'info' ? '#3b82f6' : '#10b981'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Book Cover Animation
class BookCoverManager {
    constructor() {
        this.bookCover = document.querySelector('.book-cover');
        this.init();
    }
    
    init() {
        // Add mouse tracking for 3D effect
        this.bookCover.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        
        this.bookCover.addEventListener('mouseleave', () => {
            this.resetTransform();
        });
    }
    
    handleMouseMove(e) {
        const rect = this.bookCover.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.bookCover.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.02)
        `;
    }
    
    resetTransform() {
        this.bookCover.style.transform = 'rotate(-2deg)';
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.book-info > *');
        this.init();
    }
    
    init() {
        // Create intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all elements
        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Preload critical resources
        this.preloadResources();
        
        // Optimize animations for reduced motion preference
        this.handleReducedMotion();
        
        // Add loading state management
        this.handlePageLoad();
    }
    
    preloadResources() {
        // Preload any critical images or fonts here
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        // Add font URL when available
        // document.head.appendChild(link);
    }
    
    handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    handlePageLoad() {
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Remove loading class when page is fully loaded
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        });
    }
}

// Add CSS for ripple animation
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .loading {
        opacity: 0;
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new ButtonManager();
    new BookCoverManager();
    new ScrollAnimations();
    new PerformanceManager();
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('listen-btn') || 
            focusedElement.classList.contains('read-btn') ||
            focusedElement.id === 'theme-toggle') {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Add focus styles for accessibility
const accessibilityCSS = `
    .listen-btn:focus,
    .read-btn:focus,
    .theme-toggle:focus {
        outline: 2px solid var(--blue-primary);
        outline-offset: 2px;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .book-cover {
            transform: none !important;
        }
    }
`;

const accessibilityStyle = document.createElement('style');
accessibilityStyle.textContent = accessibilityCSS;
document.head.appendChild(accessibilityStyle);