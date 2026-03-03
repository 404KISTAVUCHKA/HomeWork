// REVIEW LIGHTBOX
export function lightbox() {
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
}
