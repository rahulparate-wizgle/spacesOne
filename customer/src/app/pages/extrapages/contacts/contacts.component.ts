import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

/**
 * Contacts Component
 */
export class ContactsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  //  Validation form
  siteKey!:string;
  validationform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;
  hideForm: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.siteKey = '6Ld01AIoAAAAANiIzOSwJF-YXC9MsIOSBU1AFU9l';
  }

  ngOnInit(): void {
    /**
   * BreadCrumb
   */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Contact us', active: true }
    ];

    /**
     * Bootstrap validation form data
     */
    this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      message: ['', [Validators.required]],
      recaptcha: ['',[Validators.required]],
    });
  }


  public sendEmail() {
    let emailObj: any = {};
    emailObj.name = this.validationform.value.name;
    emailObj.email = this.validationform.value.email;
    emailObj.mobileNumber = this.validationform.value.mobileNumber;
    emailObj.message = this.validationform.value.message;
    emailObj.recaptcha = this.validationform.value.recaptcha;

    emailjs.send('service_n7gqj7m', 'template_llfr3oh', emailObj, 'WY5dnPsZIciHagA0P')
      .then((result: EmailJSResponseStatus) => {
        this.validationform.reset();
        this.hideForm = true;
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      });
  }
  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }

}
