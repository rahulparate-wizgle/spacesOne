import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticPagesRoutingModule } from './static-pages-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalculateEarningComponent } from './calculate-earning/calculate-earning.component';
import { TopCitiesComponent } from './top-cities/top-cities.component';
import { TopOffersComponent } from './top-offers/top-offers.component';
import { WhyRentPropertyComponent } from './why-rent-property/why-rent-property.component';


@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    WhyRentPropertyComponent,
    CalculateEarningComponent,
    TopOffersComponent,
    TopCitiesComponent
  ],
  imports: [
    CommonModule,
    StaticPagesRoutingModule,
    SharedModule

  ]
})
export class StaticPagesModule { }
