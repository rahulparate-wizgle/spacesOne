import { UsersService } from 'src/app/pages/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  pwdError: boolean;
  emailId: string;
 loggedUser: any;
  password: string;
  show: boolean;
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

  constructor(private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UsersService,
    private authService: AuthenticationService,
    private router: Router) {
      this.loggedUser = JSON.parse(localStorage.getItem('user'));
     }

  ngOnInit(): void {
    this.emailId = this.activeRoute.snapshot.paramMap.get("id");
    this.password = "password";
    this.resetForm = this.formBuilder.group({
      newPwd: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required]],
    });
  }
  get form() { return this.resetForm.controls; }

  async onSubmit()
  {
    let pwdObj = {};
    pwdObj['password'] = this.resetForm.value.newPwd;
      (await this.userService.updatePassword(this.emailId, pwdObj)).subscribe((res: any) =>{
        if(res.success)
        {
          if(this.loggedUser)
          {
            this.authService.logout();
          }
          this.router.navigate(['/account/login']);

        }
      })

  }

  validateConfirmPwd()
  {
    this.pwdError = false;
    if(this.resetForm.value.newPwd != this.resetForm.value.confirmPwd)
    {
      this.pwdError = true;
    }
  }
  cancel()
  {
    this.router.navigate(['/account/login']);
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
