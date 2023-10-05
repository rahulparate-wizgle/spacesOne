import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/pages/users/users.service';

@Component({
  selector: 'app-recoverpwd2',
  templateUrl: './recoverpwd2.component.html',
  styleUrls: ['./recoverpwd2.component.scss'],
})
export class Recoverpwd2Component implements OnInit {

   // set the currenr year
   year: number = new Date().getFullYear();
   recoverPwdForm: UntypedFormGroup;
   error = '';
   loading = false;
   showMessage: boolean = false;
  currentOTP: any;
  emailError: boolean = false;
  otpError: boolean = false;
  interval: number;
  loginOtpTimeStatus: boolean;
  otpTime: number;
  stepIndex: { stepIndex: number; };
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "80px",
      height: "50px",
    },
  };
  userEmail: string;
  otpErrorMsg: any;

   constructor(private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService) { }

  async ngOnInit(): Promise<void> {
    this.recoverPwdForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.recoverPwdForm.controls; }

  /**
   * On submit form
   */
  async onSubmit() {
    let obj = {}
    obj['email'] = this.recoverPwdForm.value.email;
    // stop here if form is invalid
    if (this.recoverPwdForm.valid) {
      (await this.userService.generateOtp(obj)).subscribe((res: any) => {
        if (res.success) {
          this.stepIndex ={stepIndex: 2};
          this.userEmail = res?.email;
          this.startTimer();
          }
      })
    }
    else{
      return;
    }

  }

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }

  startTimer() {
    clearInterval(this.interval);
    this.loginOtpTimeStatus = true;
    this.otpTime = 300;
    this.interval = setInterval(() => {
      if (this.otpTime > 1) {
        if (this.otpTime == 61) {
          this.otpTime = this.otpTime - 2;
        } else {
          this.otpTime--;
        }
      } else {
        this.loginOtpTimeStatus = false;
        clearInterval(this.interval);
        return;
      }
    }, 1000);
  }

  async resendOtp()
  {
    this.otpError = false;
    this.currentOTP = undefined;
    let obj = {}
    obj['email'] = this.recoverPwdForm.value.email;
    (await this.userService.generateOtp(obj)).subscribe((res: any) => {
      if (res.success) {
        this.userEmail = res.email;
        this.startTimer();
}
    })
  }

  async verifyOtp()
  {
    this.otpError = false;
    if(this.currentOTP)
    {
      (await this.userService.verifyOtp(this.userEmail, this.currentOTP)).subscribe((res: any) => {
        if(res.success)
         {
          this.router.navigate(['account/reset-password/'+ res.email]);
         }
         else
         {
          this.otpError = true;
          this. otpErrorMsg = res?.message;
         }
    });
}

  }
  async checkEmail(event)
  {
    this.emailError = false;
   if(!this.f.email.errors)
      {
        (await this.userService.verifyUser(this.recoverPwdForm.get('email').value)).subscribe(res => {
         if(!res)
          {
            this.emailError = true;
          }
          else{
            this.emailError = false;
          }
     });
    }


  }
  onOTPInputChange(v) {
    this.currentOTP = v;
  }

}
