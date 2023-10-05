import { VendorsService } from './../../../pages/vendor/vendors.service';
import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { AuthenticationService } from "../../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../../core/services/authfake.service";

import { ActivatedRoute, Router } from "@angular/router";

import { OwlOptions } from "ngx-owl-carousel-o";
import { loginFormList } from "./login.model";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;
  error = "";
  returnUrl: string;
  employeeModelObj: loginFormList = new loginFormList();
  submit: boolean;
  formsubmit: boolean;

  // set the currenr year
  year: number = new Date().getFullYear();
  invalidCreds: boolean = false;
  password;
  show = false;

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: UntypedFormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private authenticationService: AuthenticationService,
    private service: AuthService,
    private vendorsService: VendorsService,
  ) {}
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
  ngOnInit() {
    this.password = "password";
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  onClick() {
    if (this.password === "password") {
      this.password = "text";
      this.show = true;
    } else {
      this.password = "password";
      this.show = false;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  async onSubmit(event) {
    this.employeeModelObj.username = this.loginForm.value.username;
    this.employeeModelObj.password = this.loginForm.value.password;
    if (this.loginForm.status != "INVALID") {
      (await this.service.postLogin(this.employeeModelObj)).subscribe(
        async (res: any) => {
          if (res.token.length) {
            this.authenticationService.setUser(res);
            if(res?.profile?.vendorId)
            {
            this.getVendor(res.profile?.vendorId);
            }
            //localStorage.setItem('token',res.token)
            this.loginForm.reset();
            this.router.navigate(["dashboard"]);
          }
        },
        (err) => {
          this.invalidCreds = true;
          return;
        }
      );
    } else {
        this.invalidCreds = true;
    }
  }

  async getVendor(vendorId) {
    (await this.vendorsService.getVendorsbyId(vendorId)).subscribe((res) => {
      let vendorData = {
        logo: res?.logo,
        name: res?.name,
      }
      localStorage.setItem("vendor", JSON.stringify(vendorData));
    });
  }
}
