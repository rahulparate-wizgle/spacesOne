import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { Register2Component } from './register2/register2.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';
import { AuthRoutingModule } from './auth-routing';
import { ArchwizardModule } from 'angular-archwizard';
import { NgOtpInputModule } from  'ng-otp-input';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, Register2Component, Recoverpwd2Component, ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    NgSelectModule,
    CarouselModule,
    ArchwizardModule,
    NgOtpInputModule
  ]
})
export class AuthModule { }
