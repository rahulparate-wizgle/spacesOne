import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { OwlOptions } from "ngx-owl-carousel-o";
import { UsersService } from "src/app/pages/users/users.service";
import { AuthenticationService } from "../../../core/services/auth.service";
import { UserProfileService } from "../../../core/services/user.service";
import { AuthService } from "../../auth.service";
import { signupFormList } from "./register2.model";
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger ms-2'
  },
  buttonsStyling: false
});

@Component({
  selector: "app-register2",
  templateUrl: "./register2.component.html",
  styleUrls: ["./register2.component.scss"],
})
export class Register2Component implements OnInit {
  signupForm: UntypedFormGroup;
  submitted = false;
  submit: boolean;
  formsubmit: boolean;
  checkedTerms: boolean = false;
  error = "";
  successmsg = false;
  employeeModelObj: signupFormList = new signupFormList();
  selectValue: string[];
  currentOTP: any;
  signUpData: any;
  emailError: boolean = false;
  otpError: boolean = false;
  interval: number;
  loginOtpTimeStatus: boolean;
  otpTime: number;
  stepIndex: { stepIndex: number; };
  userEmail: string;
  otpErrorMsg: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private authenticationService: AuthenticationService,
    private userService: UsersService,
    private service: AuthService,

  ) {}
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
  // set the current year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.add("auth-body-bg");

    this.signupForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      number: ["", [Validators.required, Validators.pattern('^[0-9]{10}'), ]],
      cname: ["",  Validators.required],
    });

    this.selectValue = [
      "House",
      "Bar",
      "Garage",
      "Warehouse",
      "Cabin",
      "Movie Theater",
      "Mansion",
      "Community Center",
      "Castle",
    ];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1,
      },
    },
  };

  onOTPInputChange(v) {
    this.currentOTP = v;
  }

  async onSubmit() {


    this.employeeModelObj.name = this.signupForm.value.name;
    this.employeeModelObj.number = this.signupForm.value.number;
    this.employeeModelObj.password = this.signupForm.value.password;
    this.employeeModelObj.cname = this.signupForm.value.cname;
    this.employeeModelObj.email = this.signupForm.value.email;

    let onboardObj = {
      employee: {
        name: this.signupForm.value.name,
        designation: "vendor",
        email: this.signupForm.value.email,
        contactNo: this.signupForm.value.number,
        password: this.signupForm.value.password,
        },
      vendor: { name: this.signupForm.value.cname },
    };

    if (this.signupForm.status != "INVALID") {
      (await this.service.postSignUp(onboardObj)).subscribe(
        async (res: any) => {
          if (res.success) {
            this.userEmail = res.email;
            this.startTimer();
            this.stepIndex ={stepIndex: 2};
       }

        }
      );
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
    obj['email'] = this.signupForm.value.email;
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
        this.router.navigate(['account/login']);
       }
       else
       {
        this.otpError = true;
        this.otpErrorMsg = res?.message;
       }
  });
}

  }

  next()
  {

    this.signUpData = {};

    this.signUpData = {
      email: this.signupForm.value.email,
      number: this.signupForm.value.number
    }
      this.onSubmit();
  }


  async checkEmail(event)
  {
    this.emailError = false;
    ;
   if(!this.f.email.errors)
      {
        (await this.userService.verifyUser(this.signupForm.get('email').value)).subscribe(res => {
         if(res)
          {
            this.emailError = true;
          }
          else
          {
            this.emailError = false;
          }
     });
    }


  }
  switchTerms() {
    this.checkedTerms = !this.checkedTerms;
 }

}
