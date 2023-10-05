export function initLandingNavbar() {
  return {
    scrolled: false,
    height: 60,
    mobileOpen: false,
    scroll() {
      let scrollValue = window.scrollY;
      if (scrollValue >= this.height) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
      this.searchExpanded = false;
    },
    openMobileMenu() {
      this.mobileOpen = !this.mobileOpen;
    },
    initScrollAnchors() {
      document
        .querySelectorAll('.scroll-link[href^="#"]')
        .forEach((trigger) => {
          trigger.onclick = function (e) {
            e.preventDefault();
            let hash = this.getAttribute("href");
            let target = document.querySelector(hash);
            let headerOffset = 0;
            let elementPosition = target.offsetTop;
            let offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          };
        });
    },
  };
}
