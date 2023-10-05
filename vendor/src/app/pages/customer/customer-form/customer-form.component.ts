import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customerForm: UntypedFormGroup;
  id: string;
  passTextType: boolean;
  fieldTextType: any;
  emailError: boolean = false;
  customerData: any;
  passwordField: boolean = true;
  image: string | ArrayBuffer;
  file: any;
  imageUploadCallback: any;
  customerResp: any;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.customerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      password: [""],
      image: [""],
    });
    if (this.id) {
      this.form.email.disable();
      this.passwordField = false;
      this.getCustomerData(this.id);
    }
  }

  get form() {
    return this.customerForm.controls;
  }

  async checkEmail()
  {
    this.emailError = false;
      {
        (await this.customerService.verifyCustomer(this.customerForm.value.email)).subscribe(res => {
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

  async getCustomerData(id) {
    (await this.customerService.getCustomerbyId(id)).subscribe((res) => {
      this.customerData = res;
      this.customerForm.patchValue({
        name: res.name,
        address: res.address,
        mobileNumber: res.mobileNumber,
        email: res.email,
        // password: res.password,
      });
      this.image = res?.image;
    });
  }

  async postCustomerData(event) {
    let customerModelObj: any = {};
    customerModelObj.name = this.customerForm.value.name;
    customerModelObj.address = this.customerForm.value.address;
    customerModelObj.email = this.customerForm.value.email;
    customerModelObj.password = this.customerForm.value.password;
    customerModelObj.mobileNumber = this.customerForm.value.mobileNumber;
    if (this.customerForm.status != "INVALID") {
      if (this.id) {
        swalWithBootstrapButtons
          .fire({
            title: "Are you sure you want to update the details?",
            icon: "success",
            confirmButtonText: "Yes, Update!",
            cancelButtonText: "No, Cancel!",
            showCancelButton: true,
          })
          .then(async (result) => {
            if (result.value) {
              (
                await this.customerService.updateCustomer(this.id, customerModelObj)
              ).subscribe(async (res: any) => {
                this.postAttachedFiles(this.id);
                this.router.navigate(["customer/list"]);
              });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {

            }
            this.router.navigate(["customer/list"]);

          });

      } else {
        swalWithBootstrapButtons
          .fire({
            title: "Are you sure you want to add?",
            icon: "warning",
            confirmButtonText: "Yes, Add!",
            cancelButtonText: "No, cancel!",
            showCancelButton: true,
          })
          .then(async (result) => {

            if (result.value) {
              (await this.customerService.postCustomer(customerModelObj)).subscribe(
                async (res: any) => {
                  // this.router.navigate(["customer/list"]);
                  // event.target.closest("tr")?.remove();
                  if (res) {
                    this.customerResp = res;
                    this.postAttachedFiles(this.customerResp.id);
                    this.customerForm.reset();
                    this.router.navigate(['customer/list']);
                  }
                });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
            }

          }
          );
      }
    }   else{
      let errors = this.customerService.apiService.getFormValidationErrors(this.customerForm);
    }
  }

  postCancel(){
    this.router.navigate(['customer/list'])
  }

  uploadLogo(event: any): void {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.image = reader.result;
    reader.readAsDataURL(this.file);
  }

   async postAttachedFiles(id) {
      (await this.customerService.postImage(this.file,id )).subscribe(
      async (resp) => {
        if(resp)
        {
          this.customerForm.reset();
          this.router.navigate(["/customer/list"]);
        }
    }
    );
  }
}
