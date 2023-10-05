import {
  searchStartDatepickerMobile,
  searchEndDatepickerMobile,
} from "../../forms/datepicker";

function loadMonths(data) {
  for (let i = 0; i < data.length; i++) {
    const months = document.querySelector(".months");

    //Load months
    let monthBox = `
            <a data-index="${data[i].index}" class="month ${
      i === 0 ? "active" : ""
    }">${data[i].name}</a>
        `;

    months.appendChild(monthBox);
  }
}

function loadDays(data) {
  if (data.length > 0) {
    const dateSelector = document.querySelector(".date-selector");

    //Load days
    for (var i = 0; i < data.length; i++) {
      var dayBox = `
        <div data-month-index="${
            data[i].monthIndex
        }" class="date-box">
            <input type="radio" name="date_selection" ${
                i === 0 ? "checked" : ""
            } />
            <div class="date-box-inner">
                <div class="indicator">
                    <i class="fas fa-check"></i>
                </div>
                <span>${data[i].shortday}</span>
                <span>${data[i].dateNumeral}</span>
            </div>
        </div>
    `;

      dateSelector.appendChild(dayBox);
    }
  }
}

export function initNavbarMobile() {
  return {
    scrolled: false,
    height: 60,
    scroll() {
      let scrollValue = window.scrollY;
      if (scrollValue >= this.height) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
      this.searchExpanded = false;
    },

    mobileSearchOpened: false,
    toggleMobileSearch() {
      this.mobileSearchOpened = !this.mobileSearchOpened;
    },

    mobileSearchPanelOpened: false,
    toggleMobileSearchPanel() {
      this.mobileSearchPanelOpened = !this.mobileSearchPanelOpened;
      if (this.mobileSearchPanelOpened === false) {
        this.activeWizardStep = 0;
      }
    },

    activeWizardStep: 0,
    wizardForward(e) {
      e.target.classList.add("is-loading");
      setTimeout(() => {
        e.target.classList.remove("is-loading");
        this.activeWizardStep = this.activeWizardStep + 1;

        if (this.activeWizardStep === 2) {
          e.target.innerHTML = "Search";
        } else if (this.activeWizardStep === 3) {
          window.location.href = "/home-2.html";
        } else {
          e.target.innerHTML = "Next";
        }

        //console.log(this.activeWizardStep);
      }, 800);
    },

    wizardBack(e) {
      //console.log(e.target);
      e.target.classList.add("is-loading");
      setTimeout(() => {
        e.target.classList.remove("is-loading");
        if (this.activeWizardStep > 0) {
          this.activeWizardStep = this.activeWizardStep - 1;
        } else {
          this.toggleMobileSearchPanel();
        }
      }, 800);
    },
  };
}
