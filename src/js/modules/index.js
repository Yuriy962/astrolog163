import toggleBodyLock from './../helpers/toggleBodyLock';
import { html, firstScreen, header, burgerButton } from './../helpers/elementsNodeList';
import { Fancybox } from "@fancyapps/ui";

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

// logger (Full Logging System) ==========================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений ======================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле ===========================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо ==================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (target.classList.contains('_overlay-bg') || target.closest('.button-close')) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)
    }
  })
}

// Модуль работы с меню (бургер) =========================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}

const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector(".header__menu");
const mobileMenuItems = document.querySelectorAll(".menu__item");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle('hamburger--active');
  mobileMenu.classList.toggle("header__menu--active");
});


if (window.matchMedia("(max-width: 1200px)")){
  mobileMenuItems.forEach(item => {
    item.addEventListener("click", () => {
      mobileMenu.classList.remove("header__menu--active");
    });
  });
}

  const EMAIL_REGEXP = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    ///^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  const PHONE_REGEXP = /\+[7] \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/;


  $(document).on('load', function () {
    let headerSmrSCHOOL = document.querySelector('.header');
    $(document).scroll(function () {
        if(window.pageYOffset > headerSmrSCHOOL.offsetTop){
            headerSmrSCHOOL.style.boxShadow = '0 0 30px 1px rgba(0, 0, 0, 0.3)';
        }else{
            headerSmrSCHOOL.style.boxShadow = 'none';
        }
    });
  });

  $(document).on("load", function () {
    $("#form").on("submit", function (e) {
       e.preventDefault();
       let form = $(this);
    });
  });
  let sliderItems = document.querySelectorAll(".photos__item");

  $('.slider').slick({
    infinite: false,
    arrows:  sliderItems.length > 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: '<svg class="slick-next slider-arrow slider-arrow-next">' +
                  '<use xlink:href="#arrow-left"></use>' +
               '</svg>',
    prevArrow: '<svg class="slick-prev slider-arrow slider-arrow-prev">' +
                  '<use xlink:href="#arrow-left"></use>' +
               '</svg>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          arrows: true,
        }
      },
      ,
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          arrows: true
        }
      }
    ]
  });

  $('.reviews__slider').slick({
    infinite: false,
    arrows:  true,
    adaptiveHeight: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: '<svg class="slick-next slider-arrow reviews-arrow-next">' +
                  '<use xlink:href="#arrow-left"></use>' +
               '</svg>',
    prevArrow: '<svg class="slick-prev slider-arrow reviews-arrow-prev">' +
                  '<use xlink:href="#arrow-left"></use>' +
               '</svg>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        }
      },
      ,
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  export {
    FLS,
    isWebp,
    isMobile,
    addTouchClass,
    headerFixed,
    togglePopupWindows,
    addLoadedClass,
    getHash,
    setHash,
    menuInit,
    menuOpen,
    menuClose,
  };
