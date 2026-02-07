//Mobile menu toggle function
    function toggleMenu() {
        // Toggle the active class on the nav-links element
        // This will show or hide the navigation menu
        document.querySelector('.nav-links').classList.toggle('active');
    }
/* Slider logic + animations */
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');

    const cards = document.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    let currentIndex = 0;

    // Create indicators
    for (let i = 0; i < totalCards; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = document.querySelectorAll('.indicator');

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Button controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Optional: Auto-play
    // let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause autoplay on hover (if enabled)
    // carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    // carousel.addEventListener('mouseleave', () => autoplayInterval = setInterval(nextSlide, 5000));


    //Logic for the floating icons

    /* document.querySelectorAll(".brand-icon").forEach(icon => {
        const randomDelay = (Math.random() * 2).toFixed(2) + "s";
        icon.style.setProperty("--delay", randomDelay);
    }); */