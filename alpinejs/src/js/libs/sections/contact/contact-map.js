export function initContactMap() {
  const token =
    "pk.eyJ1IjoiY3NzbmluamEiLCJhIjoiY2toZW1nYm0zMDAxODJycXFzZ3g4cnZ6diJ9.9ebfrGREuwkauRr_afDTgA";
  const markerOptions = {
    color: "red",
  };

  return {
    initHeroMap() {
      mapboxgl.accessToken = token
      const longitude = parseFloat(document.getElementById('hero-map').getAttribute('data-long'))
      const latitude = parseFloat(document.getElementById('hero-map').getAttribute('data-lat'))
      const mainMap = new mapboxgl.Map({
        container: "hero-map",
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [longitude, latitude],
        zoom: 12,
      });

      mainMap.addControl(new mapboxgl.NavigationControl());

      const marker1 = new mapboxgl.Marker(markerOptions)
        .setLngLat([longitude, latitude])
        .addTo(mainMap)
    },
  };
}
