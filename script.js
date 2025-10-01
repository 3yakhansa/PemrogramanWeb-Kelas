// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Fade-in on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animate skill bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }
    });
}, observerOptions);
document.querySelectorAll('#skills .fade-in').forEach(el => {
    skillObserver.observe(el);
});

// Project Slider
let currentSlideIndex = 0;
const totalSlides = 3;

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
    else if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;
    updateSlider();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    updateSlider();
}

function updateSlider() {
    const slides = document.getElementById('projectSlides');
    const dots = document.querySelectorAll('.slider-dot');
    slides.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

// Auto slide
setInterval(() => changeSlide(1), 5000);

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check mr-2"></i>Pesan Terkirim!';
    button.disabled = true;
    button.classList.add('bg-green-600');

    setTimeout(() => {
        event.target.reset();
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove('bg-green-600');
    }, 3000);
}