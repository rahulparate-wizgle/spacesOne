import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.scss']
})

/**
 * Pages-500 component
 */
export class Page500Component implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  toDashboard(){
    this.router.navigate(["/"]);
  }
}
