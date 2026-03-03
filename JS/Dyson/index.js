import BurgerMenu from "./js/burger.js";
import Modal from "./js/modal.js";
import { offersDropdowns } from "./js/dropdowns.js";
import { swiperTags, swiperCards } from "./js/swiper.js";
import { counterCards, counterPages } from "./js/counter.js";
import {
  showMoreFeedbacks,
  showMoreNews,
  showMorePhoto,
} from "./js/viewMore.js";
import { lightbox } from "./js/lightbox.js";
import { accordeon } from "./js/accordeon.js";

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

  offersDropdowns();
  swiperTags();
  swiperCards();
  counterCards();
  counterPages();
  showMorePhoto();
  showMoreFeedbacks();
  lightbox();
  accordeon();
  showMoreNews();
});
