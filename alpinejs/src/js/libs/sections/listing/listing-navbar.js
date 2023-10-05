export function initListingNavbar() {
    return {
      scrolled: false,
      scrolledFull: false,
      height: 160,
      bookingHeight: 2500,
      init() {
        const listingType = document.querySelector('[data-listing]').getAttribute('data-listing');
        const actionButton = document.getElementById('listing-navigation-action')
        if (listingType === 'event') {
          actionButton.innerText = 'Book this event'
        }
        else if (listingType === 'flat') {
          actionButton.innerText = 'Book this flat'
        }
        else if (listingType === 'trip') {
          actionButton.innerText = 'Book this trip'
        }
      },
      scroll() {
        let scrollValue = window.scrollY;
        if (scrollValue >= this.height) {
          this.scrolled = true;
        } else {
          this.scrolled = false;
        }
        if (scrollValue >= this.bookingHeight) {
          this.scrolledFull = true;
        } else {
          this.scrolledFull = false;
        }
        this.searchExpanded = false;
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
  