import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { IconPickerComponent } from './icon-picker/icon-picker.component';


@NgModule({
  declarations: [
    TermsConditionComponent,
    PrivacyPolicyComponent,
    HelpSupportComponent,
    IconPickerComponent

  ],
  imports: [
    CommonModule,
    UtilityRoutingModule
  ],
  exports:[IconPickerComponent]
})
export class UtilityModule { }
