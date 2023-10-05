import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { contactFormList } from './contact-us.model';
import { ContactUsService } from './contact-us.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: any;
  selectValue: string[];
  selectVenue: string[];
  validationError: any = {};
  contactModelObj: contactFormList = new contactFormList();

  constructor( private formBuilder: FormBuilder, public router: Router, private service: ContactUsService) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      address: ["", [Validators.required]],
      email: ["", [Validators.required]],
      mobNumber: ["", [Validators.required]],
      message: ["", [Validators.required]],
      status: ["", [Validators.required]],
      comment: ["", [Validators.required]],
      enquiryDate: ["",[Validators.required]],
      venueName:["",[Validators.required]]

    });
    this.selectValue = [
      'Active',
      'New',
      'Close',
  ];
  this.selectVenue=[
    'Radission blu',
    'Rajwada',
    'Deshpande Hall'
  ]
  }


  async postContactData(event) {
    this.contactModelObj.name = this.contactForm.value.username;
    this.contactModelObj.address = this.contactForm.value.address;
    this.contactModelObj.enquiryDate = this.contactForm.value.enquiryDate;
    this.contactModelObj.emailId = this.contactForm.value.email;
    this.contactModelObj.mobileNumber = this.contactForm.value.mobNumber;
    this.contactModelObj.additionalMessage = this.contactForm.value.message;
    this.contactModelObj.status = this.contactForm.value.status;
    this.contactModelObj.venueName = this.contactForm.value.venueName;
    this.contactModelObj.internalComment = this.contactForm.value.comment;
    if (this.contactForm.status != "INVALID") {
        (await this.service.postContactUs(this.contactModelObj)).subscribe(
          async (res: any) => {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger ms-2'
              },
              buttonsStyling: false
            });

            swalWithBootstrapButtons
              .fire({
                title: 'You Want to Add?',
                icon: 'warning',
                confirmButtonText: 'Yes, Added!',
                cancelButtonText: 'No, cancel!',
                showCancelButton: true
              })
              .then(result => {
                this.contactForm.reset();
                // this.router.navigate(['venue-amenities/list'])
                if (result.value) {
                  swalWithBootstrapButtons.fire(
                    'Add Blog',
                    'Your file has been Added.',
                    'success'
                  );
                  event.target.closest('tr')?.remove();
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  );
                }
              });
          }
        );

    } else {
      this.validationError = this.service.getFormValidationErrors(
        this.contactForm
      );
    }
  }

}
