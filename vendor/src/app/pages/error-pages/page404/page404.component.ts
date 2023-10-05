import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})

/**
 * PAges-404 component
 */
export class Page404Component implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  toDashboard(){
    this.router.navigate(["/"]);
  }
}
