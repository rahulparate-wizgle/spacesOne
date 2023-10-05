import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from '../header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

/**
 * Header Component
 */
export class HeaderComponent implements OnInit {
  mode: string | undefined;
  loginPassfield!: boolean;
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  menuItems: MenuItem[] = [];
  //  Validation form
  validationform!: UntypedFormGroup;
  signUpform!: UntypedFormGroup;
  resetForm!: UntypedFormGroup;
  cnfPwdForm!: UntypedFormGroup;
  verifyOtpForm!: UntypedFormGroup;

  submit!: boolean;
  formsubmit!: boolean;
  isContainerFluid = false;
  invalidCreds: boolean = false;
  password: any;
  hideForm: boolean = false;
  userEmail: any;
  id: any;
  staticDataModal: any;
  emailError: boolean = false;
  isErrorMessageShown: boolean = false;
  loggedInUser: any;
  customerData: any;
  disableButton: boolean = true;
  loginOtpTimeStatus!: boolean;
  otpTime!: number;
  interval: any;
  otpErrorMsg: any;
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

  @ViewChild('sideMenu') sideMenu!: ElementRef;
  otpError: boolean = false;
  currentOTP: any;
  errorMsg: any;
  pwdError!: boolean;
  emailNotAvailable: boolean = false


  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private service: HeaderService
    ) {
      this.stepIndex = { stepIndex: 0 };
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activateMenu();
      }
    });
    let userData: any = localStorage?.getItem('user');
    this.loggedInUser = JSON?.parse(userData);
  }

  ngOnInit(): void {

    /**
     * Bootstrap validation form data
     */
    this.validationform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    /**
     * Bootstrap validation form data
     */
    this.signUpform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpwd: ['', Validators.required],
      checkbox: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]]
    });

    /**
      * Bootstrap forget password form data
      */
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    /**
     * Bootstrap password reset form data
     */
    this.cnfPwdForm = this.formBuilder.group({
      newPwd: ['', [Validators.required]],
      confPwd: ['', Validators.required]
    });

    // Menu Items
    this.menuItems = MENU;


    if (this.router.url === '/venues') {
      this.isContainerFluid = true;
    }


  }

  /**
  * Window scroll method
  */
  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar');
    if (document.documentElement.scrollTop > 40) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.remove('show');
    }
  }

  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
  toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'lg', centered: true });
  }
  secondModal(toggleSecondModal: any) {
    this.modalService.open(toggleSecondModal, { size: 'lg', centered: true });
  }
  forgetPwdModal(toggleForgetPwdModal: any) {
    this.modalService.open(toggleForgetPwdModal, { size: 'lg', centered: true });
  }
  otpModal(toggleOtpModal: any) {
    this.modalService.open(toggleOtpModal, { size: 'lg', centered: true });
  }
  cnfPwdModal(toggleCnfPwdModal: any) {
    this.modalService.open(toggleCnfPwdModal, { size: 'lg', centered: true });
  }
  OTPModal(toggleOTPModal: any) {
    this.modalService.open(toggleOTPModal, { size: 'lg', centered: true });
  }


  /**
   * Password Hide/Show
   */
  toggleLoginPassField() {
    this.loginPassfield = !this.loginPassfield;
  }

  /**
   * Password Hide/Show
   */
  toggleSignUpPassField() {
    this.signupPassfield = !this.signupPassfield;
  }

  /**
   * Password Hide/Show
   */
  toggleSignUpCPassField() {
    this.signupCPassfield = !this.signupCPassfield;
  }


  /**
 * On menu click
 */
  onMenuClick(event: any) {
    const nextEl = event.target.nextElementSibling;
    if (nextEl) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove('show');
      }
      nextEl.classList.toggle('show');
    }
    return false;
  }

  ngAfterViewInit() {
    this.activateMenu();
  }

  /**
  * Activates the menu
  */
  private activateMenu() {
    const resetParent = (el: any) => {
      const parent = el.parentElement;
      if (parent) {
        parent.classList.remove('active');
        const parent2 = parent.parentElement;
        this._removeAllClass('mm-active');
        this._removeAllClass('mm-show');
        if (parent2) {
          parent2.classList.remove('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              parent4.classList.remove('active');
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('active');
                const menuelement = document.getElementById(
                  'topnav-menu-content'
                );
                if (menuelement !== null)
                  if (menuelement.classList.contains('show'))
                    document
                      .getElementById('topnav-menu-content')!
                      .classList.remove('show');
              }
            }
          }
        }
      }
    };

    // activate menu item based on location
    const links: any = document.getElementsByClassName('side-nav-link-ref');
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (location.pathname === links[i]['pathname']) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      const parent = matchingMenuItem.parentElement;
      if (parent) {
        parent.classList.add('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              parent4.classList.add('active');
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.add('active');
              }
            }
          }
        }
      }
    }
  }

  /**
  * remove active and mm-active class
  */
  _removeAllClass(className: any) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
  * Topbar Light-Dark Mode Change
  */
  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.body.setAttribute('data-layout-mode', "light");
        document.body.setAttribute('data-sidebar', "light");
        break;
      case 'dark':
        document.body.setAttribute('data-layout-mode', "dark");
        document.body.setAttribute('data-sidebar', "dark");
        break;
      default:
        document.body.setAttribute('data-layout-mode', "light");
        break;
    }
  }

  /**
* Returns true or false if given menu item has child or not
* @param item menuItem
*/
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * On mobile toggle button clicked
   */
  toggleMobileMenu() {
    if (window.screen.width <= 1024) {
      document.getElementById('navbarNav')?.classList.toggle('show');
    }
  }

  /**
 * Bootsrap validation form submit method
 */
  async validSubmit() {
    let customerObj = {
      username: this.validationform.value.email,
      password: this.validationform.value.password
    }

    if (this.validationform.status != "INVALID") {
      (await this.service.postLogin(customerObj)).subscribe(
        async (res: any) => {
          if (res.token.length) {
            this.service.setUser(res);
            // this.validationform.reset();
            // this.hideForm = true;
            location.reload();
          }
        },
        (err) => {
          this.invalidCreds = true;
          return;
        }
      );
    }
    else {
      this.invalidCreds = true;
    }
  }

  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }

  async postCustomerData() {
    let customerObj: any = {};
    customerObj.name = this.signUpform.value.name;
    customerObj.email = this.signUpform.value.email;
    customerObj.password = this.signUpform.value.password;
    customerObj.confirmpwd = this.signUpform.value.confirmpwd;
    customerObj.mobileNumber  = this.signUpform.value.mobileNumber;
    if (this.signUpform.status != "INVALID") {
      (await this.service.postCustomer(customerObj)).subscribe(
        async (res: any) => {
          if (res.success) {
            this.userEmail = res.email;
            this.startTimer();
            this.stepIndex ={stepIndex: 2};
       }
          this.signUpform.reset();
          this.modalService.dismissAll();
          this.openSignInPopup();
        },
      );
    }
  }


  openSignInPopup() {
    let btnSignIn = document.getElementById('btnSignIn');
    btnSignIn?.click();
  }

  /**
   * returns tooltip validation form
   */
  get formData() {
    return this.signUpform.controls;
  }

  /**
 * Demos Onclick
 */
  demosDroupDownClick() {
    document.querySelector('.demos')?.classList.toggle('show');
  }

  async checkEmailError() {
    let email = this.signUpform.get('email')?.value || '';
    this.emailError = false;

    if (email) {
      (await this.service.verifyUser(email)).subscribe(async (res: boolean) => {
        if (res) {
          this.emailError = true;
          // Delay before closing the modal
          const modalCloseDelay = 1000; // 1 seconds
          await this.delay(modalCloseDelay);

          // Close the modal and open the sign-in popup
          // this.signUpform.reset();
          // this.modalService.dismissAll();
          // this.openSignInPopup();
        }
      });
    }
  }
  // Function to introduce a delay using Promises
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  get rformData() {
    return this.resetForm.controls;
  }

  get cnfPwdformData() {
    return this.cnfPwdForm.controls;
  }

  async checkEmail(event: any) {
      this.emailNotAvailable = false;
    if (!this.rformData['email'].errors) {
      (await this.service.verifyUser(this.rformData['email'].value)).subscribe((res: any) => {
        if(res){
          this.emailNotAvailable = false;
        }
        else {
          this.emailNotAvailable = true;
        }
      });
    }
  }

  async verifyOtp(modal: any) {
    this.otpError = false;
    if (this.currentOTP) {
      (
        await this.service.verifyOtp(this.userEmail, this.currentOTP)
      ).subscribe((res: any) => {
        if (res.success) {
          this.modalService.dismissAll();
          this.cnfPwdModal(modal);
        } else {
          this.otpError = true;
          this.otpErrorMsg = res.message;
        }
      });
    }
  }

  async resendOtp(modal: any) {
    this.otpError = false;
    this.currentOTP = undefined;
    let obj: any = {};
    obj['email'] = this.rformData['email'].value;
 (await this.service.generateOtp(obj)).subscribe((res: any) => {
      if (res.success) {
        this.userEmail = res.email;
        this.modalService.dismissAll();
        this.otpModal(modal);
        this.startTimer();
      }
    });
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

  async onSubmit(modal: any) {
      let obj: any = {};
    obj['email'] = this.rformData['email'].value;
    // stop here if form is invalid
    if (this.resetForm.valid) {
      (await this.service.generateOtp(obj)).subscribe((res: any) => {
     if (res.success) {
          this.userEmail = res?.email;
          this.modalService.dismissAll();
          this.otpModal(modal);
          this.startTimer();
        }
      })
    }
    else {
      return;
    }
  }

  async validatePassword(modal: any) {
    let pwdObj: any = {};
    pwdObj['password'] = this.cnfPwdformData['confPwd'].value;;
    (await this.service.updatePassword(this.userEmail, pwdObj)).subscribe((res: any) => {
      if (res.success) {
        this.modalService.dismissAll();
        this.secondModal(modal);
        if (this.loggedInUser) {
          this.service.logout();
        }
      }
    })
  }

  onOTPInputChange(v: any) {
    this.currentOTP = v;
  }

  validateConfirmPwd() {
    this.pwdError = false;
    if (this.cnfPwdForm.value.newPwd != this.cnfPwdForm.value.confPwd) {
      this.pwdError = true;
    }
  }
  async resendRegOTP() {
    this.otpError = false;
    this.currentOTP = undefined;
    let obj: any = {};
    obj['email'] = this.signUpform.value.email;
    (await this.service.generateOtp(obj)).subscribe((res: any) => {
      if (res.success) {
        this.userEmail = res.email;
        // this.modalService.dismissAll();
        this.startTimer();
      }
    });
  }
  async verifyRegOTP()
  {
    this.otpError = false;
    if(this.currentOTP)
    {
      (await this.service.verifyRegOTP(this.userEmail, this.currentOTP)).subscribe((res: any) => {
      if(res.success)
       {
        this.signUpform.reset();
        this.modalService.dismissAll();
        this.openSignInPopup();
        this.startTimer();
       }
       else
       {
        this.otpError = true;
        this.otpErrorMsg = res?.message;
       }
  });
}
  }

async generateRegOTP(modal :any)
{
  let obj = this.signUpform.value;
  (await this.service.getRegOTP(obj)).subscribe((res: any) => {
    if (res.success)
     {
      this.userEmail = res?.email;
      this.OTPModal(modal);
     }
     else {
     this.otpError = true;
     }
});
}
}
