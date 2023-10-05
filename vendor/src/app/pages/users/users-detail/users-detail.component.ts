import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

import { revenueBarChart, statData } from './data';
import { ChartType } from './users-detail.model';
import { VenuelistApiService } from '../../venue-list/venuelist-api.service';



@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
  id: string;
  usersData: any = [];
  venuesData: any;
  breadCrumbItems: Array<{}>;
  revenueBarChart: ChartType;
  statData;
  venuesDataDetails: any;
  selectedVenue = '';
  assignedVenueIds: number[];
  constructor(private service: UsersService, private activeRoute: ActivatedRoute, private venueListService: VenuelistApiService
    // private venueListService:VenuelistApiService,
  ) { }

  ngOnInit(): void {

    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.getUsers(this.id);
    }
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this._fetchData();
    this.getVenue();
  }


  async getUsers(id) {
    (await this.service.getUsersbyId(id)).subscribe((res) => {
      this.usersData = res;
    });
  }
  async getVenue() {
    (await this.venueListService.getList()).subscribe((res) => {
      this.venuesData = res;
    })
  }

  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }

  getVenueName(id: number): string {
    return this.venuesData.find(x => x.id === id)?.name;
  }

}
