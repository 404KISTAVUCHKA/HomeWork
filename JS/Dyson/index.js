import BurgerMenu from "./js/burger.js";
import Modal from "./js/modal.js";

document.addEventListener("DOMContentLoaded", function () {
  // Бургер меню
  try {
    new BurgerMenu({
      BURGER: "burger",
      BURGER_OPEN: "burger--open",
      HEADER_MENU: "header__menu",
      HEADER_MENU_OPEN: "header__menu--open",
      lABEL: {
        OPEN: "Открыть меню",
        CLOSE: "Закрыть меню",
      },
      PAGE_BODY: "page__body",
      PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
      MENU_LINK: "menu__link",
      BREAKPOINT: 1920,
      MAIN: "main",
    });

    // Модальное окно
    new Modal({
      PAGE_BODY: "page__body",
      PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
    });
  } catch (error) {
    console.error(error);
  }

  // Dropdown для секции Offers
  const dropdowns = document.querySelectorAll(".offers__dropdown");

  function closeAllDropdowns(except = null) {
    dropdowns.forEach((drop) => {
      if (drop !== except) {
        drop.classList.remove("open");
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".offers__dropdown")) {
      closeAllDropdowns();
    }
  });

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropbtn");
    const content = dropdown.querySelector(".dropdown-content");
    const buttonText = dropdown.querySelector(".dropbtn__text");
    const links = dropdown.querySelectorAll(".dropdown__link");

    if (!button || !content || !buttonText) return;

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains("open");
      closeAllDropdowns(dropdown);
      if (!isOpen) {
        dropdown.classList.add("open");
      }
    });

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedText = link.textContent;
        buttonText.textContent = selectedText;
        dropdown.classList.remove("open");
      });
    });
  });

  // Слайдер для Offers
  function enableDragScroll(element) {
    let isDown = false;
    let startX;
    let scrollLeft;

    element.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDown = true;
      element.classList.add("offers__list--grabbing");
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    });

    element.addEventListener("mouseleave", () => {
      isDown = false;
      element.classList.remove("offers__list--grabbing");
    });

    element.addEventListener("mouseup", () => {
      isDown = false;
      element.classList.remove("offers__list--grabbing");
    });

    element.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
    });
  }

  const offersMoreButton = document.querySelector(".offers__choice-more");
  if (offersMoreButton) {
    offersMoreButton.addEventListener("click", (e) => {
      e.preventDefault();
      const categoryList = document.querySelector(".offers__list");
      if (!categoryList) return;

      const newCategories = [
        "dyson стайлер для длинных волос",
        "dyson стайлер красный",
        "dyson hs01 airwrap compliete",
        "фен щетка дайсон",
        "dyson supersonic",
        "dyson airwrap",
      ];

      newCategories.forEach((text) => {
        const li = document.createElement("li");
        li.className = "offers__item";
        const a = document.createElement("a");
        a.className = "offers__link";
        a.href = "#";
        a.textContent = text;
        li.appendChild(a);
        categoryList.appendChild(li);
      });

      categoryList.classList.add("offers__list--slider");

      enableDragScroll(categoryList);

      offersMoreButton.style.display = "none";
    });
  }

  // Счетчики в карточках Offers
  document.querySelectorAll(".offers__card").forEach((card) => {
    const counterElement = card.querySelector(".counter__text");
    const minusBtn = card.querySelector(".counter__button-minus");
    const plusBtn = card.querySelector(".counter__button-plus");

    if (!counterElement || !minusBtn || !plusBtn) return;

    let count = parseInt(counterElement.textContent, 10) || 1;

    const updateCounter = () => {
      counterElement.textContent = count;
      minusBtn.disabled = count <= 0;
      plusBtn.disabled = count >= 99;
    };

    minusBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (count > 0) {
        count--;
        updateCounter();
      }
    });

    plusBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (count < 99) {
        count++;
        updateCounter();
      }
    });

    updateCounter();
  });

  const swiper = new Swiper(".mySwiper", {
    grabCursor: true,

    // Базовые настройки (для мобильных)
    slidesPerView: 2,
    grid: {
      rows: 2,
      fill: "row",
    },
    spaceBetween: 10,
    slidesPerGroup: 2,

    navigation: {
      nextEl: ".offers__button-next",
      prevEl: ".offers__button-prev",
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        grid: {
          rows: 2,
          fill: "row",
        },
      },
    },
  });

  // Функция обновления счётчика страниц
  const updatePagination = () => {
    const totalSlides = (swiper.slides.length) / 2;
    const slidesPerGroup = swiper.params.slidesPerGroup;
    const currentPage = Math.floor(swiper.activeIndex / slidesPerGroup) + 1;
    const totalPages = Math.ceil(totalSlides / slidesPerGroup);

    const pageElement = document.querySelector(".offers__num-page .num-page");
    if (pageElement) {
      pageElement.textContent = `${currentPage} из ${totalPages}`;
    }
  };

  swiper.on("slideChange", updatePagination);
  swiper.on("resize", updatePagination);

  updatePagination();

  // "Смотреть все фото" в отзывах
  const photoLinks = document.querySelectorAll(".feedback__content-link");
  photoLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const reviewInner = link.closest(".feedback__inner");
      if (!reviewInner) return;

      const extraImages = reviewInner.querySelectorAll(
        ".feedback__content-img--hidden",
      );
      if (extraImages.length === 0) return;

      const areShown = extraImages[0].classList.contains(
        "feedback__content-img--shown",
      );

      extraImages.forEach((img) => {
        img.classList.toggle("feedback__content-img--shown");
      });

      link.textContent = areShown ? "Смотреть все фото" : "Скрыть фото";
    });
  });

  // Кнопка "Поазать еще" в отзывах
  const reviewButton = document.querySelector(
    ".review__button-more-inner .review__button-more",
  );
  if (reviewButton) {
    const hiddenCards = document.querySelectorAll(".review__card--hidden");
    const buttonText = reviewButton.querySelector(".button-more__link");
    const svgIcon = reviewButton.querySelector(".button__more-svg");

    reviewButton.addEventListener("click", () => {
      const areHidden = hiddenCards[0]?.classList.contains(
        "review__card--hidden",
      );

      hiddenCards.forEach((card) =>
        card.classList.toggle("review__card--hidden"),
      );
      buttonText.innerText = areHidden ? "Скрыть" : "Показать еще";

      if (svgIcon) {
        svgIcon.classList.toggle("button__more-svg--rotated");
      }
    });
  }

  // Lightbox для изображений в отзывах
  (function initLightbox() {
    // Создаём разметку lightbox, если её ещё нет
    if (document.querySelector(".lightbox")) return;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
    <div class="lightbox__content">
      <img class="lightbox__img" src="" alt="">
      <button class="lightbox__close" aria-label="Закрыть">&times;</button>
    </div>
  `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector(".lightbox__img");
    const closeBtn = lightbox.querySelector(".lightbox__close");

    // Функции открытия/закрытия
    function openLightbox(src) {
      lightboxImg.src = src;
      lightbox.classList.add("lightbox--open");
      document.body.classList.add("page__body--no-scroll"); // блокируем прокрутку
    }

    function closeLightbox() {
      lightbox.classList.remove("lightbox--open");
      document.body.classList.remove("page__body--no-scroll");
      lightboxImg.src = ""; // очищаем src
    }

    // Закрытие по клику на фон (overlay)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Закрытие по кнопке
    closeBtn.addEventListener("click", closeLightbox);

    // Закрытие по Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("lightbox--open")) {
        closeLightbox();
      }
    });

    // Делегирование событий: клик по любому видимому изображению отзыва
    const reviewsContainer = document.querySelector(
      ".review__feedback-container",
    );
    if (reviewsContainer) {
      reviewsContainer.addEventListener("click", (e) => {
        const img = e.target.closest(".feedback__content-img");
        // Проверяем, что изображение существует и видимо на странице
        if (img && img.offsetParent !== null) {
          e.preventDefault();
          openLightbox(img.src);
        }
      });
    }
  })();

  // Аккордеон для FAQ
  const headers = document.querySelectorAll(".accordeon__title");

  headers.forEach((header) => {
    header.addEventListener("click", function () {
      const item = this.parentElement;
      const panel = item.querySelector(".accordion-panel");
      const icon = this.querySelector(".accordion__icon-svg");

      const isOpen = panel.style.maxHeight && panel.style.maxHeight !== "0px";

      document.querySelectorAll(".accordion-panel").forEach((p) => {
        p.style.maxHeight = "0";
      });
      document.querySelectorAll(".accordion__icon-svg").forEach((ic) => {
        ic.classList.remove("accordion__icon-svg-accent");
      });

      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        if (icon) {
          icon.classList.add("accordion__icon-svg-accent");
        }
      }
    });
  });

  // Кнопка в новостях
  const newsButton = document.querySelector(
    ".news__button-more-inner .review__button-more",
  );
  if (newsButton) {
    const hiddenCards = document.querySelectorAll(".news__card--hidden");
    const buttonText = newsButton.querySelector(".button-more__link");
    const svgIcon = newsButton.querySelector(".button__more-svg");

    newsButton.addEventListener("click", () => {
      const areHidden =
        hiddenCards[0]?.classList.contains("news__card--hidden");

      hiddenCards.forEach((card) =>
        card.classList.toggle("news__card--hidden"),
      );
      buttonText.innerText = areHidden ? "Скрыть" : "Показать еще";

      if (svgIcon) {
        svgIcon.classList.toggle("button__more-svg--rotated");
      }
    });
  }
});
