export function initListingMap() {
 
  //old token
  // pk.eyJ1IjoiY3NzbmluamEiLCJhIjoiY2toZW1nYm0zMDAxODJycXFzZ3g4cnZ6diJ9.9ebfrGREuwkauRr_afDTgA
  return {

    initMainMap() {
     const token =
    "pk.eyJ1Ijoic2h1YmhhbTAwNyIsImEiOiJjbGV3Z3N5Nm8wY2k0M3JxdzNjeWY0YmhoIn0.Mq5RBaZ8emRkwHq3Ivb1Wg";
  const markerOptions = {
    color: "red",
  };
      mapboxgl.accessToken = token
      const longitude = parseFloat(document.getElementById('main-map').getAttribute('data-long'))
      const latitude = parseFloat(document.getElementById('main-map').getAttribute('data-lat'))
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
    },
  };
}
