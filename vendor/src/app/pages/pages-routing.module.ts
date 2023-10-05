import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { mainDashboardComponent } from './dashboards/blog/mainDashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CustomCalenderComponent } from './venue-details/custom-calender/custom-calender.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueTypeComponent } from './venue-type/venue-type.component';
import { LocationComponent } from './location/location.component';


const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",
    component: mainDashboardComponent
  },
  {
    path: "venues",
    component: VenueListComponent
  },
  {
    path: "location",
    component: LocationComponent
  },
  {
    path: "calender",
    component: CustomCalenderComponent
  },
  { path: 'dashboard', component: mainDashboardComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'venue-details/:id', loadChildren: () => import('./venue-details/venue-details.module').then(m => m.VenueDetailsModule) },
  { path: '', loadChildren: () => import('./enquiry-list/enquiry-list.module').then(m => m.EnquiryListModule) },
  { path: 'venue-type', component: VenueTypeComponent },
  { path: '', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'profile-page', component: ProfileComponent },
  { path: 'messages', component: ChatComponent },
  { path: 'messages/:id', component: ChatComponent },
  { path: 'venue-rules', loadChildren: () => import('./venue-rules/venue-rules.module').then(m => m.VenueRulesModule) },
  { path: 'venue-attributes', loadChildren: () => import('./venue-attributes/venue-attributes.module').then(m => m.VenueAttributesModule) },
  { path: 'venue-amenities', loadChildren: () => import('./venue-amenities/venue-amenities.module').then(m => m.VenueAmenitiesModule) },
  { path: 'additional-benefits', loadChildren: () => import('./additional-benefits/additional-benefits.module').then(m => m.AdditionalBenefitsModule) },
   { path: 'venue-types', loadChildren: () => import('./venue-types/venue-types.module').then(m => m.VenueTypesModule) },
  { path: 'house-standard', loadChildren: () => import('./house-standard/house-standard.module').then(m => m.HouseStandardModule) },
  { path: 'safety-rules', loadChildren: () => import('./safety-rules/safety-rules.module').then(m => m.SafetyRulesModule) },
  { path: '', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'users-list', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'blog-content', loadChildren: () => import('./blog-content/blog-content.module').then(m => m.BlogContentModule) },
  { path: 'vendor', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule) },
  {path:'user-profile/:id', component: UserProfileComponent},
  {path:'error-pages', loadChildren: ()=> import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule)},
  { path:"event-type", loadChildren: ()=> import('./event-type/event-type.module').then(m => m.EventTypeModule)},
  {path: "customer", loadChildren: ()=> import('./customer/customer.module').then(m => m.CustomerModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
