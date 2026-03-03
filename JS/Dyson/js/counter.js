import { swiperCardsInstance } from './swiper.js';

// OFFERS COUNTER CARDS
export function counterCards() {
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
}

// OFFERS COUNTER PAGES
export function counterPages() {
  if (!swiperCardsInstance) {
    console.warn("swiperCardsInstance не инициализирован");
    return;
  }

  const updatePagination = () => {
    const totalSlides = swiperCardsInstance.slides.length / 2;
    const slidesPerGroup = swiperCardsInstance.params.slidesPerGroup;
    const currentPage = Math.floor(swiperCardsInstance.activeIndex / slidesPerGroup) + 1;
    const totalPages = Math.ceil(totalSlides / slidesPerGroup);

    const pageElement = document.querySelector(".offers__num-page .num-page");
    if (pageElement) {
      pageElement.textContent = `${currentPage} из ${totalPages}`;
    }
  };

  swiperCardsInstance.on("slideChange", updatePagination);
  swiperCardsInstance.on("resize", updatePagination);

  updatePagination();
}