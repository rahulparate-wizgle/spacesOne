import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { usersFormList } from "./users-form.model";
import { UsersService } from "../users.service";
import { VendorsService } from "../../vendor/vendors.service";
import { Location } from '@angular/common';
import { VenuelistApiService } from "../../venue-list/venuelist-api.service";
import { designations } from "src/app/services/constants/constants";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  public Editor = ClassicEditor;
  usersForm: UntypedFormGroup;
  files: any;
  status = ['Active', 'Disable'];
  company: any;
  user: any;
  imageUploadCallback: any;
  companyData: any;
  location
  userProfile: any;
  locationsList: any[];
  id: string;
  emailError: boolean = false;
  usersData: any;
  venuesData: any;
  password;
  show = false;
  invalidCreds: boolean = false;
  loginPassfield!: boolean;
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  designation: any;
  constDesignations = designations;
  isInputReadonly: boolean = true;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private service: UsersService,
    private activeRoute: ActivatedRoute,
    private vendorService: VendorsService,
    private _location: Location,
    private venueListService: VenuelistApiService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.company = this.user?.designation;
    this.designation = this.user?.designation;
  }

  ngOnInit(): void {
    this.getVenueList();
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.getCompanyData(this.user?.vendorId);
    this.usersForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      designation: ["", [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+')]],
      summary: ["", [Validators.required]],
      status: ["", [Validators.required]],
      company: [""],
      image: [""],
      assignedVenueIds: [""],
      password: [""],
    });
    if (this.id) {
      this.form.email.disable();

      this.form.designation.disable();
      this.getUserData(this.id);
    }
    this.addDesignationsByRole();

    this.usersForm.patchValue({
      designation: this.constDesignations.manager
    });

  }
  // async addDesignationsByRole(){
  //   let user = await this.service.getCurrentUser();
  //   if(user.designation == 'admin'){
  //   this.empDesignation = [{name:"Admin",value:"admin"},{name:"Vendor",value:"vendor"},{name:"Employee",value:"employee"},];
  //   }else if(user.designation == 'vendor'){
  //     this.empDesignation = [{name:" Venues Manager",value:"manager"},];
  //   }
  // }
  async addDesignationsByRole() {
    let user = await this.service.getCurrentUser();
    if (user.designation == this.constDesignations.vendor) {
      this.designation = this.constDesignations.manager
    }
  }
  async getCompanyData(id) {
    (await this.vendorService.getVendorsbyId(id)).subscribe((res) => {
      this.companyData = res;
      this.locationsList = this.companyData?.locations;
      this.usersForm.patchValue({
        company: this.companyData?.name,
      })
    });
  }

  get form() {
    return this.usersForm.controls;
  }

  async checkEmail() {
    this.emailError = false;
    {
      (await this.service.verifyUser(this.usersForm.value.email)).subscribe(res => {
        if (res) {
          this.emailError = true;
        }
        else {
          this.emailError = false;
        }
      });
    }
  }

  async getUserData(id) {
    (await this.service.getUsersbyId(id)).subscribe((res) => {
      this.usersData = res;
      this.usersForm.patchValue({
        name: res.name,
        mobileNumber: res.mobileNumber,
        designation: res.designation,
        email: res.email,
        summary: res.summary,
        location: res.location,
        status: res.status,
        company: res.company,
        assignedVenueIds: res.assignedVenueIds,
      });
      ;
    });
  }

  async getVenueList() {
    (await this.venueListService.getList()).subscribe((res) => {
      this.venuesData = res;
    })
  }

  postCancel() {
    this._location.back();
  }

  async postUsersData(event) {
    let employeeModelObj: any = {};
    employeeModelObj.name = this.usersForm.value.name;
    employeeModelObj.mobileNumber = this.usersForm.value.mobileNumber;
    employeeModelObj.designation = this.constDesignations.manager;
    employeeModelObj.email = this.usersForm.value.email;
    employeeModelObj.summary = this.usersForm.value.summary;
    employeeModelObj.location = this.usersForm.value.location;
    employeeModelObj.status = this.usersForm.value.status;
    employeeModelObj.assignedVenueIds = this.usersForm.value.assignedVenueIds;
    employeeModelObj.password = this.usersForm.value.password;
    employeeModelObj.company = this.usersForm.value.company ?? this.companyData.name;
    if (this.usersForm.status != "INVALID") {
      if (this.id) {
        employeeModelObj.email = this.usersData.email;
        employeeModelObj.mobileNumber = this.usersForm.value.mobileNumber ?? this.usersData.mobileNumber;
        (await this.service.updateUsers(this.id, employeeModelObj))
          .subscribe((res: any) => {
            this.router.navigate(['users-list/list'])
          }
          );
      } else {
        (await this.service.postUsers(employeeModelObj)).subscribe(
          async (res: any) => {
            this.router.navigate(['users-list/list'])
            event.target.closest('tr')?.remove();
          }
        );
      }
    }
    else {
      let errors = this.service.apiService.getFormValidationErrors(this.usersForm);
      console.log(errors)
    }
  }

  fileChangeEvent(event: any): void {
    this.files = event.target.files
    this.postAttachedFiles();
  }

  async postAttachedFiles() {
    (await this.service.addGalleryImages(this.files[0], this.id, this.imageUploadCallback));
    this.getUserData(this.id);
  }

  toggleLoginPassField() {
    this.loginPassfield = !this.loginPassfield;
  }

  /**
   * Password Hide/Show
   */
  toggleSignUpPassField() {
    this.signupPassfield = !this.signupPassfield;
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

}


