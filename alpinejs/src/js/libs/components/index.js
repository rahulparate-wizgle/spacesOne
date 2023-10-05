//Global
import { initLandingNavbar } from './navbar/navbar-landing';
import { initNavbar, initNavbarLight } from './navbar/navbar';
import { initNavbarMobile } from './navbar/navbar-mobile';
import { initNavbarBottom } from './navbar/navbar-bottom';
import { initBackToTop } from './backtotop/backtotop';
import {getDataLocation} from './navbar/navbar';
import {pushData} from './navbar/navbar';
import {form} from './navbar/navbar';
import {locationVenue} from './navbar/navbar';
import {pushLocationData} from './navbar/navbar';
import {venueTypeData} from './navbar/navbar';
import {searchVenue} from './navbar/navbar';



//Accordions
import { initAccordion } from './accordion/accordion';

//Global
window.pushData = pushData;
window.searchVenue = searchVenue;
window.venueTypeData = venueTypeData;
window.pushLocationData = pushLocationData;
window.locationVenue = locationVenue;
window.form = form;


window.getDataLocation = getDataLocation;
window.initLandingNavbar = initLandingNavbar;
window.initNavbar = initNavbar;
window.initNavbarLight = initNavbarLight;
window.initNavbarMobile = initNavbarMobile;
window.initNavbarBottom = initNavbarBottom;
window.initBackToTop = initBackToTop;

//Accordions
window.initAccordion = initAccordion;

