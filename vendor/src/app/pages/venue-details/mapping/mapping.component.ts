import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { mappingFormList } from "./mapping.model";
import { FormBuilder } from "@angular/forms";
import { VenueDetailsService } from "../venue-details.service";
import { ActivatedRoute } from "@angular/router";
// import { map } from 'rxjs';

@Component({
  selector: "app-mapping",
  templateUrl: "./mapping.component.html",
  styleUrls: ["./mapping.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MappingComponent implements OnInit {
  mappinggobj: mappingFormList = new mappingFormList();
  @Input() venueId;
  mapmodel: any;

  venue;
  validationError: any = {};

  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/streets-v11";

  lat = 26.3398;
  lng = -81.7787;

  constructor(
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
      MappingComponent.prototype.setLatLong(coordinates);
    });

    this.venueId = this.activeRoute.snapshot.paramMap.get("id");

    this.getVenueDetails();
  }

  setLatLong(coordinates){
    let _lat = document.getElementById('latitude');
    _lat['value'] = coordinates.lat;
    let _lng = document.getElementById('longitude');
    _lng['value'] = coordinates.lng;
  }

  async getVenueDetails() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    (await this.service.getVenueDetails(venueId)).subscribe(
      (res) => {
        this.venue = res;
        if(this.venue.mapping.latitude && this.venue.mapping.longitude){
          this.map.flyTo({
            center: [this.venue.mapping.longitude,this.venue.mapping.latitude],
            zoom:12,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
            let _lat = document.getElementById('latitude');
    _lat['value'] = this.venue.mapping.latitude;
    let _lng = document.getElementById('longitude');
    _lng['value'] = this.venue.mapping.longitude;
        }

      },
      (err) => {}
    );
  }

  async goToCurrentLocation(event) {
    let _lat = document.getElementById('latitude');
    let _lng = document.getElementById('longitude');
    this.mappinggobj.longitude = _lng['value'];
    this.mappinggobj.latitude = _lat['value'];

    if (this.mappinggobj.latitude && this.mappinggobj.longitude ) {
      (
        await this.service.postEntities(
          this.mappinggobj,
          this.venueId,
          "mapping"
        )
      ).subscribe(async (res: any) => {
        // this.venueId(res.id);
        alert('Location Updated Successfully.')
      });

    } else {
    }
  }

  async copyLocationFromMaster(){
    (await this.service.getMyVendorLocations()).subscribe(res => {
      if(res?.master_venues?.length){
        let currentMaster = res.master_venues.filter(a=>a.name == this.venue.master_venue);
        if(currentMaster.length){
          this.setLatLong({lat:currentMaster[0].lat,
            lng:currentMaster[0].long});

          this.map.flyTo({
              center: [currentMaster[0].long,currentMaster[0].lat],
              zoom:12,
              essential: true // this animation is considered essential with respect to prefers-reduced-motion
              });
        }
      }
    }, err => { })
  }
}
