// FAQ ACCORDEON
export function accordeon() {
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
}
