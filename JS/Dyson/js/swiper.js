export let swiperCardsInstance;

export function swiperTags() {
  new Swiper(".tagsSwiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
    grabCursor: true,
    touchRatio: 0.8,
  });
}

export function swiperCards() {
  swiperCardsInstance = new Swiper(".mySwiper", {
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
}