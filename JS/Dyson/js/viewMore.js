// REVIEW VIEW MORE PHOTOS
export function showMorePhoto() {
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
}

// REVIEW VIEW MORE FEEDBACKS
export function showMoreFeedbacks() {
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
}

// NEWS VIEW MORE
export function showMoreNews() {
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
}
