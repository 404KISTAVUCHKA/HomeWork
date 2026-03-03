import BurgerMenu from "./js/burger.js";
import Modal from "./js/modal.js";

document.addEventListener("DOMContentLoaded", function () {
  // BURGER MENU
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

    // MODAL
    new Modal({
      PAGE_BODY: "page__body",
      PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
    });
  } catch (error) {
    console.error(error);
  }

  // OFFERS DROPDOWN MENU
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

  // OFFERS SWIPER TAGS
  const tagsSwiper = new Swiper(".tagsSwiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
    grabCursor: true,
    touchRatio: 0.8,
  });

  // OFFERS COUNTER CARDS
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

  // OFFERS SWIPER CARDS
  const swiper = new Swiper(".mySwiper", {
    grabCursor: true,

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

  // OFFERS COUNTER PAGES
  const updatePagination = () => {
    const totalSlides = swiper.slides.length / 2;
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

  // REVIEW VIEW MORE PHOTOS
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

  // REVIEW VIEW MORE FEEDBACKS
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

  // REVIEW LIGHTBOX
  (function initLightbox() {
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

    function openLightbox(src) {
      lightboxImg.src = src;
      lightbox.classList.add("lightbox--open");
      document.body.classList.add("page__body--no-scroll");
    }

    function closeLightbox() {
      lightbox.classList.remove("lightbox--open");
      document.body.classList.remove("page__body--no-scroll");
      lightboxImg.src = "";
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    closeBtn.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("lightbox--open")) {
        closeLightbox();
      }
    });

    const reviewsContainer = document.querySelector(
      ".review__feedback-container",
    );
    if (reviewsContainer) {
      reviewsContainer.addEventListener("click", (e) => {
        const img = e.target.closest(".feedback__content-img");
        if (img && img.offsetParent !== null) {
          e.preventDefault();
          openLightbox(img.src);
        }
      });
    }
  })();

  // FAQ ACCORDEON
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

  // NEWS VIEW MORE
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
