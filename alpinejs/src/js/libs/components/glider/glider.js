import Glide from "@glidejs/glide";

export function initGlide() {
  new Glide(".glide", {
    type: "carousel",
    startAt: 0,
    perView: 4,
    autoplay: 2000,
    breakpoints: {
      767: {
        perView: 1,
      },
      900: {
        perView: 2,
      },
      1024: {
        perView: 3,
      },
    },
  }).mount();
}

export function initListingGlide() {
  new Glide(".available-dates-glide", {
    type: "carousel",
    startAt: 0,
    perView: 5,
    autoplay: 2000,
    breakpoints: {
      767: {
        perView: 1,
      },
      900: {
        perView: 3,
      },
      1024: {
        perView: 4,
      },
    },
  }).mount();
}

export function initMoreListingsGlide() {
  new Glide(".more-events-glide", {
    type: "carousel",
    startAt: 0,
    perView: 5,
    autoplay: 3000,
    breakpoints: {
      767: {
        perView: 1,
      },
      900: {
        perView: 3,
      },
      1024: {
        perView: 4,
      },
    },
  }).mount();
}

export function initBestRatedListingsGlide() {
  new Glide(".best-rated-events-glide", {
    type: "carousel",
    startAt: 0,
    perView: 5,
    autoplay: 3000,
    breakpoints: {
      767: {
        perView: 1,
      },
      900: {
        perView: 3,
      },
      1024: {
        perView: 4,
      },
    },
  }).mount();
}

export function initUpcomingListingsGlide() {
  new Glide(".upcoming-events-glide", {
    type: "carousel",
    startAt: 0,
    perView: 3,
    autoplay: 3000,
    breakpoints: {
      767: {
        perView: 1,
      },
      900: {
        perView: 2,
      },
      1024: {
        perView: 2,
      },
      1250: {
        perView: 2,
      },
    },
  }).mount();
}

export function initSuggestedListingsGlide() {
  new Glide(".suggested-events-glide", {
    type: "carousel",
    startAt: 0,
    perView: 3,
    autoplay: 3000,
    breakpoints: {
      767: {
        perView: 1,
      },
      900: {
        perView: 2,
      },
      1024: {
        perView: 2,
      },
      1250: {
        perView: 2,
      },
    },
  }).mount();
}

export function initListingCategoriesGlide() {
  new Glide(".categories-events-glide", {
    type: "carousel",
    startAt: 0,
    perView: 2.8,
    autoplay: 3000,
    breakpoints: {
      767: {
        perView: 1,
      },
      900: {
        perView: 2,
      },
      1024: {
        perView: 2,
      },
      1250: {
        perView: 2,
      },
    },
  }).mount();
}

export function initFlatCarouselsGlide() {
  const sliders = document.querySelectorAll(".flat-carousel");
  const config = {
    type: "carousel",
    startAt: 0,
    perView: 3,
    autoplay: 3000,
    breakpoints: {
      767: {
        perView: 1,
      },
      900: {
        perView: 2,
      },
      1024: {
        perView: 2,
      },
      1250: {
        perView: 2,
      },
    },
  };
  sliders.forEach((item) => {
    new Glide(item, config).mount();
  });
}
