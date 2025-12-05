// script.js
// Pro Car Care Hub - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class on mobile menu
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu to X
            const bars = menuToggle.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelectorAll('.bar')[0].style.transform = 'none';
                menuToggle.querySelectorAll('.bar')[1].style.opacity = '1';
                menuToggle.querySelectorAll('.bar')[2].style.transform = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            menuToggle.querySelectorAll('.bar')[0].style.transform = 'none';
            menuToggle.querySelectorAll('.bar')[1].style.opacity = '1';
            menuToggle.querySelectorAll('.bar')[2].style.transform = 'none';
            document.body.style.overflow = 'auto';
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
    
    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to current page link
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // Call the function on page load
    setActiveNavLink();
    
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
});
