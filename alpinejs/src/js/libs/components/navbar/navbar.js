import {
    searchStartDatepicker,
    searchEndDatepicker,
} from "../../forms/datepicker";
import { CONSTANTS } from '../../../../js/libs/utils/constants';
export function initNavbar() {
    return {
        scrolled: false,
        height: 150,
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

        searchExpanded: false,
        expandSearch() {
            this.searchExpanded = true;
        },

        foldSearch() {
            this.searchExpanded = false;
        },

        searchActive: false,
        disableSearch() {
            this.searchActive = false;
        },

        locationDropOpened: false,
        startDatepicker: searchStartDatepicker,
        endDatepicker: searchEndDatepicker,
        startDateDropOpened: false,
        endDateDropOpened: false,
        typeDropOpened: false,
        accountDropOpened: false,

        openDrop(param) {
            switch (param) {
                case "location-drop":
                    this.locationDropOpened = true;
                    this.searchActive = true;
                    break;
                case "start-date-drop":
                    this.searchActive = true;
                    this.startDateDropOpened = true;
                    break;
                case "end-date-drop":
                    this.searchActive = true;
                    this.endDateDropOpened = true;
                    break;
                case "type-drop":
                    this.typeDropOpened = true;
                    this.searchActive = true;
                    break;
                case "account-drop":
                    this.accountDropOpened = true;
                    break;

                default:
                    console.log(`Sorry, something went wrong.`);
            }
        },

        closeDrop(param) {
            switch (param) {
                case "location-drop":
                    this.locationDropOpened = false;
                    break;
                case "start-date-drop":
                    this.startDateDropOpened = false;
                    break;
                case "end-date-drop":
                    this.endDateDropOpened = false;
                    break;
                case "type-drop":
                    this.typeDropOpened = false;
                    break;
                case "account-drop":
                    this.accountDropOpened = false;
                    break;

                default:
                    console.log(`Sorry, something went wrong.`);
            }
        },

        megamenuOpened: false,
        openedMegamenu: "megamenu-1",

        logout() {
            this.$store.app.isLoggedIn = false;
            window.location.href = "/";
        },
    };
}

export function initNavbarLight() {
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
        },
        accountDropOpened: false,

        openDrop(param) {
            switch (param) {
                case "account-drop":
                    this.accountDropOpened = true;
                    break;

                default:
                    console.log(`Sorry, something went wrong.`);
            }
        },

        closeDrop(param) {
            switch (param) {
                case "account-drop":
                    this.accountDropOpened = false;
                    break;

                default:
                    console.log(`Sorry, something went wrong.`);
            }
        },

        megamenuOpened: false,
        openedMegamenu: "megamenu-1",

        logout() {
            this.$store.app.isLoggedIn = false;
            window.location.href = "/";
        },
    };
}

export function getDataLocation() {
    return {
        venuesCities: ['Nagpur', 'Pune', 'Mumbai', 'Goa', 'Kolkata', 'Delhi', 'Dubai'],
        venuesTypes: [],
        init() {
            fetch(CONSTANTS.baseUrl + '/venue-types', {
                    method: 'GET',
                })
                .then((response) => response.json())
                .then((venues) => {
                    this.venuesTypes = venues;
                });
        }
    }
}

export function locationVenue() {
    return {
        loc: "",
        startDate: "",
        endDate: "",
        v: [],
        selectedVenue: '',
        setLocation: function(address) {
            this.loc = address;
        },
        setType: function(value) {
            this.selectedVenue = value;
            this.v.push(value)
        },
        setDate: function(sDate) {
            console.log('setDate ', sDate)
            this.startDate = sDate
        },
        setStartDate: function() {
            console.log(this.startDate)
        }
    };

}

export function venueTypeData() {
    return {
        v: [],
        selectedVenue: "",
        setType: function(value) {
            this.selectedVenue = value;
            this.v.push(value)
        },
    }
}

export function searchVenue() {
    return {
        search: {},
        searchVenueLocation: function() {
            this.search = {
                    location: this.loc,
                    venueType: this.v,
                    VenueDate: this.startDate,
                    people: this.number,
                    selectedVenue: this.selectedVenue
                }
                // let _startDate = document.getElementById('startDate').value;\

            let isMultiDate = document.getElementById('multi-day').checked;
            let arrParams = [];

            if (this.people) {
                arrParams.push('people=' + this.people)
            }
            if (this.selectedVenue) {
                arrParams.push('type=' + this.v.toString())
            }
            if (isMultiDate) {
                var e = document.getElementById("slLocation-m");
                let city = e.options[e.selectedIndex].text;
                let _startDate2 = document.getElementById('startDate2-m').value;
                let _endDate = document.getElementById('endDate-m').value;
                if (city) {
                    arrParams.push('city=' + city);
                }
                arrParams.push('__startDate=' + _startDate2);
                arrParams.push('__endDate=' + _endDate);
            } else {
                var e = document.getElementById("slLocation-s");
                let city = e.options[e.selectedIndex].text;
                let _startDate2 = document.getElementById('startDate2-s').value;
                if (city) {
                    arrParams.push('city=' + city);
                }
                arrParams.push('__startDate=' + _startDate2);
                arrParams.push('__endDate=' + _startDate2);
            }
            arrParams.push('__isMultiDate=' + isMultiDate)
            location.href = '/listing.html?' + arrParams.join('&');
        }
    }
}


export function form() {
    return {
        location: { errorMessage: "", blurred: false },
        eventDate: { errorMessage: "", blurred: false },
        number: { errorMessage: "", blurred: false },
        venueType: { errorMessage: "", blurred: false },

        input: function(event) {
            let ele = event.target;
            let rules = JSON.parse(ele.dataset.rules);
            this[ele.name].errorMessage = this.getErrorMessage(ele.value, rules);
        },
        submit: function(event) {
            let inputs = [...this.$el.querySelectorAll("input[data-rules]")];
            inputs.map((input) => {
                // if (Iodine.is(input.value, JSON.parse(input.dataset.rules)) !== true) {
                //     event.preventDefault();
                // }
            });
        },
        getErrorMessage: function(value, rules) {
            // let isValid = Iodine.is(value, rules);
            // if (isValid !== true) {
            //     return Iodine.getErrorMessage(isValid);
            // }
            return "";
        }
    };
}