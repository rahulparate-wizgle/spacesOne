import Plyr from "plyr";

export function getUrlParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function switchDemoImages(env) {
  if (env === "development") {
    const targets = document.querySelectorAll("[data-demo-src]");
    if (typeof targets != "undefined" && targets != null) {
      for (var i = 0, len = targets.length; i < len; i++) {
        let demoUrl = targets[i].getAttribute("data-demo-src");
        targets[i].setAttribute("src", demoUrl);
      }
    }
  }
}

export function insertBgImages(env) {
  if (env != "development") {
    const targets = document.querySelectorAll("[data-background]");

    if (typeof targets != "undefined" && targets != null) {
      for (var i = 0, len = targets.length; i < len; i++) {
        let bgUrl = targets[i].getAttribute("data-background");
        targets[i].style.backgroundSize = "cover";
        targets[i].style.backgroundRepeat = "no-repeat";
        targets[i].style.backgroundImage = `url(${bgUrl})`;
      }
    }
  } else {
    const targets = document.querySelectorAll("[data-demo-background]");

    if (typeof targets != "undefined" && targets != null) {
      for (var i = 0, len = targets.length; i < len; i++) {
        let bgUrl = targets[i].getAttribute("data-demo-background");
        targets[i].style.backgroundSize = "cover";
        targets[i].style.backgroundRepeat = "no-repeat";
        targets[i].style.backgroundImage = `url(${bgUrl})`;
      }
    }
  }
}

export function insertHrefs(env) {
  if (env === "development") {
    const targets = document.querySelectorAll("[data-demo-href]");

    if (typeof targets != "undefined" && targets != null) {
      for (var i = 0, len = targets.length; i < len; i++) {
        let href = targets[i].getAttribute("data-demo-href");
        targets[i].setAttribute("href", href);
      }
    }
  }
}

export function insertPosters(env) {
  if (env === "development") {
    const targets = document.querySelectorAll("[data-demo-poster]");

    if (typeof targets != "undefined" && targets != null) {
      for (var i = 0, len = targets.length; i < len; i++) {
        let href = targets[i].getAttribute("data-demo-poster");
        targets[i].setAttribute("poster", href);
      }
    }
  }
}

export function initModals() {
  const mainNavigation = document.querySelector(".main-navigation");
  let targets = document.querySelectorAll(".modal-trigger");
  if (typeof targets != "undefined" && targets != null) {
    for (var i = 0, len = targets.length; i < len; i++) {
      targets[i].addEventListener("click", function (event) {
        //console.log("click modal");
        var modalID = this.getAttribute("data-modal");
        document.querySelector("#" + modalID).classList.add("is-active");
        const scrollY =
          document.documentElement.style.getPropertyValue("--scroll-y");
        const body = document.body;
        body.style.width = "100%";
        body.style.paddingRight = "15px";
        body.style.position = "fixed";

        body.style.top = `-${scrollY}`;
        if (typeof mainNavigation != "undefined" && mainNavigation != null) {
          mainNavigation.classList.add("backdropped");
        }
      });
    }
  }

  targets = document.querySelectorAll(".modal-dismiss");
  if (typeof targets != "undefined" && targets != null) {
    for (var i = 0, len = targets.length; i < len; i++) {
      targets[i].addEventListener("click", function (event) {
        //console.log("click modal close");
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = "";
        body.style.paddingRight = "";
        body.style.width = "";
        body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
        this.closest(".modal").classList.remove("is-active");
        if (typeof mainNavigation != "undefined" && mainNavigation != null) {
          mainNavigation.classList.remove("backdropped");
        }
      });
    }
  }

  window.addEventListener("scroll", () => {
    document.documentElement.style.setProperty(
      "--scroll-y",
      `${window.scrollY}px`
    );
  });
}

export function initVideoPlayers(environment) {
  const player = document.querySelector(".video-player");

  if (typeof player != "undefined" && player != null) {
    if (environment === "development") {
      const targets = document.querySelectorAll("[data-demo-poster]");
      for (var i = 0, len = targets.length; i < len; i++) {
        let poster = targets[i].getAttribute("data-demo-poster");
        if (poster !== undefined) {
          targets[i].setAttribute("data-poster", poster);
        }
      }
      const players = Array.from(
        document.querySelectorAll(".video-player")
      ).map((p) => new Plyr(p));
    } else {
      const players = Array.from(
        document.querySelectorAll(".video-player")
      ).map((p) => new Plyr(p));
    }
  }
}
