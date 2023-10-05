import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { VenueDetailsService } from '../venue-details.service';
import Swal from 'sweetalert2';
import { overviewFormList } from './overview.model';
import { arrayToSelectSrc, servingCities } from '../../../services/constants/constants';
import { nagpurLocations } from './nagpur-location.data';
import { mumbaiLocations } from './mumbai-location.data';
import { VenueTypesApiService } from '../../venue-types/venue-types-api.service';
import { EventTypeService } from '../../event-type/event-type.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  starRating = 0;
  public Editor = ClassicEditor;
  overviewForm: any;
  venueType: any[];
  nagpurLocations: any[];
  mumbaiLocations: any[];
  validationError: any = {};
  venue;
  locationList = [];
  masterVenueList = [];
  ratingArr = arrayToSelectSrc([1, 2, 3, 4, 5]);
  cities = arrayToSelectSrc(servingCities);
  locationOptions: string[] = [];
  rulesForm: any;
  selectedCity: string;
  masterVenueObjectList: any;
  eventTypes: any;

  constructor(public router: Router,
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute,
    private venueTypeService: VenueTypesApiService,
    private eventTypeService: EventTypeService
  ) { }

  ngOnInit(): void {
    this.nagpurLocations = nagpurLocations;
    this.mumbaiLocations = mumbaiLocations;
    this.getVenueType();
    this.getEventTypes();
    this.overviewForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      type: [""],
      address: [""],
      // city: [""],
      // location: [""],
      rating: [""],
      description: [""],
      master_venue:[""],
      isActive: [""],
      // editor: ["", [Validators.required]],
      city: new FormControl(''),
      nagpurLocations: new FormControl(''),
      mumbaiLocations: new FormControl(''),
      eventType:[]
    });

    this.overviewForm.get('city').valueChanges.subscribe((value: string) => {
      this.selectedCity = value;
    });

    this.getVenueDetails();
    this.getMyVendorLocations();
  }


  async getEventTypes() {
    (await this.eventTypeService.getEventTypesList()).subscribe((res) => {
      this.eventTypes = res;
    });
  }

  async getVenueTypes(){
    (await this.service.getVenueTypes()).subscribe(res => {
      this.venueType = res;
    }, err => { })
  }

  // async getVenueDetails() {
  //   let venueId = this.activeRoute.snapshot.paramMap.get("id");
  //   if (venueId && venueId != '0')
  //     (await this.service.getVenueDetails(venueId)).subscribe(res => {
  //       this.venue = res;
  //       console.log("2", this.venue)
  //       this.overviewForm.patchValue(this.venue)
  //     }, err => { })
  // }

  async getVenueDetails() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    if (venueId && venueId != '0')
      (await this.service.getVenueDetails(venueId)).subscribe(res => {
        this.venue = res;
        let masterRooms = this.masterVenueObjectList?.filter(a=>a.name == this.overviewForm.value.master_venue);
       let master = masterRooms?.length > 0 ? masterRooms[0] : {};
       const eventTypeTitles = this.venue.eventType.map(event => event);
        this.overviewForm.patchValue({

          name: this.venue.name,
          type: this.venue.type[0],
          address: this.venue.address,
          // location: this.venue.location,
          city: this.venue.city,
          rating: this.venue.rating,
          description: this.venue.description,
          master_venue: this.venue.master_venue,
          isRoomsAvailable: master.isRoomsAvailable,
          eventType:eventTypeTitles,
          roomsDetails: master.roomsDetails,
          isActive: this.venue.isActive
        })
      },
      err => { })
  }

  compareEventType(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  next() {

  }
  StatusChange(event){
    this.overviewForm.patchValue({isActive:event});
  }

  async getMyVendorLocations() {
    (await this.service.getMyVendorLocations()).subscribe(res => {
      this.locationList = res?.locations;
      if(res?.master_venues?.length){
        this.masterVenueList = res?.master_venues.map(a=>a.name);
        this.masterVenueObjectList = res?.master_venues;
      }
      this.overviewForm.patchValue({ location: this.venue?.location })
    }, err => { })
  }

  async getVenueType() {
    (await this.venueTypeService.getVenueTypesList(0, 0)).subscribe(
      (res) => {
        this.venueType = res;
      }
    );
  }

  async postRulesData(event) {
    let masterRooms = this.masterVenueObjectList?.filter(a=>a.name == this.overviewForm.value.master_venue);
    let master = masterRooms?.length > 0 ? masterRooms[0] : {};
    let overviewFormObj = {
      name: this.overviewForm.value.name,
      type:[ this.overviewForm.value.type],
      address: this.overviewForm.value.address,
      // location: this.overviewForm.value.location,
      city: this.overviewForm.value.city,
      rating: this.overviewForm.value.rating,
      description: this.overviewForm.value.description,
      master_venue: this.overviewForm.value.master_venue,
      isRoomsAvailable:master.isRoomsAvailable,
      roomsDetails:master.roomsDetails,
      eventType:this.overviewForm.value.eventType,
      isActive: this.overviewForm.value.isActive
    };

    // this.employeeModelObj.icon = this.overviewForm.value.icon;
    // this.employeeModelObj.editor = this.blogForm.value.editor;
    if (this.overviewForm.status != "INVALID") {
      let venueId = this.activeRoute.snapshot.paramMap.get("id");
      (await this.service.postOverview(overviewFormObj, this.venue?.id)).subscribe(
        async (res: any) => {
          if (venueId == '0') {
            this.router.navigate(['/venues'],);
          }
          if (res?.id.length) {
            this.router.navigate(['/venue-details/' + res.id],);
            this.getVenueDetails();
          }

        }
      );

    }

    else {
      this.validationError = this.service.getFormValidationErrors(
        this.overviewForm
      );
    }
  }
}
