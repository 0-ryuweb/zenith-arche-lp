
document.addEventListener('DOMContentLoaded', () => {
    /* ============================================
       Loader
       ============================================ */
    const body = document.body;
    
    // Simulate loading time (or wait for images)
    setTimeout(() => {
        body.classList.remove('loading');
        body.classList.add('loaded');
        initScrollAnimations();
    }, 2000);

    /* ============================================
       Custom Cursor
       ============================================ */
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const triggers = document.querySelectorAll('a, button, .hover-trigger');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add minimal delay to follower for organic feel
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            follower.classList.add('active');
        });
        trigger.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
        });
    });

    /* ============================================
       Header Scroll Effect
       ============================================ */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ============================================
       Smooth Scroll & Parallax (Intersection Observer)
       ============================================ */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in classes to elements you want to animate
    document.querySelectorAll('.section-title, .section-desc, .work-item, .service-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(el);
    });

    // Handle the animation when class is added
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.in-view').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });

    /* ============================================
       Simple Parallax for Hero Image
       ============================================ */
    const heroImage = document.querySelector('.hero-image-wrapper');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if(scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${-10 + scrolled * 0.02}%)`;
        }
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
