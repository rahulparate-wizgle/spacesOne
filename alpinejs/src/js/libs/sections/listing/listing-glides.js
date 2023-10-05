import {
  initMoreListingsGlide,
  initUpcomingListingsGlide,
  initBestRatedListingsGlide,
  initListingCategoriesGlide,
  initSuggestedListingsGlide,
  initFlatCarouselsGlide,
} from "../../components/glider/glider";

export function initMoreListings() {
  return {
    moreGlides: initMoreListingsGlide(),
  };
}

export function initUpcomingListings() {
  return {
    upcomingEvents: initUpcomingListingsGlide(),
  };
}

export function initBestRatedListings() {
  return {
    bestRatedEvents: initBestRatedListingsGlide(),
  };
}

export function initListingCategories() {
  return {
    eventCategories: initListingCategoriesGlide(),
  };
}

export function initSuggestedListings() {
  return {
    suggestedEvents: initSuggestedListingsGlide(),
  };
}

export function initFlatCarousels() {
  return {
    flatCarousels: initFlatCarouselsGlide(),
  };
}

// export function getData(pageSize, pageNo, nextPage) {
//   return {
//     venues: [],
//     init() {
//       let filter = {
//         limit: 20,
//         skip: 0,

//         //where: "nextPage" ,
//       };
//       let url = "http://[::1]:3002/venues"
//       if (filter) {
//         url += url.indexOf('?') != -1 ? '&' : '?' + "filter=" + encodeURIComponent(JSON.stringify(filter));
//       }

//       fetch(url, {
//         method: 'GET',
//         pageSize,
//         pageNo,
//         nextPage
//       })

//         .then((response) => response.json())
//         .then((venues) => {
//           this.venues = venues;
//         }
//         );

//     }
//   }

// }




