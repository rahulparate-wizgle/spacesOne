import { listingStartDatepicker, listingEndDatepicker } from "../forms/datepicker";

export function initBookingForm() {
    return {
        startDatepickerEvent: listingStartDatepicker(),
        endDatepickerEvent: listingEndDatepicker(),
        dateValue: '',
        getDateValue(e){
            this.dateValue = e.target.getAttribute('data-value');
            //console.log('DATE: ', this.dateValue);
        },

        bookingFormExpanded: false,
        dateFormActive: false,
        participantsFormActive: false,
        openDatesPanel() {
            this.bookingFormExpanded = true;
            this.participantsFormActive = false;
            this.dateFormActive = true;
        },
        openParticipantsPanel() {
            this.bookingFormExpanded = true;
            this.dateFormActive = false;
            this.participantsFormActive = true;
        },
        closeBookingPanel() {
            this.bookingFormExpanded = false;
            this.dateFormActive = false;
            this.participantsFormActive = false;
        }
    }
}