import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DndDropEvent } from "ngx-drag-drop";
import { Task } from "../enquiry-data/enquiry-data.model";
import { enquirylistApiService } from "../list/enquirylist-api.service";
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: "app-enquiry-data",
  templateUrl: "./enquiry-data.component.html",
  styleUrls: ["./enquiry-data.component.scss"],
})
export class EnquiryDataComponent implements OnInit {
  upcomingTasks: Task[];
  inprogressTasks: Task[];
  bookedTasks: Task[];
  cancelledTasks: Task[];
  breadCrumbItems: Array<{}>;
  enquiryData: any;
  enquiryFilterData: any;
  id: any;
  data: any;
  submitted = false;
  filterForm: UntypedFormGroup;
  filterBy;
  search: any = {};
  filteredEnquiryList: any[];
  pageSize: any;
  pageNo: any;
  enquiryList: any[];
  filterData: any[];
  defaultVenueName: string | undefined;

  constructor(private enquiryListService: enquirylistApiService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    public router : Router) {}

  ngOnInit(): void {
    this.getEnquiryData();
     this.getAllListForFilter();

    this.filterForm = this.formBuilder.group({
      venueName: [""],
 });

   this.breadCrumbItems = [
      { label: "Venue" },
      { label: "Enquiry List", active: true },
    ];

  }


  /**
   * on dragging task
   * @param item item dragged
   * @param list list from item dragged
   */
  onDragged(item: any, list: any[]) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }

  /**
   * On task drop event
   */
  onDrop(event: DndDropEvent, filteredList?: any[], targetStatus?: string) {
 if (filteredList && event.dropEffect === "move") {
      let index = event.index;
      if (typeof index === "undefined") {
        index = filteredList.length;
      }
      filteredList.splice(index, 0, event.data);
      let data = event.data;
      if (targetStatus == 'upcoming-task') {
        data.status = 1;
      }
      if (targetStatus== 'Progress-task') {
        data.status = 2;
      }
      if (targetStatus == 'booked-task') {
        data.status = 3;
      }
      if (targetStatus == 'cancelled-task') {
        data.status = 4;
      }
      this.modifyStatus(data);
    }
  }
  delete(event: any) {
    event.target.closest(".card .task-box")?.remove();
  }

  async getEnquiryData() {
    (await this.enquiryListService.getList()).subscribe((res) => {
      this.enquiryData = res;
      this.upcomingTasks = this.enquiryData?.filter(
        (x) => x.status == 1
      );

      this.inprogressTasks = this.enquiryData?.filter(
        (x) => x.status == 2
      );
      this.bookedTasks = this.enquiryData?.filter((x) => x.status == 3);
      this.cancelledTasks = this.enquiryData?.filter(
        (x) => x.status == 4
      );
    });
  }



  async getAllListForFilter() {
   (await this.enquiryListService.getList()).subscribe(res => {
      this.filterData = this.getUniqueVenues(res);
        if (this.filterData.length > 0) {
          this.defaultVenueName = this.filterData[0]?.venue;
          this.filterForm.get('venueName').patchValue(this.defaultVenueName);
          this.getAllEnquiryList(this.defaultVenueName)
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
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
    this.enquiryList = [...this.enquiryData.filter(data => data.name.toLowerCase().includes(this.filterBy.toLowerCase()))];
  }

  async modifyStatus(data) {
    if (data.id) {
      (
        await this.enquiryListService.updateEnquiry(data.id, {
          status: data.status,
        })
      ).subscribe((res) => {
        this.enquiryData = res;
        this.getEnquiryData();
      });

    }
  }


  // For filters
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  async getAllEnquiryList(event) {
    let selectedValue = event.target? event.target.value: event;
    this.filterData = this.filterData.filter(item => item.venue?.name !== selectedValue);
    this.search = {};
    if (this.filterForm.value.venueName?.name?.length > 0) {
      this.search.venueId = this.filterForm.value.venueName?.id;
    }
      (await this.enquiryListService.getenquiryList(this.pageSize, this.pageNo, this.search)).subscribe(res => {
      this.enquiryFilterData = res;
      this.upcomingTasks = this.enquiryFilterData?.filter(
        (x) => x.status == 1
      );
      this.inprogressTasks = this.enquiryFilterData?.filter(
        (x) => x.status == 2
      );
      this.bookedTasks = this.enquiryFilterData?.filter((x) => x.status == 3);
      this.cancelledTasks = this.enquiryFilterData?.filter(
        (x) => x.status == 4
      );
    })
  }


  resetAll() {
    this.filterForm.reset();
    this.getEnquiryData();
  }


  onDetails(id) {
    this.router.navigate(['enquiry-details/' + id])
  }



}
