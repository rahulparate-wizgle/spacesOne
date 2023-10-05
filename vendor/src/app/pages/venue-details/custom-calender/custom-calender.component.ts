import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "src/app/services/api.service";
import {status} from '../../enquiry-list/status.data';
import Swal from 'sweetalert2';
@Component({
  selector: "app-custom-calender",
  templateUrl: "./custom-calender.component.html",
  styleUrls: ["./custom-calender.component.scss"],
})
export class CustomCalenderComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public apiService: ApiService
  ) {}
  bookings: any;
  enquiries: any;
  selectedDateBooking: any;
  selectedDateEnquiries: any;
  venuesList: any;
  venueId: string = "";
  showDisabledIcon = false;
  calenderView: string = "month";
  bookingView: string = "list";

  bookingForm: any;
  year = new Date().getFullYear().toString();
  month = (new Date().getMonth() + 1).toString();
  day: string = new Date().getDate().toString();
  slYears: string[];
  slMonths: any[];
  slDays: string[];
  thDays: string[];
  weeks: any[] = [];
  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      id: [""],
      title: ["", [Validators.required]],
      from_date: ["", [Validators.required]],
      from_time: ["", []],
      to_date: ["", [Validators.required]],
      to_time: ["", []],
      details: ["", [Validators.required]],
      type: ["", [Validators.required]],
      tags: ["", [Validators.required]],
    });

    this.prepareDateControls();
    this.getVenuesList();
    this.getBookings();
    this.getEnquiries();
  }

  prepareDateControls() {
    if (!this.slYears) {
      this.slYears = [];
    }
    this.thDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.slMonths = [
      { value: "1", key: "January" },
      { value: "2", key: "February" },
      { value: "3", key: "March" },
      { value: "4", key: "April" },
      { value: "5", key: "May" },
      { value: "6", key: "June" },
      { value: "7", key: "July" },
      { value: "8", key: "August" },
      { value: "9", key: "September" },
      { value: "10", key: "October" },
      { value: "11", key: "November" },
      { value: "12", key: "December" },
    ];
    for (
      var i = new Date().getFullYear() - 1;
      i <= new Date().getFullYear() + 3;
      i++
    ) {
      this.slYears.push(i.toString());
    }
    this.bindDays();
  }

  bindDays() {
    var totalNoOfDays = new Date(
      parseInt(this.year),
      parseInt(this.month),
      0
    ).getDate();
    this.slDays = [];
    for (var i = 1; i <= totalNoOfDays; i++) {
      this.slDays.push(i.toString());
    }
    if(!this.day)
      this.day = new Date().getDate().toString();
  }

  displayCalender() {
    this.weeks = [];
    var startIndex = new Date(this.year + "/" + this.month + "/" + 1).getDay();
    var i = 1;
    var temp = [{}, {}, {}, {}, {}, {}, {}];
    var totalNoOfDays = new Date(
      parseInt(this.year),
      parseInt(this.month),
      0
    ).getDate();
    while (i <= totalNoOfDays) {
      temp[startIndex] = this.getCalenderDateInstance(i);
      if (startIndex == 6 || i == totalNoOfDays) {
        this.weeks.push(JSON.parse(JSON.stringify(temp)));
        startIndex = 0;
        temp = [{}, {}, {}, {}, {}, {}, {}];
      } else {
        startIndex++;
      }
      i++;
    }
  }
  getCalenderDateInstance(date: number) {
      let current = parseInt(
        this.year + this.roundOf10(this.month) + this.roundOf10(date)
      );
      let entries = this.bookings?.filter(
        (a) =>
          parseInt(
            a.from_year +
              this.roundOf10(a.from_month) +
              this.roundOf10(a.from_day)
          ) <= current &&
          parseInt(
            a.to_year + this.roundOf10(a.to_month) + this.roundOf10(a.to_day)
          ) >= current
      );

      let enquiries = this.enquiries?.filter(
        (a) =>
          parseInt(
            a.from_year +
              this.roundOf10(a.from_month) +
              this.roundOf10(a.from_day)
          ) == current
      );
    return {
      entries: entries.slice(0,3) ?? [],
      remainingEntries: entries.length - 3,
      enquiries:enquiries?.slice(0,3) ?? [],
      remainingEnquires: enquiries?.length - 3,
      date: date,
    };
  }

  StaticModal(StaticDataModal: any, _date: string) {
    this.day = _date;
    this.syncSelectedDateBooking();
    this.modalService.open(StaticDataModal, {
      centered: true,
      backdrop: "static",
      size: "lg",
    });
  }


