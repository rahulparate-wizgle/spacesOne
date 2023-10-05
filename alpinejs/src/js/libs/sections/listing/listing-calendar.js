import {
  staticStartDatepicker,
  staticEndDatepicker,
} from "../../forms/datepicker";

export function initListingCalendar() {
  return {
    init() {
      staticStartDatepicker();
      staticEndDatepicker();
    },
  }
}