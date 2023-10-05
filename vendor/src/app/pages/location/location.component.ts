import { Component, OnInit } from '@angular/core';
import { VendorsService } from '../vendor/vendors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  vendorId: any;
  masterForm: FormGroup;
  roomsForm: any;
  roomDetails : any[] = [];
  master_venues: any[];
  editIndex:number = -1;
  constructor(private vendorsService: VendorsService,private fb: FormBuilder,
    public router: Router) {
    let user = JSON.parse(localStorage.getItem('user'));
    this.vendorId = user?.vendorId;
  }

  ngOnInit(): void {
    this.getVendor();
    this.createForm();
    this.initMap();
  }
  vendorData: any;
  locationArr: any[];

  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/streets-v11";

  lat = 26.3398;
  lng = -81.7787;


  initMap(){
    let _token = "pk.eyJ1Ijoic2h1YmhhbTAwNyIsImEiOiJjbGV3Z3N5Nm8wY2k0M3JxdzNjeWY0YmhoIn0.Mq5RBaZ8emRkwHq3Ivb1Wg";
    mapboxgl as typeof mapboxgl;
    this.map = new mapboxgl.Map({
      accessToken:
      _token,
      container: "map",
      style: this.style,
      zoom: 2,
      center: [this.lng, this.lat],
    });
    // Add the control to the map.
    const geocoder = new MapboxGeocoder({
      accessToken: _token,
      mapboxgl: mapboxgl
      });

      document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map));
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
    this.map.on('click', function(e) {
      var coordinates = e.lngLat;
      LocationComponent.prototype.setLatLong(coordinates);
    });
  }

  setLatLong(coordinates){
    let _lat = document.getElementById('latitude');
    _lat['value'] = coordinates.lat;
    let _lng = document.getElementById('longitude');
    _lng['value'] = coordinates.lng;
  }

  async getVendor() {
    (await this.vendorsService.getVendorsbyId(this.vendorId)).subscribe(res => {
      this.vendorData = res;
      this.master_venues = res.master_venues;
    })
  }

  async addUpdateLocation() {
      if (!this.vendorData?.master_venues?.length) {
        this.vendorData['master_venues'] = [];
      }
        let master = this.masterForm.value;
        let _lat = document.getElementById('latitude');
        let _lng = document.getElementById('longitude');
        master.lat =  _lat['value'];
        master.long = _lng['value'];
        master.roomsDetails = this.roomDetails;

        if(this.editIndex == -1){
          this.vendorData['master_venues'].push(master);
        }else{
          this.vendorData['master_venues'][this.editIndex] = master;
        }
        this.syncValues();


  }

  async syncValues(){
    (await this.vendorsService.updateVendorOnly(this.vendorData, this.vendorId)).subscribe((res => {
      this.masterForm.reset();
      this.roomsForm.reset();
      this.editIndex = -1;
      this.getVendor();
    }));
  }

  createForm() {
    this.masterForm = this.fb.group({
      name: ['', [Validators.required]],
      isRoomsAvailable: ['', [Validators.required]],
      lat: [''],
      long: [''],
      roomsDetails:[''],
      description:['']
    });

    this.roomsForm = this.fb.group({
      roomType: ['', [Validators.required]],
      noOfRooms: ['', [Validators.required]],
      priceFrom: ['', [Validators.required]],
      priceTo:['']
    });
  }

editLocation(i){
this.editIndex = i;
this.roomDetails = this.master_venues[i].roomsDetails;
 this.masterForm.patchValue(this.master_venues[i]);
}

deleteRoomRecord(i){
  this.roomDetails.splice(i,1);
}

deleteLocation(i){
  let choice = confirm('Are you sure you want to delete location ? ');
  if(choice){
    this.master_venues.splice(i,1);
    this.syncValues();
  }else{

  }

}

  pushRoomDetails(){
if(this.roomsForm.status != 'invalid'){
  this.roomDetails.push(this.roomsForm.value);
  this.roomsForm.reset();
}
  }

}
