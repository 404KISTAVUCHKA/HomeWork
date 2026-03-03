// OFFERS DROPDOWN MENU
export function offersDropdowns(){
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
}