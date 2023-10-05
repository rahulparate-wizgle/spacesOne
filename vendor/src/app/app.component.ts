import { Component , OnInit} from '@angular/core';
// import { UserService} from 'venue-lib';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(){

  }
  // private userService : UserService
  ngOnInit() {
    // console.log( this.userService.anotherFunction('wizgle'))
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");

    // document.body.setAttribute('data-layout-mode', 'dark');

  }
  test(){
    // console.log( this.userService.anotherFunction('wizgle'))
  }
}
