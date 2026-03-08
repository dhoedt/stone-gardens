const START_OPACITY = 0.5;
const END_OPACITY = 0.1;
const SCROLL_DISTANCE = 300;

// Handle header opacity on scroll
function handleHeaderScroll() {
    const amountScrolled = document.documentElement.scrollTop;
    opacity = Math.max(START_OPACITY, (amountScrolled / SCROLL_DISTANCE));
    document.documentElement.style.setProperty('--header-bg-opacity', opacity);
}

// Set up scroll event listener
function setupScrollHandler() {
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    // Initial call to set correct opacity on page load
    handleHeaderScroll();
}

document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('nav-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Toggle menu on burger button click
    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideHeader = event.target.closest('.header');

        if (!isClickInsideHeader && navMenu.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Carousel functionality
    const carousel = document.getElementById('creations-carousel');
    const carouselImages = carousel.querySelectorAll('.carousel-image');
    const carouselDotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    let currentIndex = 0;
    let autoAdvanceInterval;
    const AUTO_ADVANCE_INTERVAL = 4000;

    // Create dots
    carouselImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        carouselDotsContainer.appendChild(dot);
    });

    const dots = carouselDotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        carouselImages.forEach((img, index) => {
            img.classList.remove('active');
            dots[index].classList.remove('active');
        });

        carouselImages[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoAdvance();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
    }

    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(nextSlide, AUTO_ADVANCE_INTERVAL);
    }

    function stopAutoAdvance() {
        clearInterval(autoAdvanceInterval);
    }

    function resetAutoAdvance() {
        stopAutoAdvance();
        startAutoAdvance();
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoAdvance();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoAdvance();
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);

    // Start auto-advance
    startAutoAdvance();
});


// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
    setupScrollHandler();
});