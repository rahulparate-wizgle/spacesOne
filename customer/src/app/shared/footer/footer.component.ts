import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router,ActivatedRoute,} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

/**
 * Footer Component
 */
export class FooterComponent implements OnInit {
  loggedInUser: any;
  constructor(
    public router: Router,
    )
    {
    let userData: any = localStorage?.getItem('user');
    this.loggedInUser = JSON?.parse(userData);
   }

  ngOnInit(): void {
  }

  /**
  * SidebarHide modal
  * @param content modal content
  */
  sidebarShow() {
    document.getElementById('demo-switcher')?.classList.add('show');
    document.querySelector('.vertical-overlay')?.classList.add('show');
  }

  /**
  * SidebarHide modal
  * @param content modal content
  */
  SidebarHide() {
    document.getElementById('demo-switcher')?.classList.remove('show');
    document.querySelector('.vertical-overlay')?.classList.remove('show');
  }

  logout() {
    localStorage.clear();
    location.reload();
}

  signIn(){
    document.getElementById("btnSignIn")?.click();
  }

  register(){
    document.getElementById("btnSignUp")?.click();
  }
}
