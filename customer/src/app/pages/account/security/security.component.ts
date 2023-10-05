import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/shared/header.service';
import { AccountService } from '../account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})

/**
 * Security Component
 */
export class SecurityComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  fieldTextType!: boolean;
  fieldNewTextType!: boolean;
  confirmfieldTextType!: boolean;
  pwdError!: boolean;
  //  Validation form
  validationform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;
  loggedInUser: any;
  emailId!: string;
  password!: string;
  passwordError!: boolean;
  passwordErrorMessage: string = '';
  apiResponse:any;
  @ViewChild('toggleFirstModal') templateRef!: TemplateRef<any>;
  constructor(private formBuilder: UntypedFormBuilder,
              private service: HeaderService,
              private router: Router,
              private accountService: AccountService,
              private modalService: NgbModal,
              ) {
    let userData: any = localStorage?.getItem('user');
    this.loggedInUser = JSON?.parse(userData);
  }

  ngOnInit(): void {
    this.emailId=this.loggedInUser?.email;

    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Account', link:'/account/info' },
      { label: 'Password & Security', active: true }
    ];

    /**
     * Bootstrap validation form data
     */
     this.validationform = this.formBuilder.group({
      apassword: ['', [Validators.required]],
      npassword: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
    });

  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

   /**
   * Password Hide/Show
   */
    toggleNewFieldTextType() {
      this.fieldNewTextType = !this.fieldNewTextType;
    }

    /**
   * Password Hide/Show
   */
     toggleConfirmFieldTextType() {
      this.confirmfieldTextType = !this.confirmfieldTextType;
    }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
      document.getElementById('account-nav')?.classList.toggle('show');
  }

  /**
  * Bootsrap validation form submit method
  */
   async validSubmit() {

    let pwdObj:any = {};
    pwdObj['password'] = this.validationform.value.cpassword;
    if (this.validationform.valid) {
      (await this.service.updatePassword(this.emailId, pwdObj)).subscribe((res: any) =>{
        if(res.success)
        {
          if(this.loggedInUser)
          {
            this.service.logout();
            this.router.navigate(['/']);
          }
          else{
            this.router.navigate(['/']);
          }

        }

      })
    }
     else {
      return;
    }
  }

  async checkPassword(event: any) {
    this.passwordError = false;
    const enteredPassword = this.validationform.value.apassword;

    if (!this.form['apassword'].errors) {
      const obj: any = {
        password: enteredPassword,
        email: this.emailId
      };

      (await this.accountService.verifyPassword(obj)).subscribe((res: any) => {
        if (res.success) {
          this.passwordError = false;
        } else {
          this.passwordError = true;
          this.passwordErrorMessage = 'Old password does not match';
        }
      }, error => {

      });
    }
  }

  // onClick() {
  //   if (this.password === "password") {
  //     this.password = "text";
  //     this.show = true;
  //   } else {
  //     this.password = "password";
  //     this.show = false;
  //   }
  // }
  validateConfirmPwd()
  {
    this.pwdError = false;
    if(this.validationform.value.npassword != this.validationform.value.cpassword)
    {
      this.pwdError = true;
      this.passwordErrorMessage = 'Password does not match';
    }
  }
  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }

  openSignInPopup() {
    let btnSignIn = document.getElementById('btnSignIn');
    btnSignIn?.click();
  }

  logout() {
    debugger;
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