//*****Booking Service
  async addBooking() {
    if (this.bookingForm.status != "INVALID") {
      let vendorId = JSON.parse(localStorage.getItem("user"))?.vendorId;

      let bookingObj = {
        id: this.bookingForm.value.id,
        title: this.bookingForm.value.title,
        from_day: parseInt(this.bookingForm.value.from_date.split("-")[2]),
        from_month: parseInt(this.bookingForm.value.from_date.split("-")[1]),
        from_year: parseInt(this.bookingForm.value.from_date.split("-")[0]),
        to_day: parseInt(this.bookingForm.value.to_date.split("-")[2]),
        to_month: parseInt(this.bookingForm.value.to_date.split("-")[1]),
        to_year: parseInt(this.bookingForm.value.to_date.split("-")[0]),
        from_time: this.bookingForm.value.from_time,
        to_time: this.bookingForm.value.to_time,
        details: this.bookingForm.value.details,
        type: this.bookingForm.value.type,
        tags: this.bookingForm.value.tags,
        isDayFor: "booking",
        status: 1,
        venueId: this.venueId,
        vendorId: vendorId,
      };

      if (this.bookingForm.value.id?.length) {
        (
          await this.apiService.commonPatch(
            "venue-bookings/" + this.bookingForm.value.id,
            bookingObj
          )
        ).subscribe(
          (res) => {
            this.bookingView = "list";
            let booking = this.bookings.find(
              (a) => a.id == this.bookingForm.value.id
            );
            let index = this.bookings.indexOf(booking);
            this.bookings[index] = bookingObj;
            this.displayCalender();
            this.syncSelectedDateBooking();
            this.bookingForm.reset();
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        delete bookingObj.id;
        (
          await this.apiService.commonPost("venue-bookings", bookingObj)
        ).subscribe(
          (res) => {
            if (res) {
              this.bookingForm.reset();
              this.bookings.push(res);
              this.bookingView = "list";
              this.displayCalender();
              this.syncSelectedDateBooking();
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      let errors = this.apiService.getFormValidationErrors(this.bookingForm);
    }
  }


  async getBookings() {
    let query = {
      where: {},
    };
    query["where"]["and"] = [
      { from_year: this.year },
      { from_month: this.month },
    ];
    if (this.venueId) {
      query["where"]["and"].push({ venueId: this.venueId });
    }
    (await this.apiService.commonGet("venue-bookings", query)).subscribe(
      (res) => {
        this.bookings = res;
        this.displayCalender();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async getVenuesList() {
    (await this.apiService.commonGet("/vendor-venue")).subscribe(
      (res) => {
        this.venuesList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeBookingView(view) {
    this.bookingView = view;
    if (view == "add") {
      this.bookingForm.patchValue({
        from_date:
          this.year +
          "-" +
          this.roundOf10(this.month) +
          "-" +
          this.roundOf10(this.day),
      });
    }
  }


  editBooking(id) {
    let booking = this.bookings.find((a) => a.id == id);
    this.bookingForm.patchValue(booking);
    this.bookingForm.patchValue({
      from_date:
        booking.from_year +
        "-" +
        this.roundOf10(booking.from_month) +
        "-" +
        this.roundOf10(booking.from_day),
      to_date:
        booking.to_year +
        "-" +
        this.roundOf10(booking.to_month) +
        "-" +
        this.roundOf10(booking.to_day),
    });
    this.bookingView = "add";
  }

  async deleteBooking(id) {
    let response = confirm("Are you sure you want to delete the booking ? ");
    if (response) {
      (await this.apiService.commonDelete("venue-bookings/" + id)).subscribe(
        (res) => {
          let booking = this.bookings.find((a) => a.id == id);
          let index = this.bookings.indexOf(booking);
          this.bookings.splice(index, 1);
          this.displayCalender();
          this.syncSelectedDateBooking();
        },
        (err) => {}
      );
    }
  }

  closeBookingPopup() {
    this.bookingView = "list";
    this.modalService.dismissAll();
  }

  async getEnquiries() {
    let query = {
      where: {},
      "include":[{"relation":"customer"}]
    };
    query["where"]["and"] = [
      { from_year: this.year },
      { from_month: this.month },
    ];
    if (this.venueId) {
      query["where"]["and"].push({ venueId: this.venueId });
    }
    (await this.apiService.commonGet("/enquiry", query)).subscribe(
      (res) => {
        this.enquiries = res;
        this.displayCalender();
      },
      (err) => {
        console.log(err);
      }
    );
  }


  // Document Modal
  helpModal(helpModal: any) {
    this.modalService.open(helpModal, {
      size: "lg",
      centered: true,
      scrollable: true,
    });
  }
  // Document Modal

  dateChange(res) {
    if (res == -1) {
      this.day = (parseInt(this.day) - 1).toString();
    } else {
      this.day = (parseInt(this.day) + 1).toString();
    }
    this.syncSelectedDateBooking();
  }

  selectDate(event) {
    this.day = event.target.value;
    this.syncSelectedDateBooking();
  }

  changeCalenderView(view: string) {
    this.calenderView = view;
    this.syncSelectedDateBooking();
  }

  changeMonthYear() {
    this.bindDays();
    this.getBookings();
    this.getEnquiries();
    this.syncSelectedDateBooking();
  }

  //**** Calender Data Bind *
  syncSelectedDateBooking() {
    let current = parseInt(
      this.year + this.roundOf10(this.month) + this.roundOf10(this.day)
    );
    this.selectedDateBooking = this.bookings.filter(
      (a) =>
        parseInt(
          a.from_year +
            this.roundOf10(a.from_month) +
            this.roundOf10(a.from_day)
        ) <= current &&
        parseInt(
          a.to_year + this.roundOf10(a.to_month) + this.roundOf10(a.to_day)
        ) >= current
    );
    this.selectedDateEnquiries = this.enquiries.filter(
      (a) =>
        parseInt(
          a.from_year +
            this.roundOf10(a.from_month) +
            this.roundOf10(a.from_day)
        ) == current
    );

  }


  //********** Utils
  roundOf10(month) {
    return month < 10 ? "0" + month : month;
  }
  stringToColorCode(str) {
    let color = '';
    switch(str){
      case 1:
        color = 'eff2f7'
        break;
      case 2:
        color = 'fde3b6'
      break;
      case 3:
        color = 'bbc5f7'
      break;
      case 4:
        color = 'f8d0d0'
      break;
    }

    return "background-color:#" + color;
  }

  getStatusString(str) {
    return status.find(a=>a.id == str)?.status ?? '';
  }


blockDay(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-secondary ms-2'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure you want to block?',
      icon: 'warning',
      confirmButtonText: 'Yes, Block',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    })
    .then(async result => {
      if (result.value) {
          let vendorId = JSON.parse(localStorage.getItem("user"))?.vendorId;
          let bookingObj = {
            id: this.bookingForm.value.id,
            title: "Not Available",
            from_day: parseInt(this.day),
            from_month:parseInt(this.month),
            from_year: parseInt(this.year),
            to_day: parseInt(this.day),
            to_month: parseInt(this.month) ,
            to_year:parseInt(this.year),
            from_time: "04:00 AM",
            to_time: "00:00 PM",
            isDayFor: "block",
            status: 1,
            venueId: this.venueId,
            vendorId: vendorId,
          };

          if (this.bookingForm.value.id?.length) {
            (
              await this.apiService.commonPatch(
                "venue-bookings/" + this.bookingForm.value.id,
                bookingObj
              )
            ).subscribe(
              (res) => {
                this.bookingView = "list";
                let booking = this.bookings.find(
                  (a) => a.id == this.bookingForm.value.id
                );
                let index = this.bookings.indexOf(booking);
                this.bookings[index] = bookingObj;
                this.displayCalender();
                this.syncSelectedDateBooking();
                this.bookingForm.reset();
              },
              (err) => {
                console.log(err);
              }
            );
          } else {
            delete bookingObj.id;
            (
              await this.apiService.commonPost("venue-bookings", bookingObj)
            ).subscribe(
              (res) => {
                if (res) {
                  this.bookingForm.reset();
                  this.bookings.push(res);
                  this.bookingView = "list";
                  this.displayCalender();
                  this.syncSelectedDateBooking();
                }
              },
              (err) => {
                console.log(err);
              }
            );
          }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    });
}

}
