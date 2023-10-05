import { Component, OnInit } from '@angular/core';

import { works, teams, customers, highlights } from './about.model';
import { worksData, teamData, customersData, highlightsData } from './data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

/**
 * About Component
 */
export class AboutComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  worksData!: works[];
  teamData!: teams[];
  customersData!: customers[];
  highlightsData!: highlights[];

  constructor() { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'About', active: true }
    ];

    // Data Get Function
    this._fetchData();
  }

  // Data Fetch
  private _fetchData() {
    this.worksData = worksData;
    this.teamData = teamData;
    this.customersData = customersData;
    this.highlightsData = highlightsData;
  }

  /**
   * Swiper setting
   */
   config = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: true,
    navigation: true,
    loop:true
  };

  /**
   * Swiper setting
   */
   team = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    spaceBetween: 25,
    breakpoints:{
      768:{
        slidesPerView: 2,
      },
      1200:{
        slidesPerView: 4,
      }
    }
  };

  /**
   * Swiper setting
   */
   partners = {
    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 25,
    pagination:true,
    loop:true,
    breakpoints:{
      768:{
        slidesPerView: 4,
      },
      1200:{
        slidesPerView: 6,
      }
    }
  };

  /**
   * Swiper Customers setting
   */
   customers = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    spaceBetween: 25,
  };

  /**
   * Swiper setting
   */
   blogs = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 25,
    pagination: true,
    loop:true,
    breakpoints:{
      768:{
        slidesPerView: 2,
      },
      1200:{
        slidesPerView: 3,
      }
    }
  };

}
