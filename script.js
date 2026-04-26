// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('תודה על הפנייה! אחזור אליך בהקדם.');
            this.reset();
        });
    }
    
    // Language Toggle Function
    function toggleLanguage() {
        const html = document.documentElement;
        const langBtn = document.querySelector('.lang-toggle');
        
        if (html.getAttribute('lang') === 'he') {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            langBtn.textContent = 'עב';
            // Update content to English (placeholder - user can customize)
            document.body.classList.add('english-mode');
        } else {
            html.setAttribute('lang', 'he');
            html.setAttribute('dir', 'rtl');
            langBtn.textContent = 'EN';
            document.body.classList.remove('english-mode');
        }
    }
    
    // Initialize PDF Viewer with page flipping
    initPDFViewer();
    
    console.log('Portfolio initialized successfully');
});

// PDF Viewer with Page Flipping
async function initPDFViewer() {
    const canvas = document.getElementById('pdfCanvas');
    const prevBtn = document.getElementById('pdfPrev');
    const nextBtn = document.getElementById('pdfNext');
    const currentPageEl = document.getElementById('pdfCurrentPage');
    
    if (!canvas) return;
    
    const pdfPath = 'עבודת גמר לודלוגיה - דנה מנצור.pdf';
    let pdfDoc = null;
    let currentPage = 1;
    let totalPages = 0;
    let pageRendering = false;
    let pageNumPending = null;
    
    const ctx = canvas.getContext('2d');
    
    try {
        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;
        
        // Update total pages display
        if (currentPageEl) {
            currentPageEl.textContent = `1 / ${totalPages}`;
        }
        
        // Render first page
        await renderPage(1);
        
    } catch (error) {
        console.log('PDF loading error:', error);
        // Show fallback message
        canvas.style.display = 'none';
        const container = document.querySelector('.pdf-canvas-container');
        if (container) {
            container.innerHTML = '<p style="text-align:center;padding:20px;">הקובץ לא נטען. <a href="' + pdfPath + '" target="_blank">לחץ כאן לפתיחה</a></p>';
        }
    }
    
    // Render a specific page
    async function renderPage(num) {
        pageRendering = true;
        
        try {
            const page = await pdfDoc.getPage(num);
            
            const viewport = page.getViewport({ scale: 1.2 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
            pageRendering = false;
            
            if (pageNumPending !== null) {
                await renderPage(pageNumPending);
                pageNumPending = null;
            }
            
            // Update page indicator
            if (currentPageEl) {
                currentPageEl.textContent = `${num} / ${totalPages}`;
            }
            
            // Update button states
            if (prevBtn) prevBtn.disabled = num <= 1;
            if (nextBtn) nextBtn.disabled = num >= totalPages;
            
        } catch (error) {
            console.log('Page render error:', error);
            pageRendering = false;
        }
    }
    
    // Queue a page render
    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }
    
    // Previous page button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage <= 1) return;
            currentPage--;
            queueRenderPage(currentPage);
        });
    }
    
    // Next page button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage >= totalPages) return;
            currentPage++;
            queueRenderPage(currentPage);
        });
    }
}

// Add elegant animations on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.work-card, .video-card, .about-content, .contact-content');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// Initialize cards with fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.work-card, .video-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // Trigger animation after a short delay
    setTimeout(() => {
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 300);
});

// Add elegant animations on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.video-card, .about-content, .contact-content');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// Initialize video cards with fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // Trigger animation after a short delay
    setTimeout(() => {
        videoCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 300);
});

console.log('Portfolio initialized successfully');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Add CSS for hamburger menu
const style = document.createElement('style');
style.textContent = `
    .hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
        padding: 5px;
    }
    .hamburger span {
        width: 25px;
        height: 3px;
        background: #1f2937;
        border-radius: 2px;
        transition: all 0.3s ease;
    }
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 6px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -6px);
    }
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        .nav-links {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: #ffffff;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .nav-links.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

console.log('Landing page initialized successfully');