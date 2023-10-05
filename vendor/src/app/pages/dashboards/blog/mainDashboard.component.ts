import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { visitorsOptions, popularPostData } from "./data";
import { ChartType } from "./mainDashboard.model";
import { ChartComponent } from "ng-apexcharts";
import { enquirylistApiService } from '../../enquiry-list/list/enquirylist-api.service';
import { VenuelistApiService } from '../../venue-list/venuelist-api.service';
import { designations } from 'src/app/services/constants/constants';

@Component({
  selector: 'app-mainDashboard',
  templateUrl: './mainDashboard.component.html',
  styleUrls: ['./mainDashboard.component.scss']
})

/**
 * Blog-dashboard component
 */
export class mainDashboardComponent implements OnInit {

  @ViewChild("chart", { static: false }) chart: ChartComponent;
  // visitor chart
  visitorsOptions: ChartType;
  popularPostData;
  public activeOptionButton = "all";
  // bread crumb items
  breadCrumbItems: Array<{}>;
  designation: string;

  user: any
  enquiryData: any;
  upcomingTasks: any;
  inprogressTasks: any;
  bookedTasks: any;
  cancelledTasks: any;
  totalVenues: any;
  textStatus: string;
  isManager: boolean = false;
  constDesignations = designations;

  constructor(
    public router: Router,
    private enquiryListService: enquirylistApiService,
    private venueService: VenuelistApiService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.designation = this.user?.designation;
  }

  ngOnInit(): void {
    this.getEnquiryData();
    this.getTotalVenues();
    this.breadCrumbItems = [{ label: 'Venue' }, { label: 'Dashboard', active: true }];
    /**
     * Fetches the data
     */
    this._fetchData();
  }

  public updateOptionsData = {
    "1m": {
      series: [{
        name: 'Current',
        data: [12, 22, 38, 42, 32, 40, 51, 36, 51, 29, 38, 36],
      }, {
        name: 'Previous',
        data: [22, 31, 36, 26, 47, 56, 42, 64, 61, 52, 42, 31],
      }]
    },
    "6m": {
      series: [{
        name: 'Current',
        data: [31, 40, 28, 51, 42, 40, 51, 36, 40, 39, 31, 36],
      }, {
        name: 'Previous',
        data: [11, 32, 45, 32, 34, 22, 51, 60, 51, 52, 40, 31],
      }]
    },
    "1y": {
      series: [{
        name: 'Current',
        data: [28, 22, 38, 42, 32, 40, 51, 36, 51, 29, 38, 36],
      }, {
        name: 'Previous',
        data: [22, 31, 36, 26, 47, 56, 42, 64, 61, 52, 42, 31],
      }]
    },
    all: {
      series: [{
        name: 'Current',
        data: [18, 21, 45, 36, 65, 47, 51, 32, 40, 28, 31, 26]
      }, {
        name: 'Previous',
        data: [30, 11, 22, 18, 32, 23, 58, 45, 30, 36, 15, 34]
      }]
    }
  };

  updateOptions(option: any) {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }

  private _fetchData() {
    this.visitorsOptions = visitorsOptions;
    this.popularPostData = popularPostData;
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

  async getTotalVenues() {
    (await this.venueService.getList()).subscribe((res) => {
      this.totalVenues = res;
    });
  }

  getStatusInText(number: any) {
    if (number == "1") {
      this.textStatus = "New";
    }
    return this.textStatus;
  }

  onDetails(id) {
    this.router.navigate(['enquiry-details/' + id])
  }

  allEnquiries() {
    this.router.navigate(['enquiries'])
  }
}
