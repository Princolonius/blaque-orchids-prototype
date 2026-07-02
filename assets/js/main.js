/**
* Template Name: HeroBiz
* Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar .scrollto');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY;
      if (navbarlink.hash != '#header') position += 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Function to scroll to an element with top ofset
   */
  function scrollto(el) {
    const selectHeader = document.querySelector('#header');
    let offset = 0;

    if (selectHeader.classList.contains('sticked')) {
      offset = document.querySelector('#header.sticked').offsetHeight;
    } else if (selectHeader.hasAttribute('data-scrollto-offset')) {
      offset = selectHeader.offsetHeight - parseInt(selectHeader.getAttribute('data-scrollto-offset'));
    }
    window.scrollTo({
      top: document.querySelector(el).offsetTop - offset,
      behavior: 'smooth'
    });
  }

  /**
   * Fires the scrollto function on click to links .scrollto
   */
  let selectScrollto = document.querySelectorAll('.scrollto');
  selectScrollto.forEach(el => el.addEventListener('click', function(event) {
    if (document.querySelector(this.hash)) {
      event.preventDefault();

      let mobileNavActive = document.querySelector('.mobile-nav-active');
      if (mobileNavActive) {
        mobileNavActive.classList.remove('mobile-nav-active');

        let navbarToggle = document.querySelector('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }));

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  if (document.getElementById('gallery-categories')) {

    const categoryLabels = {
      'civil-engineering': 'Civil Engineering',
      'general-build': 'General Build',
      'hard-fm': 'Hard FM',
      'soft-fm': 'Soft FM',
    };

    const categoryOrder = ['civil-engineering', 'general-build', 'hard-fm', 'soft-fm'];
    const container = document.getElementById('gallery-categories');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    // gallery-scan.php lists whatever photos are currently in each
    // assets/img/gallery/<category> folder, so newly uploaded photos
    // show up automatically. Falls back to the static gallery.json
    // manifest if PHP isn't available (e.g. local static preview).
    fetch('gallery-scan.php')
      .then(res => {
        if (!res.ok) throw new Error('gallery-scan.php unavailable');
        return res.json();
      })
      .catch(() => fetch('gallery.json').then(res => res.json()))
      .then(data => {
        categoryOrder.forEach((cat, index) => {
          const files = data[cat] || [];
          const label = categoryLabels[cat] || cat;
          const isFirst = index === 0;

          const item = document.createElement('div');
          item.className = 'gallery-accordion-item';

          const button = document.createElement('button');
          button.type = 'button';
          button.className = `gallery-accordion-button${isFirst ? '' : ' collapsed'}`;
          button.setAttribute('data-bs-toggle', 'collapse');
          button.setAttribute('data-bs-target', `#gallery-collapse-${cat}`);
          button.setAttribute('aria-expanded', isFirst ? 'true' : 'false');
          button.setAttribute('aria-controls', `gallery-collapse-${cat}`);
          button.innerHTML = `<span>${label}</span><i class="bi bi-chevron-down chevron"></i>`;

          const heading = document.createElement('h2');
          heading.className = 'gallery-accordion-heading';
          heading.appendChild(button);

          const collapse = document.createElement('div');
          collapse.id = `gallery-collapse-${cat}`;
          collapse.className = `collapse${isFirst ? ' show' : ''}`;
          collapse.setAttribute('data-bs-parent', '#gallery-categories');

          const body = document.createElement('div');
          body.className = 'gallery-accordion-body';

          if (files.length) {
            const grid = document.createElement('div');
            grid.className = 'gallery-grid';

            files.forEach(filename => {
              const div = document.createElement('div');
              div.className = 'gallery-item';
              div.innerHTML = `
                <img src="assets/img/gallery/${cat}/${filename}" alt="${label} photo" loading="lazy" />
              `;
              grid.appendChild(div);
            });

            body.appendChild(grid);
          } else {
            const empty = document.createElement('p');
            empty.className = 'gallery-empty';
            empty.textContent = 'Photos coming soon.';
            body.appendChild(empty);
          }

          collapse.appendChild(body);
          item.appendChild(heading);
          item.appendChild(collapse);
          container.appendChild(item);
        });

        attachLightbox();
      });

    function attachLightbox() {
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
          const img = item.querySelector('img');
          const categoryTitle = item.closest('.gallery-accordion-item')?.querySelector('.gallery-accordion-button span');
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightboxCaption.textContent = categoryTitle ? categoryTitle.textContent : '';
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

  }



  /**
   * Mobile nav toggle
   */
  const mobileNavToogle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToogle) {
    mobileNavToogle.addEventListener('click', function(event) {
      event.preventDefault();

      document.querySelector('body').classList.toggle('mobile-nav-active');

      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Auto generate the hero carousel indicators
   */
  let heroCarouselIndicators = document.querySelector('#hero .carousel-indicators');
  if (heroCarouselIndicators) {
    let heroCarouselItems = document.querySelectorAll('#hero .carousel-item')

    heroCarouselItems.forEach((item, index) => {
      if (index === 0) {
        heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        heroCarouselIndicators.innerHTML += `<li data-bs-target="#hero" data-bs-slide-to="${index}"></li>`;
      }
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Testimonials Slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials Slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

let currentSlide = 0;
const totalSlides = document.querySelectorAll('.carousel-item').length;

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  document.querySelector('.carousel-inner').style.transform = `translateX(-${currentSlide * 100}%)`;
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  document.querySelector('.carousel-inner').style.transform = `translateX(-${currentSlide * 100}%)`;
}