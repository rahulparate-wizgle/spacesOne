import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpSupportComponent } from './help-support/help-support.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

const routes: Routes = [
  {
    path: 'Terms & Conditions ',
    component: TermsConditionComponent
  },
  {
    path: 'Privacy Policy ',
    component: PrivacyPolicyComponent
  },
  {
    path: 'Help & Support',
    component:HelpSupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
