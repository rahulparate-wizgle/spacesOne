import { Component, OnInit } from '@angular/core';
// Range Slider
import { Options } from '@angular-slider/ngx-slider';

import { topOffer } from './rent.model';
import { topOfferData } from './data';
import { ApiService } from 'src/app/services/api.service';
import * as mapboxgl from 'mapbox-gl';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss'],
})

/**
 * Rent Component
 */
export class RentComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  topOfferData!: topOffer[];
  longitude = 20.728218;
  latitude = 52.128973;
  dataCount: any = {};
  checkedVal: any[] = [];
  venues: any;
  id: any;

  isLoading = false;
  options3: any

  venuesCities: string[] = [
    'Nagpur',
    'Pune',
    'Mumbai',
    'Goa',
    'Kolkata',
    'Delhi',
    'Dubai',
  ];
  venuesTypes: string[] = [];
  map: any;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 26.3398;
  lng = -81.7787;
  globalFilter: any = {};
  checkedVenueTypes: any;
  venueTypes: any;
  globalFilterKeys: string[] = [];
  checkedVenueRating: any;
  venuesUnfiltered: any;
  mainLocationList: any;
  searchedLocations: any;
  checkedVenueLocation: any;
  slider: any;
  constructor(private apiService: ApiService,
     public router: Router,
    private activeRoute:ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Venue Listing', active: true },
    ];
    this._getVenueTypes();
    // Data Get Function
    this._fetchData();
    this.options3 = {
			animation: {
				animationClass: 'transition', // done
				animationTime: 500,
			},
			swipe: {
				swipeable: false, // done
				swipeVelocity: .004, // done - check amount
			},
			drag: {
				draggable: false, // done
				dragMany: false, // todo
			},
      autoplay: {
				enabled: true,
				direction: 'right',
				delay: 5000,
				stopOnHover: true,
				speed: 6000,
			},
      arrows: true,
			infinite: false,
			breakpoints: [
				{
					width: 768,
					number: 1,
				},
				{
					width: 991,
					number: 1,
				}
			],
		}
  }

  goTODetails(id: any) {
    this.router.navigate(['venues/details/' + id]);
  }

  async _getVenueTypes() {
    (await this.apiService.commonGet('/venue-types')).subscribe((res: any) => {
      this.venueTypes = res;
    });
  }

  isSelectedType(type: string) {
    if (this.globalFilter.type?.length) {
      return this.globalFilter.type.split(',').indexOf(type) != -1;
    }
    return false;
  }

  // Data Fetch
  async _fetchData() {
    this.dataCount = topOfferData.length;
    this.topOfferData = topOfferData;
    this.topOfferDatas = Object.assign([], this.topOfferData);

    // let search =
    //   'type=Bar,House,Hotel&city=Mumbai&__startDate=2023-03-01&__endDate=2023-03-16&__isMultiDate=true';
    let fullUrl = window.location.href;
    let search = "";
    if (fullUrl.split('?').length > 1) {
      search = fullUrl.split('?')[1]
    }
    if (search?.length == 0) {
      search = 'type=Bar,House,Hotel&city=Mumbai';
    }
    this.globalFilter = JSON.parse(
      '{"' +
      decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
    );
    this.globalFilterKeys = Object.keys(this.globalFilter)?.filter(a => a.indexOf('__') == -1);
    this.checkedVenueTypes = this.globalFilter?.type?.split(',');
    let multiFilter = this.getCurrentMultiFilter(search);
    let multiInclude = this.getCurrentInclude(search);
    if (this.globalFilter.__people) {
      multiFilter = this.addCapacityFilter(multiFilter, this.globalFilter.__people);
    }
    let filterObj: any = {};
    if (multiFilter) {
      filterObj['where'] = multiFilter;
    }
    if (multiInclude) {
      filterObj['include'] = multiInclude;
    }

    this.isLoading = true;
    (await this.apiService.commonGet('/venues', filterObj)
    ).subscribe((res: any) => {
      this.venues = res;
      this.venuesUnfiltered = res;
      this.refreshLocations();
      this.isLoading = false;

      if (this.venues.length > 0) {
        let ven = this.venues[0];
        this.lat = ven?.mapping?.latitude;
        this.lng = ven?.mapping?.longitude;
      }
      this.initMap();
    });
  }

  addCapacityFilter(filter: any, dateRange: string) {
    if (!filter['and']) {
      filter['and'] = [];
    }
    // let arrRange = dateRange.split('-');
    // if (dateRange.indexOf('+') != -1) {
    //   filter['and'].push({ 'capacity.standing': { gt: arrRange[0].replace('+', '') } })
    // } else {
    //   filter['and'].push({ 'capacity.standing': { gt: arrRange[0].trim() } })
    //   filter['and'].push({ 'capacity.standing': { lt: arrRange[1].trim() } })
    // }
    return filter;
  }
  refreshGlobalFilter() {
    let search = window.location.search.replace('?', '');
    if (search?.length == 0) {
      // search = 'type=Bar,House,Hotel&city=Mumbai';
      this.globalFilterKeys = [];
      this.globalFilter = {};
    } else {
      this.globalFilter = JSON.parse(
        '{"' +
        decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
      );
      this.globalFilterKeys = Object.keys(this.globalFilter)?.filter(a => a.indexOf('__') == -1);
    }

  }
  async applyGlobalFilter() {
    let filteredVenues = this.venuesUnfiltered;

    this.refreshGlobalFilter();

    if (this.checkedVenueTypes?.length > 0) {
      this.globalFilter['type'] = this.checkedVenueTypes.toString();
      this.globalFilterKeys.push('type');
      filteredVenues = filteredVenues.filter((a: { type: any[]; }) => this.checkedVenueTypes.indexOf(a.type[0]) != -1)
    }
    if (this.checkedVenueRating?.length > 0) {
      this.globalFilter['rating'] = this.checkedVenueRating.toString();
      this.globalFilterKeys.push('rating');
      filteredVenues = filteredVenues.filter((a: { rating: any[]; }) => this.checkedVenueRating.indexOf(a.rating) != -1)
    }
    if (this.minValue) {
      this.globalFilter['min'] = this.minValue.toString();
      this.globalFilterKeys.push('min');
      filteredVenues = filteredVenues.filter((a: { pricing: { perUnit: number; }; }) => a.pricing?.perUnit > this.minValue)
    }
    if (this.maxValue) {
      this.globalFilter['max'] = this.maxValue.toString();
      this.globalFilterKeys.push('max');
      filteredVenues = filteredVenues.filter((a: { pricing: { perUnit: number; }; }) => a.pricing?.perUnit < this.maxValue)
    }
    if (this.checkedVenueLocation?.length > 0) {
      this.globalFilter['location'] = this.checkedVenueLocation.toString();
      this.globalFilterKeys.push('location');
      filteredVenues = filteredVenues.filter((a: { location: any[]; }) => this.checkedVenueLocation.indexOf(a.location) != -1)
    }

    this.venues = filteredVenues;
    this.updateMapWithData();
    let element: HTMLElement = document.getElementById('btnCloseFilter') as HTMLElement;
    element.click();
  }
  updateMapWithData() {
    this.refreshLocations();
    let updatedGeoJson = {
      type: 'FeatureCollection',
      features: this.venueListToMapFeat(this.venues),
    }
    this.map.getSource('places').setData(updatedGeoJson)
  }
  removeFilter(key: string) {
    delete this.globalFilter[key];
    this.applyGlobalFilter();
  }
  resetFilter() {
    this.venues = this.venuesUnfiltered;
    this.updateMapWithData();
    this.refreshGlobalFilter();
    let element: HTMLElement = document.getElementById('btnCloseFilter') as HTMLElement;
    element.click();
  }
  refreshLocations() {
    let venuesList = this.venuesUnfiltered;
    let locList = venuesList?.map((a: { location: any; }) => a.location);
    this.mainLocationList = locList?.filter((item: any, index: any) => locList.indexOf(item) === index);
    this.searchedLocations = this.mainLocationList;
  }
  searchLocations(e: any) {
    if (e.target.value?.length) {
      this.searchedLocations = this.mainLocationList.filter((a: string) => a?.toLowerCase()?.indexOf(e.target.value.toLowerCase()) != -1)
    } else {
      this.searchedLocations = this.mainLocationList
    }

  }

  getCountOnLocation(loc: string) {
    let count = this.venuesUnfiltered.filter((a: { location: string; }) => a.location == loc)?.length ?? 0;
    return '(' + count + ')';
  }

  sortListBy(event: any) {
    switch (event.target.value) {
      case 'Aprice':
        this.venues = this.venues.sort(function (a: { pricing: { perUnit: any; }; }, b: { pricing: { perUnit: any; }; }) {
          var keyA = a.pricing?.perUnit,
            keyB = b.pricing?.perUnit;
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        break;
      case 'Dprice':
        this.venues = this.venues.sort(function (a: { pricing: { perUnit: any; }; }, b: { pricing: { perUnit: any; }; }) {
          var keyA = a.pricing?.perUnit,
            keyB = b.pricing?.perUnit;
          // Compare the 2 dates
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        });
        break;
      case 'rating':
        this.venues = this.venues.sort(function (a: { rating: any; }, b: { rating: any; }) {
          var keyA = a.rating,
            keyB = b.rating;
          // Compare the 2 dates
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        });
        break;
      case 'Atitle':
        break;
    }
  }


  popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });
  initMap() {
    let _token =
      'pk.eyJ1Ijoic2h1YmhhbTAwNyIsImEiOiJjbGV3Z3N5Nm8wY2k0M3JxdzNjeWY0YmhoIn0.Mq5RBaZ8emRkwHq3Ivb1Wg';
    mapboxgl as typeof mapboxgl;
    this.map = new mapboxgl.Map({
      accessToken: _token,
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat],
    });
    // Add the control to the map.

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // Add geolocate control to the map.
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    this.map.on('load', () => {
      this.map.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.venueListToMapFeat(this.venues),
        },
      });
      // Add a layer showing the places.
      this.map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
          'text-field': ['get', 'description'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'icon-image': ['get', 'icon'],
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 14,
        },
        paint: {
          "text-color": "#671cc9",
          "text-halo-color": "#fff",
          "text-halo-width": 8
        },
      });

      // Create a popup, but don't add it to the map yet.

      this.map.on('mouseenter', 'places', (e: any) => {
        // Change the cursor style as a UI indicator.
        this.map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const htmlString = e.features[0].properties.htmlString;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        this.popup.setLngLat(coordinates).setHTML(htmlString).addTo(this.map);
      });

      this.map.on('mouseleave', 'places', () => {
        this.map.getCanvas().style.cursor = '';
        this.popup.remove();
      });
    });
  }

  venueListToMapFeat(venueList: string | any[]) {
    let ret = [];
    for (let i = 0; i < venueList.length; i++) {
      let ven = venueList[i];
      let lat = ven?.mapping?.latitude;
      let long = ven?.mapping?.longitude;
      const template = this.getHTMLForPopup(ven);
      if (lat?.length && long?.length) {
        ret.push({
          type: 'Feature',
          properties: {
            name: ven.name,
            logo: ven.gallery?.length ? ven.gallery[0] : '',
            location: ven.address,
            price: ven.pricing?.perUnit ? 'INR ' + ven.pricing?.perUnit : 'NA',
            rating: ven.rating,
            description: ven.pricing?.perUnit ? 'INR ' + ven.pricing?.perUnit : 'NA',
            htmlString: template,
            icon: 'bar',
          },
          geometry: {
            type: 'Point',
            coordinates: [long, lat],
          },
        });
      }
    }
    return ret;
  }

  flyToLocation = (index: number) => {
    let ven = this.venues[index];
    let lat = ven?.mapping?.latitude;
    let long = ven?.mapping?.longitude;
    this.map.flyTo({
      center: [long, lat],
      zoom: 16,
      bearing: 0,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
    this.openPopupByIndex(index);
  };
  openPopupByIndex(index: number) {
    let ven = this.venues[index];
    let lat = ven?.mapping?.latitude;
    let long = ven?.mapping?.longitude;


    // Change the cursor style as a UI indicator.
    this.map.getCanvas().style.cursor = 'pointer';
    // Copy coordinates array.
    const coordinates = [long, lat];
    const htmlString = this.getHTMLForPopup(ven);

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(long - coordinates[0]) > 180) {
      coordinates[0] += long > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    this.popup.setLngLat({ lng: long, lat }).setHTML(htmlString).addTo(this.map);
  }

  getHTMLForPopup(ven: any) {
    return `<div class="map-box-location">
  <div class="map-box-header">
    <div class="location-pic">
      <div class="rating-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span>${ven.rating}</span>
      </div>
      <img
        src="${ven.gallery?.length ? ven.gallery[0] : ''}"
        alt=""
      />
    </div>
  </div>
  <div class="map-box-body">
    <div class="location-meta">
      <span><b> ${ven.name}</b> </span>
      <span>${ven.address}</span>
    </div>
    <p>Starting from <b>₹${ven.pricing?.perUnit ?? 'NA'}</b>/night</p>
  </div>
</div>`;
  }
  //********************************** */

  getCurrentMultiFilter(search: string) {
    let filterObj = JSON.parse(
      '{"' +
      decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
    );
    let keysList = Object.keys(filterObj);
    let internalkeysList = Object.keys(filterObj).filter(
      (a) => a.indexOf('__') != -1
    );
    let apiKeysList = Object.keys(filterObj).filter(
      (a) => a.indexOf('__') == -1
    );
    let andV = [];
    let orV = [];
    for (let i = 0; i < apiKeysList.length; i++) {
      if (filterObj[apiKeysList[i]].indexOf(',') == -1) {
        let obj: any = {};
        obj[apiKeysList[i]] = filterObj[apiKeysList[i]];
        andV.push(obj);
      } else {
        let multiValue = filterObj[apiKeysList[i]].split(',');
        for (let j = 0; j < multiValue.length; j++) {
          let obj: any = {};
          obj[apiKeysList[i]] = multiValue[j];
          orV.push(obj);
        }
      }
    }
    let returnObj: any = {};
    if (orV.length > 0) {
      returnObj['or'] = orV;
    }
    if (andV.length > 0) {
      returnObj['and'] = andV;
    }
    return returnObj;
  }

  getCurrentInclude(search: string) {
    //"include":[{"relation":"venueBookings","scope":{"where":{"from_day":15}}}]
    let filterObj = JSON.parse(
      '{"' +
      decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
    );
    let startDate = filterObj['__startDate'];
    let endDate = filterObj['__endDate'];
    let isMultiDate = filterObj['__isMultiDate'];

    if (startDate?.length > 0 && endDate?.length > 0) {
      //2023-06-30
      let from = {
        y: parseInt(startDate.split('-')[0]),
        m: parseInt(startDate.split('-')[1]),
        d: parseInt(startDate.split('-')[2]),
      };
      let to: any = {};
      if (isMultiDate == 'true' || isMultiDate == 1) {
        to = {
          y: parseInt(endDate.split('-')[0]),
          m: parseInt(endDate.split('-')[1]),
          d: parseInt(endDate.split('-')[2]),
        };
      } else {
        to = from;
      }
      let where: any = { and: [] };
      where['and'].push({
        or: [
          { from_year: from.y },
          { from_year: { lt: from.y } },
          { from_year: { lt: to.y } },
        ],
      });
      where['and'].push({
        or: [
          { to_year: to.y },
          { to_year: { gt: to.y } },
          { to_year: { gt: from.y } },
        ],
      });

      where['and'].push({
        or: [
          { from_month: from.m },
          { from_month: { lt: from.m } },
          { from_month: { lt: to.m } },
        ],
      });
      where['and'].push({
        or: [
          { to_month: to.m },
          { to_month: { gt: to.m } },
          { to_month: { gt: from.m } },
        ],
      });

      where['and'].push({
        or: [
          { from_day: from.d },
          { from_day: { lt: from.d } },
          { from_day: { lt: to.d } },
        ],
      });
      where['and'].push({
        or: [
          { to_day: to.d },
          { to_day: { gt: to.d } },
          { to_day: { gt: from.d } },
        ],
      });
      return [{ relation: 'venueBookings', scope: { where: where } }];
    } else {
      return null;
    }
  }

  getCurrentFilter(search: string) {
    //"include":[{"relation":"venueBookings","scope":{"where":{"from_day":15}}}]
    //var search = location.search.substring(1);
    if (search?.length) {
      let multiFilter = this.getCurrentMultiFilter(search);
      let multiInclude = this.getCurrentInclude(search);
      return { where: multiFilter, include: multiInclude };
    } else {
      return {};
    }
  }
  //********************************** */

  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    loop: true,
  };

  /**
   * Filter button clicked
   */
  FilterSidebar() {
    document.getElementById('filters-sidebar')?.classList.toggle('show');
    document.querySelector('.vertical-overlay')?.classList.toggle('show');
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    document.getElementById('filters-sidebar')?.classList.remove('show');
    document.querySelector('.vertical-overlay')?.classList.remove('show');
  }

  // Map Model Open
  openMapModal() {
    document.querySelector('.map-popup')?.classList.remove('invisible');
  }

  // Map Model Open
  closeMapModel() {
    document.querySelector('.map-popup')?.classList.add('invisible');
  }

  topOfferDatas: any = {};
  // Location Filter

  // Property  Filter
  changePropertyType(e: any, type: any) {
    if (e.target.checked) {
      if (!this.checkedVenueTypes) {
        this.checkedVenueTypes = [];
      }
      this.checkedVenueTypes.push(type);
    } else {
      var index = this.checkedVenueTypes.indexOf(type);
      if (index > -1) {
        this.checkedVenueTypes.splice(index, 1);
      }
    }
  }

  // Rating  Filter
  changePropertyRating(e: any, type: any) {
    if (e.target.checked) {
      if (!this.checkedVenueRating) {
        this.checkedVenueRating = [];
      }
      this.checkedVenueRating.push(type);
    } else {
      var index = this.checkedVenueRating.indexOf(type);
      if (index > -1) {
        this.checkedVenueRating.splice(index, 1);
      }
    }
  }

  // Rating  Filter
  changePropertyLocation(e: any, type: any) {
    if (e.target.checked) {
      if (!this.checkedVenueLocation) {
        this.checkedVenueLocation = [];
      }
      this.checkedVenueLocation.push(type);
    } else {
      var index = this.checkedVenueLocation.indexOf(type);
      if (index > -1) {
        this.checkedVenueLocation.splice(index, 1);
      }
    }
  }

  /**
   * Range Slider Wise Data Filter
   */
  // Range Slider
  minValue: number = 0;
  maxValue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number): string => {
      return '₹' + value;
    },
  };
  valueChange(value: number, boundary: boolean): void {
    if (boundary) {
      this.minValue = value;
    } else {
      this.maxValue = value;
      this.topOfferDatas = this.topOfferData.filter((data: any) => {
        data.price = data.price.replace(/,/g, '');
        return data.price >= this.minValue && data.price <= this.maxValue;
      });
    }
    this.dataCount = this.topOfferDatas.length;
  }

  updateSlider() {
    this.slider.value = this.minValue;
    this.slider.highValue = this.maxValue;
  }

  // Bed-Rooms  Filter
  bedrooms(value: any) {
    if (value > 3) {
      this.topOfferDatas = this.topOfferData.filter((data: any) => {
        return data.bad >= value;
      });
    } else {
      this.topOfferDatas = this.topOfferData.filter((data: any) => {
        return data.bad === value;
      });
    }
    this.dataCount = this.topOfferDatas.length;
  }

  // Bed-Rooms  Filter
  bathrooms(value: any) {
    this.topOfferDatas = this.topOfferData.filter((data: any) => {
      return data.bath === value;
    });
    this.dataCount = this.topOfferDatas.length;
  }

  // Square metres Filter
  minMeters: any | undefined;
  maxMeters: any | undefined;
  metresSearch() {
    this.minMeters = document.getElementById('minValue') as HTMLAreaElement;
    this.maxMeters = document.getElementById('maxValue') as HTMLAreaElement;
    this.topOfferDatas = this.topOfferData.filter((data: any) => {
      return (
        data.metres >= this.minMeters.value &&
        data.metres <= this.maxMeters.value
      );
    });
    this.dataCount = this.topOfferDatas.length;
  }

  // Additional options Filter
  additionalOptions(e: any, type: any) {
    if (type === 'Featured') {
      this.checkedVal.push(type);
      this.topOfferDatas = this.topOfferData.filter((data: any) =>
        this.checkedVal.includes(data.btn)
      );
    } else {
      var index = this.checkedVal.indexOf(type);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      this.topOfferDatas = this.topOfferData.filter((data: any) =>
        this.checkedVal.includes(data.btn)
      );
    }
    if (this.checkedVal.length == 0) {
      this.topOfferDatas = this.topOfferData;
    }
    this.dataCount = this.topOfferDatas.length;

    if (type === 'Verified') {
      this.checkedVal.push(type);
      this.topOfferDatas = this.topOfferData.filter((data: any) =>
        this.checkedVal.includes(data.verified_btn)
      );
    } else {
      var index = this.checkedVal.indexOf(type);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      this.topOfferDatas = this.topOfferData.filter((data: any) =>
        this.checkedVal.includes(data.verified_btn)
      );
    }
    if (this.checkedVal.length == 0) {
      this.topOfferDatas = this.topOfferData;
    }
    this.dataCount = this.topOfferDatas.length;
  }

  // Property  Filter
  AmenitiesFilter(e: any, type: any) {
    if (e.target.checked) {
      this.checkedVal.push(type);
      this.topOfferDatas = this.topOfferData.filter((data: any) =>
        this.checkedVal.includes(data.amenities)
      );
    } else {
      var index = this.checkedVal.indexOf(type);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      this.topOfferDatas = this.topOfferData.filter((data: any) =>
        this.checkedVal.includes(data.amenities)
      );
    }
    if (this.checkedVal.length == 0) {
      this.topOfferDatas = this.topOfferData;
    }
    this.dataCount = this.topOfferDatas.length;
  }

  // Sort filter
  sortField: any = {};
  sortBy: any;
}
