import {
  Component,
  QueryList,
  ViewChildren,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { DecimalPipe, formatDate } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Options } from "ng5-slider";
import { FormBuilder, Validators } from "@angular/forms";
import { contactFormList, VenueListModel } from "./venue-list.model";
import { JobGridService } from "./venue-list.service";
import { status } from "../enquiry-list/status.data";
import {
  NgbdJobGridSortableHeader,
  SortEvent,
} from "./venue-sortable.directive";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { VenuelistApiService } from "./venuelist-api.service";
import Swal from "sweetalert2";
import { LocationService } from "../location.service";
import { VendorsService } from "../vendor/vendors.service";
import { enquirylistApiService } from "../enquiry-list/list/enquirylist-api.service";
import { vendorType } from "../enquiry-list/type.data";
import { designations } from 'src/app/services/constants/constants';
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});
@Component({
  selector: "app-VenueList",
  templateUrl: "./venue-list.component.html",
  styleUrls: ["./venue-list.component.scss"],
  providers: [JobGridService, DecimalPipe],
})
export class VenueListComponent implements OnInit {


  visibleSelection = 5000;
  visibleBarOptions: Options = {
    floor: 250,
    ceil: 5000,
    showSelectionBar: true
  };
  contactForm: any;
  filterForm: UntypedFormGroup;
  locationList = [];
  citiesList = [];
  companyList = [];
  selectStatus: any;
  validationError: any = {};
  contactModelObj: contactFormList = new contactFormList();
  lowValue = 40;
  highValue = 60;
  options: Options = {
    floor: 0,
    ceil: 100,
  };
  reSet: boolean = false;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public isCollapsed = true;
  submitted = false;
  // Table data
  content?: any;
  selectVenueType: any[];
  grids?: any;
  jobGrid!: Observable<VenueListModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdJobGridSortableHeader)
  headers!: QueryList<NgbdJobGridSortableHeader>;
  statusClass = "not-active";
  venueData: any;
  filteredUsers: any[];
  listData: any;
  filterBy;
  pageSize: any;
  pageNo: any;
  search: any = {};
  btndisable = true;
  formData: any;
  selected: string;
  hidden: boolean;
  designation: any;
  user: any;
  venueListData: any;
  address: any;
  companyData: any;
  venue: any;
  selectLocations: any;
  userDetails: any;
  vendor: any;
  today: string;
  externalProjectUrl = 'http://test.venues.one/#/venues/details/'
  listdata: any[];
  constDesignations=designations;

  constructor(
    public service: JobGridService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private venueListService: VenuelistApiService,
    private enquiryService: enquirylistApiService,
    private vendorService: VendorsService,
    private activeRoute: ActivatedRoute,

  ) {
    this.jobGrid = service.jobGrid$;
    this.total = service.total$;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.designation = this.user?.designation;
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    this.getVenueListData();
    (this.breadCrumbItems = [
      { label: "Jobs" },
      { label: "Jobs Grid", active: true },
    ]);
    this.filterForm = this.formBuilder.group({
      address: ["", [Validators.required]],
      type: [""],
      price: [""],
      cName: [""],
      location: [""]
    });


    this.jobGrid.subscribe((x) => {
      this.content = this.grids;
      this.grids = Object.assign([], x);
    });

    this.today = (new Date().toISOString().split('.')[0]).split('T')[0];
    this.contactForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+')]],
      mobNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      bookingDate: ["", [Validators.required]],
      message: ["", [Validators.required]],
      numberOfPeople: ["", [Validators.required]],
    });
    this.selectStatus = status;
    this.selected = "";
    this.hidden = true;

    this.getAllList();
  }
  confirmSubmit() {
    swalWithBootstrapButtons
      .fire({
        title: "You Want to Add?",
        icon: "warning",
        confirmButtonText: "Yes, Added!",
        cancelButtonText: "No, cancel!",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.postEnquiryData();

        }
      });
    this.selectStatus = status

  }
  getQuotation() {
    this.contactModelObj.emailQuotation = true;
    this.contactModelObj.venuePrice = parseFloat(this.venue?.pricing?.perUnit || 0);
    this.postEnquiryData()
  }


  get form() {
    return this.contactForm.controls;
  }
  async postEnquiryData() {
    this.contactModelObj.name = this.contactForm.value.name;
    this.contactModelObj.address = this.venue?.address;
    this.contactModelObj.enquiryDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    this.contactModelObj.bookingDate = this.contactForm.value.bookingDate;
    this.contactModelObj.emailId = this.contactForm.value.email;
    this.contactModelObj.mobileNumber = this.contactForm.value.mobNumber;
    this.contactModelObj.additionalMessage = this.contactForm.value.message;
    this.contactModelObj.status = this.selectStatus[0].id;
    this.contactModelObj.venueId = this.venue?.id;
    this.contactModelObj.vendorId = this.userDetails.vendorId;
    this.contactModelObj.internalComment = this.contactForm.value.comment;
    this.contactModelObj.numberOfPeople = this.contactForm.value.numberOfPeople;
    // this.contactModelObj.type = "Offline"
    this.contactModelObj.type = vendorType.Online;
    if (this.contactModelObj.emailQuotation) {

    }
    if (this.contactForm.status != "INVALID") {
      (await this.enquiryService.postEnquiry(this.contactModelObj)).subscribe(
        async (res: any) => {
          if (this.contactModelObj.emailQuotation) {
            swalWithBootstrapButtons.fire(
              {
                title: "Quotation is sent to your email.",
                icon: "success",
              }
            );
          }
          else {
            swalWithBootstrapButtons.fire(
              {
                title: "Your enquiry has been Added.",
                icon: "success",
              }
            );
          }

          this.modalService.dismissAll();
        }
      );
    }
  }
  async deleteVenueData(id) {
    const Enquiries = this.listdata.some(enquiry => enquiry.venueId === id);
    if (Enquiries) {
      Swal.fire({
        showCloseButton: true,
        showConfirmButton: false,
        icon: "warning",
        text: 'First Delete The Enquiry',
        customClass: {
          popup: 'custom-popup-class',
        },

      })
    } else {
      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure, You won't be able to revert this?",
        icon: "warning",
        confirmButtonText: "Yes, Delete!",
        cancelButtonText: "No",
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        (await this.venueListService.deleteVenue(id)).subscribe((res) => {
          this.getVenueListData();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    }
  }










  async getAllList() {
    (await this.enquiryService.getList()).subscribe(res => {
      this.listdata = res;
    })
  }

  async getAllVenueList() {
    this.search = {};
    this.reSet = true;

    if (this.filterForm.value.location?.length > 0) {
      this.search.location = this.filterForm.value.location;
    }
    if (this.filterForm.value.address?.length > 0) {
      this.search.city = this.filterForm.value.address;
    }
    if (this.filterForm.value.type?.length > 0) {
      this.search.type = this.filterForm.value.type;
    }
    if (this.filterForm.value.price > 0) {
      this.search['pricing.perUnit'] = { 'lt': this.filterForm.value.price };
    }
    if (this.filterForm.value.cName?.id?.length > 0) {
      this.search.vendorId = this.filterForm.value.cName.id;
    }
    (
      await this.venueListService.getVenueList(
        this.pageSize,
        this.pageNo,
        this.search
      )
    ).subscribe((res) => {
      this.venueListData = res;

      this.filteredUsers = [...this.venueListData];
    });
    this.modalService.dismissAll();
    this.filterForm.reset();
  }



  resetAll() {
    this.filterForm.reset();
    this.getVenueListData();
  }

  getCitiesListFromData(data) {
    let cities = data.map((a) => a.city);
    cities = cities.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
    return cities;
  }
  getLocationListFromData(data) {
    let location = data.map((a) => a.location);
    location = location.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
    return location;
  }




  async getVenueListData() {
    (await this.venueListService.getList()).subscribe((res) => {
      this.venueListData = res;
      if (this.citiesList.length == 0) {
        (this.citiesList = this.getCitiesListFromData(this.venueListData));
      }
      if (this.locationList.length == 0) {
        (this.locationList = this.getLocationListFromData(this.venueListData));
      }
      this.filteredUsers = [...this.venueListData];
    });
    this.getCompanyName();
  }

  filter() {
    this.filteredUsers = [
      ...this.venueListData.filter((data) =>
        data.name.toLowerCase().includes(this.filterBy.toLowerCase())
      ),
    ];
  }

  fullModal() {
    this.router.navigate(["/venue-details/0"]);
    // this.modalService.open(smallDataModal, {
    //   size: "fullscreen",
    //   windowClass: "modal-holder",
    // });
  }
  next() {
    this.modalService.dismissAll();
    this.router.navigate(["/venue-details/0"]);
  }
  setActiveClass(i) {
    this.statusClass = i;
  }

  openModal(content: any) {
    this.filterForm.patchValue({
      type: this.selectVenueType[0],
    });
    this.modalService.open(content);
  }
  centerModal(centerDataModal: any, data: any) {
    this.venue = data;
    this.modalService.open(centerDataModal, { centered: true });
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

  openEdit(id) {
    this.router.navigate(["/venue-details/" + id]);
  }

  async getCompanyName() {
    (await this.vendorService.getVendors()).subscribe((res) => {
      this.companyData = res;
    });
  }
  openPreview(id) {
    const url = this.externalProjectUrl + id;
    window.open(url, '_blank');
  }
  }
