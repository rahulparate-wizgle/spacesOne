import datepicker from "js-datepicker";

export function searchStartDatepicker() {
  const picker = document.querySelector(".search-datepicker-start");
  if (typeof picker != "undefined" && picker != null) {
    datepicker(".search-datepicker-start", {
      id: 1,
      overlayButton: "Confirm",
      minDate: new Date(),
      startDate: new Date(),
      showAllDates: true,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("en-EN", {
          month: "short",
          day: "numeric",
        });
        input.value = value;
      },
    });
  }
}

export function searchEndDatepicker() {
  const picker = document.querySelector(".search-datepicker-end");
  if (typeof picker != "undefined" && picker != null) {
    datepicker(".search-datepicker-end", {
      id: 1,
      overlayButton: "Confirm",
      minDate: new Date(),
      startDate: new Date(),
      showAllDates: true,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("en-EN", {
          month: "short",
          day: "numeric",
        });
        input.value = value;
      },
    });
  }
}

export function searchStartDatepickerMobile() {
    const picker = datepicker(".search-datepicker-start-mobile", {
    id: 2,
    overlayButton: "Confirm",
    minDate: new Date(),
    startDate: new Date(),
    showAllDates: true,
    alwaysShow: true,
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString("en-EN", {
        month: "short",
        day: "numeric",
      });
      input.value = value;
      input.setAttribute("data-value", value);
    },
  });
}

export function searchEndDatepickerMobile() {
    const picker = datepicker(".search-datepicker-end-mobile", {
    id: 2,
    overlayButton: "Confirm",
    minDate: new Date(),
    startDate: new Date(),
    showAllDates: true,
    alwaysShow: true,
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString("en-EN", {
        month: "short",
        day: "numeric",
      });
      input.value = value;
      input.setAttribute("data-value", value);
    },
  });
}

export function listingStartDatepicker() {
  const picker = document.querySelector(".event-datepicker-start");
  if (typeof picker != "undefined" && picker != null) {
    datepicker(".event-datepicker-start", {
      id: 3,
      overlayButton: "Confirm",
      minDate: new Date(),
      startDate: new Date(),
      showAllDates: true,
      alwaysShow: true,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("en-EN", {
          month: "short",
          day: "numeric",
        });
        input.value = value;
        input.setAttribute("data-value", value);
      },
    });
  }
}

export function listingEndDatepicker() {
  const picker = document.querySelector(".event-datepicker-end");
  if (typeof picker != "undefined" && picker != null) {
    datepicker(".event-datepicker-end", {
      id: 3,
      overlayButton: "Confirm",
      minDate: new Date(),
      startDate: new Date(),
      showAllDates: true,
      alwaysShow: true,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("en-EN", {
          month: "short",
          day: "numeric",
        });
        input.value = value;
        input.setAttribute("data-value", value);
      },
    });
  }
}

export function staticStartDatepicker() {
  const picker = document.querySelector(".static-datepicker-start");
  if (typeof picker != "undefined" && picker != null) {
    datepicker(".static-datepicker-start", {
      id: 4,
      alwaysShow: true,
      overlayButton: "Confirm",
      minDate: new Date(),
      startDate: new Date(),
      showAllDates: true,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("en-EN", {
          month: "short",
          day: "numeric",
        });
        input.value = value;
      },
    });
  }
}

export function staticEndDatepicker() {
  const picker = document.querySelector(".static-datepicker-end");
  if (typeof picker != "undefined" && picker != null) {
    datepicker(".static-datepicker-end", {
      id: 4,
      alwaysShow: true,
      overlayButton: "Confirm",
      minDate: new Date(),
      startDate: new Date(),
      showAllDates: true,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("en-EN", {
          month: "short",
          day: "numeric",
        });
        input.value = value;
      },
    });
  }
}