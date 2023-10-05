import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { WhyRentPropertyComponent } from './why-rent-property/why-rent-property.component';
import { CalculateEarningComponent } from './calculate-earning/calculate-earning.component';
import { TopOffersComponent } from './top-offers/top-offers.component';
import { TopCitiesComponent } from './top-cities/top-cities.component';

const routes: Routes = [
  {path:'privacy-policy', component: PrivacyPolicyComponent},
  {path:'terms-conditions', component: TermsConditionsComponent},
  {
    path: "why-rent",
    component: WhyRentPropertyComponent
  },

  {
    path: "calculate-earning",
    component: CalculateEarningComponent
  },

  {
    path: "top-offers",
    component: TopOffersComponent
  },

  {
    path: "top-cities",
    component: TopCitiesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPagesRoutingModule { }
