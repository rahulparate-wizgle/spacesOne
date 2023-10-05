import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { jobListModel } from './list.model';
import { JobListService } from './list.service';
import { NgbdJobListSortableHeader, SortEvent } from './list-sortable.directive';
import { enquirylistApiService } from './enquirylist-api.service';
import { Router } from '@angular/router';
import { status } from "../status.data";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger ms-2'
  },
  buttonsStyling: false
});
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [JobListService, DecimalPipe]
})

/**
 * List Component
 */
export class ListComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  jobListForm!: UntypedFormGroup;
  submitted = false;
  selectAssign: any[];
  // Table data
  content?: any;
  lists?: any;
  jobList!: Observable<jobListModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdJobListSortableHeader) headers!: QueryList<NgbdJobListSortableHeader>;
  listdata: any[];
  showResetBtn: boolean = false;
  filterBy;
  data: any;
  selectLocations: string[];
  selectName: string[];
  pageSize: any;
  pageNo: any;
  filterForm: UntypedFormGroup;
  usersData: any;
  search: any = {};
  listData: Object;
  enquirylistData: any;
  filteredEnquiryList: any[];
  enquiryList: any[];
  selectValue: any[];
  textStatus: any;
  p : number = 1;
  filterData: any[];

  constructor(
    public router: Router,
    private modalService: NgbModal,
    public service: JobListService,
    private formBuilder: UntypedFormBuilder,
    private enquiryListService: enquirylistApiService
  ) {
    this.jobList = service.jobList$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Enquiry' }, { label: 'Enquiry List', active: true }];

    /**
     * Form Validation
     */
    this.jobListForm = this.formBuilder.group({
      id: "11",
      ids: [''],
      title: ['', [Validators.required]],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      position: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    this.filterForm = this.formBuilder.group({
      // address: [""],
      venueName: [""],
      enquiryDate: [""],
      status: [""],

    });

    /**
    * fetches data
    */
    this.jobList.subscribe(x => {
      this.content = this.lists;
      this.lists = Object.assign([], x);
    });
    this.selectValue = status
    this.getAllList()
    this.getAllListForFilter();

  }

  async getAllEnquiryList() {
    this.showResetBtn = true;
    this.search = {};
    // if (this.filterForm.value.address?.address?.length > 0) {
    //   this.search.address = this.filterForm.value.address.address;
    // }
    if (this.filterForm.value.status) {
      this.search.status = this.filterForm.value.status;
    }
    if (this.filterForm.value.venueName?.name?.length > 0) {
      this.search.venueId = this.filterForm.value.venueName?.id;
    }
    if (this.filterForm.value.enquiryDate?.length > 0) {
      this.search.enquiryDate = this.filterForm.value.enquiryDate;
    }


    (await this.enquiryListService.getenquiryList(this.pageSize, this.pageNo, this.search)).subscribe(res => {
      this.filteredEnquiryList = res;
      this.enquiryList = [...this.filteredEnquiryList];
    })
    this.filterForm.reset();
    this.modalService.dismissAll();
  }

  resetAll() {
    this.filterForm.reset();
    this.getAllList();
  }

  async getAllList() {
    (await this.enquiryListService.getList()).subscribe(res => {
      this.listdata = res;
      this.enquiryList = [...this.listdata];
    })
  }


  async getAllListForFilter() {
    (await this.enquiryListService.getList()).subscribe(res => {
      this.filterData = this.getUniqueVenues(res);
    })
  }


  // Helper function to filter out duplicate venues
 getUniqueVenues(data: any[]): any[] {
  const uniqueVenues = [];
  const uniqueVenueNames = new Set();

  for (const item of data) {
    const venueName = item?.venue?.name;
    if (!uniqueVenueNames.has(venueName)) {
      uniqueVenueNames.add(venueName);
      uniqueVenues.push(item);
    }
  }
  return uniqueVenues;
}

  filter() {
    this.enquiryList = [...this.listdata?.filter(data => data.name.toLowerCase().includes(this.filterBy.toLowerCase()))];
  }

  /**
  * Open modal
  * @param content modal content
  */
  openViewModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.lists.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  async deleteEnquiryData(id, event) {

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(async (result) => {
        if (result.value) {
      (await this.enquiryListService.deletEnquiry(id)).subscribe((res) => {
        this.getAllList();
      });
      } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
    }

  });
  };


  goingToMessage(id){
    this.router.navigate(['messages/' + id])
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {

    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  /**
   * Form data get
   */
  get form() {
    return this.jobListForm.controls;
  }
  onDetails(id) {
    this.router.navigate(['enquiry-details/' + id])
    console.log("ID");
    this.data = id;
  }


  /**
  * Save user
  */
  saveUser() {
    if (this.jobListForm.valid) {
      if (this.jobListForm.get('ids')?.value) {
        this.lists = this.lists.map((data: { id: any; }) => data.id === this.jobListForm.get('ids')?.value ? { ...data, ...this.jobListForm.value } : data)
      } else {
        const id = '11';
        const title = this.jobListForm.get('title')?.value;
        const name = this.jobListForm.get('name')?.value;
        const location = this.jobListForm.get('location')?.value;
        const experience = this.jobListForm.get('experience')?.value;
        const position = this.jobListForm.get('position')?.value;
        const type = this.jobListForm.get('type')?.value;
        const posted_date = "02 June 2021";
        const last_date = " Can I visit the banquet hall and sample the food prior to booking it?";
        const status = this.jobListForm.get('status')?.value;
        this.lists.push({
          id,
          title,
          name,
          location,
          experience,
          position,
          type,
          posted_date,
          last_date,
          status
        });
        this.modalService.dismissAll();
      }
    }
    this.modalService.dismissAll();
    setTimeout(() => {
      this.jobListForm.reset();
    }, 2000);
    this.submitted = true
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Order';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    var listData = this.lists.filter((data: { id: any; }) => data.id === id);
    this.jobListForm.controls['title'].setValue(listData[0].title);
    this.jobListForm.controls['name'].setValue(listData[0].name);
    this.jobListForm.controls['location'].setValue(listData[0].location);
    this.jobListForm.controls['experience'].setValue(listData[0].experience);
    this.jobListForm.controls['position'].setValue(listData[0].position);
    this.jobListForm.controls['type'].setValue(listData[0].type);
    this.jobListForm.controls['status'].setValue(listData[0].status);
    this.jobListForm.controls['ids'].setValue(listData[0].id);
  }


  getStatusInText(number: any) {

    if (number == "1") {
      this.textStatus = "New";
    }
    if (number == "2") {
      this.textStatus = "In Progress";
    }
    if (number == "3") {
      this.textStatus = "Booked";
    }
    if (number == "4") {
      this.textStatus = "Cancelled";
    }

    return this.textStatus;
  }

}
