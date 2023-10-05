import { CONSTANTS } from '../../../../js/libs/utils/constants';


let map = "";
export function getData(pageSize, pageNo, nextPage) {
  return {
    listFilter: {},
    sortBy: "",
    venues: [],

    flyToLocation: (index) => {
      //const index = parseInt(parent.getAttribute("data-location"));
      const coordinates = locations.features[index].geometry.coordinates;
      const name = locations.features[index].properties.name;
      const logo = locations.features[index].properties.logo;
      const location = locations.features[index].properties.location;
      const price = locations.features[index].properties.price;
      const rating = locations.features[index].properties.rating;

      displayPopup({
        coordinates,
        name,
        price,
        logo,
        location,
        rating,
      });


      map.flyTo({
        center: coordinates,
        zoom: 10,
        bearing: 0,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    },

    init() {
      //"include":[{"relation":"venueBookings","scope":{"where":{"from_day":15}}}]
      let filter = getCurrentFilter();
      let url = CONSTANTS.baseUrl + "/venues"
      if (filter) {
        url += url.indexOf('?') != -1 ? '&' : '?' + "filter=" + encodeURIComponent(JSON.stringify(filter));
      }

      fetch(url, {
        method: 'GET',
        pageSize,
        pageNo,
        nextPage
      })
        .then((response) => response.json())
        .then((venues) => {

          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          let filterObj ={}
          let currentFilterStr = urlParams.get('__filter');
          if(currentFilterStr?.length > 0){
              filterObj = JSON.parse(currentFilterStr);
              if(filterObj.Price?.length){
                let min = filterObj.Price.split('-')[0];
                let max = filterObj.Price.split('-')[1];
                if(min != '0'){
                  venues = venues.filter(a=>a?.pricing?.perUnit > min);
                }
                if(max != '+'){
                  venues = venues.filter(a=>a?.pricing?.perUnit < max);
                }
              }
             

              if(filterObj?.SortBy?.length){
                if(filterObj.SortBy == 'Low to High'){
                  venues = venues.sort(function(a, b) {
                    return parseFloat(a?.pricing?.perUnit) - parseFloat(b?.pricing?.perUnit);
                });
                }else{
                  venues = venues.sort(function(a, b) {
                    return parseFloat(b?.pricing?.perUnit) - parseFloat(a?.pricing?.perUnit) ;
                });
                }
              }

             
              if(filterObj?.Rating?.length && !isNaN(filterObj.Rating)){
                venues = venues.filter(a=>a.rating == parseInt(filterObj.Rating) );
              }
              
          }
          this.venues = venues;



          initFlatsMap(this.venues);
        }
        );
    },
    applyFilter: (venues) => {

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      let currentFilterStr = urlParams.get('__filter');


      var slFilterSortBy = document.getElementById("slFilterSortBy");
      let filterSortBy = slFilterSortBy.options[slFilterSortBy.selectedIndex].text;

      var slFilterPrice = document.getElementById("slFilterPrice");
      let filterPrice = slFilterPrice.options[slFilterPrice.selectedIndex].value;

      var slFilterRating = document.getElementById("slFilterRating");
      let filterRating = slFilterRating.options[slFilterRating.selectedIndex].value;

      let filter = {};
        if(filterSortBy.length){
          filter['SortBy'] = filterSortBy;
        }

        if(filterSortBy.length){
          filter['Price'] = filterPrice;
        }
        if(filterSortBy.length){
          filter['Rating'] = filterRating;
        }
      urlParams.set('__filter',JSON.stringify(filter));
      location.href = '/listing.html?' + urlParams.toString(); 
    },
  }
}

function getCurrentMultiFilter(search) {
  let filterObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  let keysList = Object.keys(filterObj);
  let internalkeysList = Object.keys(filterObj).filter(a => a.indexOf('__') != -1);
  let apiKeysList = Object.keys(filterObj).filter(a => a.indexOf('__') == -1);
  let andV = [];
  let orV = [];
  for (let i = 0; i < apiKeysList.length; i++) {
    if (filterObj[keysList[i]].indexOf(',') == -1) {
      let obj = {};
      obj[keysList[i]] = filterObj[keysList[i]]
      andV.push(obj);

    } else {
      let multiValue = filterObj[keysList[i]].split(',');
      for (let j = 0; j < multiValue.length; j++) {
        let obj = {};
        obj[keysList[i]] = multiValue[j]
        orV.push(obj)
      }
    }
  }
  let returnObj = {};
  if (orV.length > 0) {
    returnObj['or'] = orV;
  }
  if (andV.length > 0) {
    returnObj['and'] = andV;
  }
  getCurrentInclude(search);
  return returnObj;
}

function getCurrentInclude(search) {
  //"include":[{"relation":"venueBookings","scope":{"where":{"from_day":15}}}]
  let filterObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  let startDate = filterObj['__startDate'];
  let endDate = filterObj['__endDate'];
  let isMultiDate = filterObj['__isMultiDate'];
  //2023-06-30 
  let from = {
    y: parseInt(startDate.split('-')[0]),
    m: parseInt(startDate.split('-')[1]),
    d: parseInt(startDate.split('-')[2])
  }
  let to = {};
  if (isMultiDate == 'true' || isMultiDate == 1) {
    to = {
      y: parseInt(endDate.split('-')[0]),
      m: parseInt(endDate.split('-')[1]),
      d: parseInt(endDate.split('-')[2])
    }
  } else {
    to = from;
  }
  let where = { and: [] };
  // from_year - fields from db
  // from.y - requested range year
  where['and'].push({ or: [{ from_year: from.y }, { from_year: { lt: from.y } }, { from_year: { lt: to.y } }] })
  where['and'].push({ or: [{ to_year: to.y }, { to_year: { gt: to.y } }, { to_year: { gt: from.y } }] })

  where['and'].push({ or: [{ from_month: from.m }, { from_month: { lt: from.m } }, { from_month: { lt: to.m } }] })
  where['and'].push({ or: [{ to_month: to.m }, { to_month: { gt: to.m } }, { to_month: { gt: from.m } }] })

  where['and'].push({ or: [{ from_day: from.d }, { from_day: { lt: from.d } }, { from_day: { lt: to.d } }] })
  where['and'].push({ or: [{ to_day: to.d }, { to_day: { gt: to.d } }, { to_day: { gt: from.d } }] })

  return [{ "relation": "venueBookings", "scope": { "where": where } }]
}


function getCurrentFilter() {
  //"include":[{"relation":"venueBookings","scope":{"where":{"from_day":15}}}]
  var search = location.search.substring(1);
  if (search?.length) {
    let multiFilter = getCurrentMultiFilter(search)
    let multiInclude = getCurrentInclude(search)
    return { where: multiFilter, include: multiInclude };
  } else {
    return {}
  }
}



function venueListToMapFeat(venueList) {
  let ret = [];
  for (let i = 0; i < venueList.length; i++) {
    let ven = venueList[i];
    let lat = ven?.mapping?.latitude;
    let long = ven?.mapping?.longitude;
    if (lat?.length && long?.length) {
      ret.push({
        type: "Feature",
        properties: {
          name: ven.name,
          logo: ven.gallery?.length ? ven.gallery[0] : '',
          location: ven.address,
          price: ven.pricing?.perUnit ?? 'NA',
          rating: ven.rating,
          'description': 'INR ' + ven.pricing?.perUnit ?? 'NA',
          'icon': 'bar'
        },
        geometry: {
          type: "Point",
          coordinates: [long, lat],
        }
      });
    }
  }
  return ret;
}
let locations = {}

function displayPopup(place) {
  const popup = document.getElementsByClassName("mapboxgl-popup");

  //Remove unneeded popups
  if (popup.length) {
    popup[0].remove();
  }

  //Fly to selected location
  map.flyTo({
    center: place.coordinates,
    zoom: 25,
    bearing: 0,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
  });

  //Popup HTML template
  const template = `<div class="map-box-location">
    <div class="map-box-header">
      <div class="location-pic">
        <div class="rating-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>${place.rating}</span>
        </div>
        <img
          src="${place.logo}"
          alt=""
        />
      </div>
    </div>
    <div class="map-box-body">
      <div class="location-meta">
        <span>${place.name}</span>
        <span>${place.location}</span>
      </div>
      <p>Starting from <b>₹${place.price}</b>/night</p>
    </div>
  </div>`;

  //Inject template
  new mapboxgl.Popup()
    .setLngLat(place.coordinates)
    .setHTML(template)
    .addTo(map);
}

export function initFlatsMap(venueList) {

  locations = {
    type: "FeatureCollection",
    features: venueListToMapFeat(venueList),
  };

  //Mapbox token
  const token =
    "pk.eyJ1Ijoic2h1YmhhbTAwNyIsImEiOiJjbGV3Z3N5Nm8wY2k0M3JxdzNjeWY0YmhoIn0.Mq5RBaZ8emRkwHq3Ivb1Wg";

  //Set token
  mapboxgl.accessToken = token;

  //Get longitude and latitude
  let longitude = parseFloat(
    document.getElementById("places-map").getAttribute("data-long")
  );
  let latitude = parseFloat(
    document.getElementById("places-map").getAttribute("data-lat")
  );
  if (venueList.length) {
    let ven = venueList[0];
    latitude = ven?.mapping?.latitude;
    longitude = ven?.mapping?.longitude;
  }
  //Create a new map instance
  map = new mapboxgl.Map({
    container: "places-map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [longitude, latitude],
    zoom: 10,
  });

  //Add zoom control
  map.addControl(new mapboxgl.NavigationControl());

  //Add Styles
  map.on("styledata", () => {
    const loadingStyles = () => {
      if (!map.isStyleLoaded()) {
        setTimeout(loadingStyles, 1500);
        return;
      }

      const _this = this;
      // Do nothing if source already added
      if (map.getSource("places")) {
        return;
      }

      //Add places
      map.addSource("places", {
        type: "geojson",
        data: locations,
      });

      // Add a layer showing the places.
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        'layout': {
          'text-field': ['get', 'description'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'icon-image': ['get', 'icon']
        },
        paint: {
          'text-color': '#671cc9',
        }
      });

      //Init click event
      map.on("click", "places", function (e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const price = e.features[0].properties.price;
        const logo = e.features[0].properties.logo;
        const name = e.features[0].properties.name;
        const location = e.features[0].properties.location;
        const rating = e.features[0].properties.rating;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        //Call popup
        displayPopup({
          coordinates,
          name,
          price,
          logo,
          location,
          rating,
        });
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "places", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "places", function () {
        map.getCanvas().style.cursor = "";
      });
    };
    loadingStyles();
  });

  //Handle click events
  document.querySelectorAll(".map-popup-trigger").forEach((item) => {
    item.addEventListener("click", (event) => {
      const parent = item.closest(".map-popup-item");
      const index = parseInt(parent.getAttribute("data-location"));
      const coordinates = locations.features[index].geometry.coordinates;
      const name = locations.features[index].properties.name;
      const logo = locations.features[index].properties.logo;
      const location = locations.features[index].properties.location;
      const price = locations.features[index].properties.price;
      const rating = locations.features[index].properties.rating;

      displayPopup({
        coordinates,
        name,
        price,
        logo,
        location,
        rating,
      });
    });
  });



  return {
    init() {
      //Set token
      mapboxgl.accessToken = token;
      //Get longitude and latitude
      const longitude = parseFloat(
        document.getElementById("places-map").getAttribute("data-long")
      );
      const latitude = parseFloat(
        document.getElementById("places-map").getAttribute("data-lat")
      );
      //Create a new map instance
      map = new mapboxgl.Map({
        container: "places-map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 10,
      });

      //Add zoom control
      map.addControl(new mapboxgl.NavigationControl());

      //Add Styles
      map.on("styledata", () => {
        const loadingStyles = () => {
          if (!map.isStyleLoaded()) {
            setTimeout(loadingStyles, 1500);
            return;
          }


        };
        loadingStyles();
      });

      //Handle click events
      document.querySelectorAll(".map-popup-trigger").forEach((item) => {
        item.addEventListener("click", (event) => {
          const parent = item.closest(".map-popup-item");
          const index = parseInt(parent.getAttribute("data-location"));
          const coordinates = locations.features[index].geometry.coordinates;
          const name = locations.features[index].properties.name;
          const logo = locations.features[index].properties.logo;
          const location = locations.features[index].properties.location;
          const price = locations.features[index].properties.price;
          const rating = locations.features[index].properties.rating;

          displayPopup({
            coordinates,
            name,
            price,
            logo,
            location,
            rating,
          });
        });
      });
    },

    //Display map popup
    displayPopup(place) {
      const popup = document.getElementsByClassName("mapboxgl-popup");

      //Remove unneeded popups
      if (popup.length) {
        popup[0].remove();
      }

      //Fly to selected location
      map.flyTo({
        center: place.coordinates,
        zoom: 15,
        bearing: 0,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });

      //Popup HTML template
      const template = `<div class="map-box-location">
        <div class="map-box-header">
          <div class="location-pic">
            <div class="rating-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>${place.rating}</span>
            </div>
            <img
              src="${place.logo}"
              alt=""
            />
          </div>
        </div>
        <div class="map-box-body">
          <div class="location-meta">
            <span>${place.name}</span>
            <span>${place.location}</span>
          </div>
          <p>Starting from <b>₹${place.price}</b>/night</p>
        </div>
      </div>`;

      //Inject template
      new mapboxgl.Popup()
        .setLngLat(place.coordinates)
        .setHTML(template)
        .addTo(map);
    },

    //Load places layer
    loadLayers() {
      const _this = this;
      // Do nothing if source already added
      if (map.getSource("places")) {
        return;
      }

      //Add places
      map.addSource("places", {
        type: "geojson",
        data: locations,
      });

      // Add a layer showing the places.
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        'layout': {
          'text-field': ['get', 'description'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'icon-image': ['get', 'icon']
        }
      });

      //Init click event
      map.on("click", "places", function (e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const price = e.features[0].properties.price;
        const logo = e.features[0].properties.logo;
        const name = e.features[0].properties.name;
        const location = e.features[0].properties.location;
        const rating = e.features[0].properties.rating;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        //Call popup
        displayPopup({
          coordinates,
          name,
          price,
          logo,
          location,
          rating,
        });
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "places", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "places", function () {
        map.getCanvas().style.cursor = "";
      });
    },
  };
}
