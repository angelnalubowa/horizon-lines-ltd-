//Mobile menu toggle function
    function toggleMenu() {
        // Toggle the active class on the nav-links element
        // This will show or hide the navigation menu
        document.querySelector('.nav-links').classList.toggle('active');
    }
   /* Slider logic + animations */
    (function(){
      const container = document.getElementById('pfContainer');
      const prevBtn = document.getElementById('pfPrev');
      const nextBtn = document.getElementById('pfNext');
      const dotsWrap = document.getElementById('pfDots');

      let cards = [];
      let index = 0;
      let isTouching = false;
      let touchStartX = 0;
      let lastUpdateTimeout = null;

      // Initialize after custom elements render
      function init() {
        cards = Array.from(container.querySelectorAll('testimonial-card'));
        if (!cards.length) return;

        // create dots
        dotsWrap.innerHTML = '';
        cards.forEach((c, i) => {
          const dot = document.createElement('div');
          dot.className = 'pf-dot';
          dot.dataset.index = i;
          dot.addEventListener('click', () => {
            index = i;
            focusIndex(index, true);
          });
          dotsWrap.appendChild(dot);
        });

        // center the first visible card
        updateActives();
        // ensure a11y tab focusability
        container.querySelectorAll('testimonial-card').forEach((el) => el.tabIndex = 0);

        // set up listeners
        prevBtn.addEventListener('click', onPrev);
        nextBtn.addEventListener('click', onNext);

        // swipe support
        container.addEventListener('touchstart', onTouchStart, {passive:true});
        container.addEventListener('touchend', onTouchEnd, {passive:true});

        // wheel to navigate horizontally (desktop)
        container.addEventListener('wheel', (e) => {
          if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
            // allow vertical scroll (do nothing)
            return;
          }
          e.preventDefault();
          container.scrollLeft += e.deltaY + e.deltaX;
          // debounce update of active card
          if (lastUpdateTimeout) clearTimeout(lastUpdateTimeout);
          lastUpdateTimeout = setTimeout(updateActives, 120);
        }, {passive:false});

        // when user uses native scroll (mobile), update active after scroll ends
        let scrollTimer;
        container.addEventListener('scroll', () => {
          if (scrollTimer) clearTimeout(scrollTimer);
          scrollTimer = setTimeout(updateActives, 120);
        });

        // keyboard navigation
        container.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') onPrev();
          if (e.key === 'ArrowRight') onNext();
        });

        // init focus
        focusIndex(index, true);
      }

      // compute nearest card to center and set active
      function updateActives(){
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        let closestIndex = 0;
        let closestDist = Infinity;
        cards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(centerX - cardCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
          }
        });

        index = closestIndex;
        applyActiveClasses();
        updateDots();
      }

      function applyActiveClasses(){
        cards.forEach((card, i) => {
          if (i === index) {
            card.classList.add('active');
            card.classList.remove('inactive');
          } else {
            card.classList.add('inactive');
            card.classList.remove('active');
          }
        });
      }

      function updateDots(){
        const dotEls = Array.from(dotsWrap.children);
        dotEls.forEach(d => d.classList.remove('active'));
        if (dotEls[index]) dotEls[index].classList.add('active');
      }

      function focusIndex(i, shouldScroll = true){
        index = Math.max(0, Math.min(i, cards.length - 1));
        applyActiveClasses();
        updateDots();
        if (shouldScroll && cards[index]) {
          // use scrollIntoView with inline center for smooth centering
          cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }

      function onPrev(){
        focusIndex(index - 1, true);
      }

      function onNext(){
        focusIndex(index + 1, true);
      }

      // touch handlers for swipe
      function onTouchStart(e){
        isTouching = true;
        touchStartX = e.touches[0].clientX;
      }

      function onTouchEnd(e){
        if (!isTouching) return;
        isTouching = false;
        const touchEndX = e.changedTouches[0].clientX;
        const dx = touchStartX - touchEndX;
        if (dx > 40) { // swipe left -> next
          onNext();
        } else if (dx < -40) { // swipe right -> prev
          onPrev();
        } else {
          // small move -> snap to nearest
          updateActives();
        }
      }

      // Wait a tick so customElements are defined & slotted
      window.addEventListener('load', () => {
        // small delay for fonts / layout
        setTimeout(init, 60);
      });
      // Also re-init on resize (recompute)
      window.addEventListener('resize', () => {
        setTimeout(updateActives, 120);
      });
    })();