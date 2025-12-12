// script.js - COMBINED VERSION WITH ENHANCED NAVIGATION

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ENHANCED NAVIGATION FUNCTIONALITY =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile Menu Toggle with Animation
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class on mobile menu
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            } else {
                document.body.style.overflow = 'auto';
                document.body.style.position = 'static';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
                document.body.style.position = 'static';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
        }
    });
    
    // Highlight active page in navigation
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
            
            // Special case for index.html
            if (currentPage === 'index.html' && linkHref === 'index.html') {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth hover effect for desktop
    if (window.innerWidth > 768) {
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
        }
    });
    
    // ===== VIDEO FALLBACK FOR MOBILE =====
    const heroVideo = document.querySelector('.hero-video');
    
    // Handle video loading errors
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            // If video fails to load, set a fallback background image
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.style.background = 'linear-gradient(to right, #2c3e50, #4a6491)';
                heroVideo.style.display = 'none';
            }
        });
        
        // For mobile devices, ensure video is muted and plays inline
        heroVideo.setAttribute('playsinline', '');
        heroVideo.setAttribute('muted', '');
        heroVideo.setAttribute('autoplay', '');
        heroVideo.setAttribute('loop', '');
    }
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal anchor links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== SERVICE CARD HOVER EFFECT ENHANCEMENT =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ===== FOOTER YEAR UPDATING =====
    function updateFooterYear() {
        const footerText = document.querySelector('.footer-text');
        if (footerText) {
            const currentYear = new Date().getFullYear();
            const nextYear = currentYear + 1;
            footerText.textContent = `© Pro Car Care Hub — All Rights Reserved -${currentYear}-${nextYear}`;
        }
    }
    
    updateFooterYear();
    
    // ===== RESPONSIVE VIDEO HANDLING =====
    function handleVideoSize() {
        if (!heroVideo) return;
        
        // Adjust video for different aspect ratios
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const aspectRatio = viewportWidth / viewportHeight;
        
        if (aspectRatio > 1.8) {
            // Very wide screens
            heroVideo.style.objectFit = 'cover';
            heroVideo.style.width = '100%';
            heroVideo.style.height = '100%';
        } else if (aspectRatio < 0.8) {
            // Very tall screens (mobile in portrait)
            heroVideo.style.objectFit = 'cover';
            heroVideo.style.width = '100%';
            heroVideo.style.height = '100%';
        } else {
            // Normal aspect ratios
            heroVideo.style.objectFit = 'cover';
        }
    }
    
    // Call on load and resize
    window.addEventListener('load', handleVideoSize);
    window.addEventListener('resize', handleVideoSize);
});
