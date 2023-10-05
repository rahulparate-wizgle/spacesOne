import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Range Slider
import { Options } from '@angular-slider/ngx-slider';

// Swiper Slider
import { SwiperOptions } from 'swiper';
import { topOffer, propertyCity, estateAagents, service, companies, EventType} from './home1.model';
import { topOfferData, cityData, agentsData, servicesData, companiesData} from './data';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.scss'],
})

/**
 * Index Component
 */
export class Home1Component implements OnInit {
  topOfferData!: topOffer[];
  cityData!: propertyCity[];
  agentsData!: estateAagents[];
  servicesData!: service[];
  companiesData!: companies[];

  isSingleDay = true;
  filterFromDate: any;
  filterToDate: any;
  datePlaceHolder: string= "Date";

  isLoading: boolean = false;
  selectedEventType: any;
  selectedEvent: any;
  galleryFilter = 'Destination Wedding';
  locationFilter = 'Nagpur';

 agentData = [
    {
      image: 'assets/img/avatars/39.png',
    },
    {
      image: 'assets/img/avatars/41.png',
    },
    {
      image: 'assets/img/avatars/42.png',
    },
    {
      image: 'assets/img/avatars/43.png',
    },
    {
      image: 'assets/img/avatars/44.png',
    },
    {
      image: 'assets/img/avatars/45.png',
    },
    {
      image: 'assets/img/avatars/46.png',
    },
    {
      image: 'assets/img/avatars/47.png',
    },
    {
      image: 'assets/img/avatars/48.png',
    },
    {
      image: 'assets/img/avatars/49.png',
    },
  ];
  venuesList: any;
  venuesSameType: any;
  filterVenueData: any;
  venuesTypeList: any;
  eventTypeList: EventType[] = [];
  filteredEventTypes: EventType[] = [];
  filterLocationVenueData: any[] = [];

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
    public router: Router
  ) {}

  ngOnInit(): void {
     // Chat Data Get Function
     this._fetchData();
     this.getVenueList();
     this.getEventTypeList();
     this.filterredImages = this.list;
     this.venueDetails();
     this.topVenueDetails();
     // Rent Select data
     document.getElementById("rent-content")?.addEventListener("click",function(e) {
      const input = e.target as HTMLElement;
      const rent = document.querySelector('.rent') as HTMLElement;
      rent.innerText = input.innerText;
     });

    // Rent Select data
    document
      .getElementById('rent-content')
      ?.addEventListener('click', function (e) {
        const input = e.target as HTMLElement;
        const rent = document.querySelector('.rent') as HTMLElement;
        rent.innerText = input.innerText;
      });

    // Location Select data
    document
      .getElementById('location-content')
      ?.addEventListener('click', function (e) {
        const input = e.target as HTMLElement;
        const location = document.querySelector('.location') as HTMLElement;
        location.innerText =
          (input.tagName == 'IMG'
            ? input.getAttribute('for')
            : input.innerText) ?? '';
      });

    // Property Select data
    document
      .getElementById('property-content')
      ?.addEventListener('click', function (e) {
        const input = e.target as HTMLElement;
        const property = document.querySelector('.property') as HTMLElement;
        property.innerText = input.innerText;
      });

    // Property Select data
    document
      .getElementById('property-type')
      ?.addEventListener('click', function (e) {
        const input = e.target as HTMLElement;
        const property = document.querySelector(
          '.property-type'
        ) as HTMLElement;
        property.innerText = input.innerText;
      });
  }

  // Chat Data Fetch
  private _fetchData() {
    this.topOfferData = topOfferData;
    this.cityData = cityData;
    this.agentsData = agentsData;
    this.servicesData = servicesData;
    this.companiesData = companiesData;
  }

  applyFilter() {
    //__startDate=2023-03-01&__endDate=2023-03-16&__isMultiDate=true
    const location = document.querySelector('.location') as HTMLElement;
    let filterLocation = location.innerText;

    const venueType = document.querySelector('.property-type') as HTMLElement;
    let filterType = venueType?.innerText;

    let arrFilter: any = {};
    if (filterLocation.length && filterLocation != 'Location') {
      arrFilter['city'] = filterLocation;
    }

    if (this.selectedEvent?.title.length && filterType != 'Event Type') {
      arrFilter['eventType.title'] = this.selectedEvent.title;
    }

    if (filterType?.length && filterType != 'Venue Type') {
      arrFilter['type'] = filterType;
    }

    if (this.filterFromDate) {

      let df = new Date(this.filterFromDate);
      arrFilter['__startDate'] = this.getDateFormat(df);
    }
    if (!this.isSingleDay) {
      if (this.filterToDate) {
        let dt = new Date(this.filterToDate);
        arrFilter['__endDate'] = this.getDateFormat(dt);
      }
      arrFilter['__isMultiDate'] = true;
    } else {
      delete arrFilter['__endDate'];
      delete arrFilter['__isMultiDate'];
    }
    const property = document.querySelector('.property') as HTMLElement;
    let people = property.innerText;
    if (people && people != 'No of Guests') {
      arrFilter['__people'] = people;
    }
    this.router.navigate(['venues'], { queryParams: arrFilter });
  }

  getDateFormat(date: Date) {
    let month = date.getMonth() + 1;
    let monthStr = month > 9 ? month : '0' + month;
    return date.getFullYear() + '-' + monthStr + '-' + date.getDate();
  }

  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: true,
    navigation: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  };

  /**
   * Service Swiper setting
   */
  service = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: true,
    spaceBetween: 25,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  };

  /**
   * partners Swiper setting
   */
  partners = {
    initialSlide: 0,
    slidesPerView: 6,
    spaceBetween: 25,
  };

  /**
   * agents Swiper setting
   */
  public agents: SwiperOptions = {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  /**
   * Swiper setting
   */
  companies = {
    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 25,
    pagination: true,
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  };

  /**
   * Slider range set
   */
  visibleSelection = 455;
  visibleBarOptions: Options = {
    floor: 0,
    ceil: 1000,
    showSelectionBar: true,
  };

    /**
   * Top properties on Finder
   */
    Finder = {
      initialSlide: 0,
      slidesPerView: 1,
      navigation: true,
      breakpoints:{
        768:{
          slidesPerView: 2,
        },
        1200:{
          slidesPerView: 2,
        }
      }
    };

  /**
   * Portfolio Modern Data
   */
  filterredImages:
    | {
        image: string;
        verified_btn?: string;
        btn: string;
        btn_color: string;
        sale: string;
        title: string;
        location: string;
        price: string;
        category: string;
      }[]
    | undefined;
  list = [
    {
      image: 'assets/img/real-estate/recent/01.jpg',
      verified_btn: 'Verified',
      btn: 'New',
      btn_color: 'bg-info',
      sale: 'For rental',
      title: 'Luxury Rental Villa',
      location: '118-11 Sutphin Blvd Jamaica, NY 11434',
      price: ' 3,850',
      category: 'Houses',
    },
    {
      image: 'assets/img/real-estate/recent/02.jpg',
      verified_btn: '',
      btn: 'New',
      btn_color: 'bg-info',
      sale: 'For sale',
      title: 'Duplex with Garage',
      location: '21 Pulaski Road Kings Park, NY 11754',
      price: ' 200,410',
      category: 'Houses',
    },
    {
      image: 'assets/img/real-estate/recent/03.jpg',
      verified_btn: '',
      btn: 'New',
      btn_color: 'bg-info',
      sale: 'For sale',
      title: 'Country House',
      location: '6954 Grand AveMaspeth, NY 11378',
      price: ' 162,000',
      category: 'Houses',
    },
    {
      image: 'assets/img/real-estate/recent/01.jpg',
      verified_btn: 'Verified',
      btn: 'New',
      btn_color: 'bg-info',
      sale: 'For rental',
      title: 'Luxury Rental Villa',
      location: '118-11 Sutphin Blvd Jamaica, NY 11434',
      price: ' 3,850',
      category: 'Rooms',
    },
    {
      image: 'assets/img/real-estate/recent/02.jpg',
      verified_btn: '',
      btn: 'New',
      btn_color: 'bg-info',
      sale: 'For sale',
      title: 'Duplex with Garage',
      location: '21 Pulaski Road Kings Park, NY 11754',
      price: ' 200,410',
      category: 'Commercial',
    },
    {
      image: 'assets/img/real-estate/recent/02.jpg',
      verified_btn: '',
      btn: 'New',
      btn_color: 'bg-info',
      sale: 'For sale',
      title: 'Duplex with Garage',
      location: '21 Pulaski Road Kings Park, NY 11754',
      price: ' 200,410',
      category: 'Apartments',
    },
  ];

  /***
   * Active all category selected
   */
  activeCategory(eventType: string) {
    this.galleryFilter = eventType;
    if (this.galleryFilter === 'Destination Wedding') {
      this.filterVenueData = this.venuesList?.filter((x: any) =>
        x.eventType?.find((y: any) => y?.title == this.galleryFilter)
      );
    } else {
      this.filterVenueData = this.venuesList?.filter((x: any) =>
        x.eventType?.find((y: any) => y?.title == this.galleryFilter)
      );
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  async venueDetails() {
    this.isLoading = true;
    let filter: any = {};
    filter['limit'] = 12;
    (await this.apiService.commonGet('/venues/', filter)).subscribe(
      (res: any) => {
        this.venuesList = res;
        this.filterVenueData = this.venuesList;
        this.isLoading = false;
        this.activeCategory(this.galleryFilter);
      }
    );
  }

  async getVenueList() {
    (await this.apiService.commonGet('/venue-types')).subscribe((res: any) => {
      this.venuesTypeList = res;
    });
  }
  async getEventTypeList(){
    (await this.apiService.commonGet('/event-types')).subscribe((res: any) => {
      this.eventTypeList = res;
    });
  }

  singleDay(x: any) {
    this.isSingleDay = x == 1;
  }

  async topVenueDetails() {
    this.isLoading = true;
    let filter: any = {};
     (await this.apiService.commonGet('/venues/', filter)).subscribe(
      (res: any) => {
        let list=res;
        this.filterLocationVenueData = list?.filter((x: any) =>
        x.city== 'Nagpur'
      );
      this.isLoading = false;
      }
    );
  }

}
