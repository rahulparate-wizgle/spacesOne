import 'lightgallery.js';
import { CONSTANTS } from '../../../../js/libs/utils/constants';
export function initCover() {
    return {
        gallery: lightGallery(document.getElementById('lightgallery'), {
            selector: 'a' 
        })
    }
}
function getVenueId(){
    let queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get('venue');
    return page_type ?? '640880636b049f4284b4eb25'
}
//for venue details
export function getDetails() {
    return {
        users: [],
        init() {
            
            fetch(CONSTANTS.baseUrl+'/amenities/'+getVenueId(), {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((users) => {
                    this.users = users;
                    console.log(' this.users: ', this.users)
                }
                );
        }
    }
  }

  //for rules
  export function getRules() {
    return {
        users: [],
        init() {
            fetch(CONSTANTS.baseUrl+'/rules/'+getVenueId(), {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((users) => {
                    this.users = users;
                    console.log(' this.users: ', this.users)
                }
                );
        }
    }
  }

export function postEnquiry(){
    return {
        init(){
            console.log('post enq hit');
        }
    }
    
  }

  export function getVenueData() {
    return {
        venues: [],
        venuesFromVendor: [],
        venuesSameType: [],
        init() {
            fetch(CONSTANTS.baseUrl + '/venues/' + getVenueId(), {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((venues) => {
                    this.venues = venues;
                    if (venues.mapping.latitude && venues.mapping.longitude) {
                        //Init details page map
                        initMainMap(venues.mapping.longitude, venues.mapping.latitude)
                    }

                   
                    //getVenueFromVendor(this.venues.vendorId,this.venuesFromVendor)
                    fetch(CONSTANTS.baseUrl + '/venues?filter={"where":{"master_venue":"' + this.venues.master_venue + '","vendorId":"' + this.venues.vendorId + '"}}', {
                        method: 'GET',
                    })
                        .then((response) => response.json())
                        .then((venues) => {
                            this.venuesFromVendor = venues;
                        }
                        );

                    //Get Venues of same type
                    fetch(CONSTANTS.baseUrl + '/venues?filter={"where":{"type":"' + this.venues.type[0] + '"}}', {
                        method: 'GET',
                    })
                        .then((response) => response.json())
                        .then((venues) => {
                            this.venuesSameType = venues;
                        }
                        );


                }
                );
        }
    }
  }

   function initMainMap(longitude,latitude) {
    const token =
   "pk.eyJ1Ijoic2h1YmhhbTAwNyIsImEiOiJjbGV3Z3N5Nm8wY2k0M3JxdzNjeWY0YmhoIn0.Mq5RBaZ8emRkwHq3Ivb1Wg";
 const markerOptions = {
   color: "red",
 };
     mapboxgl.accessToken = token
    //  const longitude = parseFloat(document.getElementById('main-map').getAttribute('data-long'))
    //  const latitude = parseFloat(document.getElementById('main-map').getAttribute('data-lat'))
     const mainMap = new mapboxgl.Map({
       container: "main-map",
       style: "mapbox://styles/mapbox/streets-v11",
       center: [longitude, latitude],
       zoom: 12,
     });

   
     const subMap = new mapboxgl.Map({
       container: "sub-map",
       style: "mapbox://styles/mapbox/streets-v11",
       center: [longitude, latitude],
       zoom: 12,
     });

     mainMap.addControl(new mapboxgl.NavigationControl());
     subMap.addControl(new mapboxgl.NavigationControl());

     const marker1 = new mapboxgl.Marker(markerOptions)
       .setLngLat([longitude, latitude])
       .addTo(mainMap)

     const marker2 = new mapboxgl.Marker(markerOptions)
       .setLngLat([longitude, latitude])
       .addTo(subMap)
   }

  export function getVenueEntityData() {
    return {
        users: [],
        init() {
            fetch(CONSTANTS.baseUrl+'/venues/'+getVenueId()+'/pricing', {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((users) => {
                    this.users = users;
                    console.log(' this.users: ', this.users)
                }
                );
        }
    }
  }