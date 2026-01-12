const counters = document.querySelectorAll(".count");

const formatNumber = (value, format) => {
    if (format === "compact") {
        return new Intl.NumberFormat("en", {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(value);
    }
    return value.toLocaleString();
};

const animateCount = (counter) => {
    const target = +counter.dataset.target;
    const suffix = counter.dataset.suffix || "";
    const format = counter.dataset.format;
    let current = 0;
    const duration = 1500;
    const start = performance.now();

    const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.floor(progress * target);
        counter.innerText = formatNumber(current, format) + suffix;

        if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));
