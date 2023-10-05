//Demo
import { initRenderDemos } from "./demo/landing-demos";

//Events
import { initListingNavbar } from "./listing/listing-navbar";
import { initListingDates } from "./listing/listing-dates";
import {
  initMoreListings,
  initUpcomingListings,
  initBestRatedListings,
  initSuggestedListings,
  initListingCategories,
  initFlatCarousels,
} from "./listing/listing-glides";
import { initListingMap } from "./listing/listing-map";
import { initListingContent } from "./listing/listing-content";
import { initListingCalendar } from "./listing/listing-calendar";
import { initCover } from "./listing/listing-cover";
import { initTestimonials } from "./testimonials/testimonials";
import { postData } from "./listing/listing-glides";
//Flats
import { initFlatsMap } from "./flat/flats-map";
import { getData } from "./flat/flats-map"
import { getDetails } from "./listing/listing-cover";
import { getRules } from "./listing/listing-cover";
import { getVenueData } from "./listing/listing-cover";
import { getVenueEntityData } from "./listing/listing-cover";
//Hosts
import { initFeaturedHosts } from "./hosts/featured-hosts";
//Careers
import { initCareerTabs, initJobTabs } from "./careers/career-tabs";
//Contact
import { initContactMap } from "./contact/contact-map";
//Demo
window.initRenderDemos = initRenderDemos;

//Events
window.initListingNavbar = initListingNavbar;
window.initCover = initCover;
window.initListingDates = initListingDates;
window.initMoreListings = initMoreListings;
window.initUpcomingListings = initUpcomingListings;
window.initBestRatedListings = initBestRatedListings;
window.initSuggestedListings = initSuggestedListings;
window.initListingCategories = initListingCategories;
window.initListingMap = initListingMap;
window.initListingContent = initListingContent;
window.initListingCalendar = initListingCalendar;

//Flats
window.initFlatCarousels = initFlatCarousels;
window.initFlatsMap = initFlatsMap;
window.getData = getData;
window.postData = postData;
window.getDetails = getDetails;
window.getRules = getRules;
window.getVenueData = getVenueData;
window.getVenueEntityData = getVenueEntityData;
//Hosts
window.initFeaturedHosts = initFeaturedHosts;
//Careers
window.initCareerTabs = initCareerTabs;
window.initJobTabs = initJobTabs;
//Testimonials
window.initTestimonials = initTestimonials;
//Contact
window.initContactMap = initContactMap;