import { Component, OnInit } from '@angular/core';

import { wishlist } from './wishlist.model';
// import { wishlistData } from './data';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/shared/header.service';
import { SingleV1Service } from '../../catalog/single-v1/single-v1.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})

/**
 * Wishlist Component
 */
export class WishlistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  wishlistData: any;
  loggedInUser: any;
  data: any;
  usersData: any;
  cust_id: any;
  id: any;


  constructor(
    private service: AccountService,
    private router: Router,
    private headerService: HeaderService,
    private accountService: AccountService,
    private singleV1Service: SingleV1Service,
    private activeRoute: ActivatedRoute,

  ) {
    let userData: any = localStorage?.getItem('user');
    this.loggedInUser = JSON?.parse(userData);
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Account', link: '/account/info' },
      { label: 'Wishlist', active: true }
    ];

    this.cust_id = this.loggedInUser.id;

    // Chat Data Get Function
    // this._fetchData();
   this.getWishlistData();
  }

  // Chat Data Fetch
  // private async _fetchData() {
  //   if (this.loggedInUser?.wishlist.length > 0) {
  //     (await this.service.getCustomerWishlist()).subscribe((res: any) => {
  //       this.wishlistData = res;
  //     });
  //   }
  // }
  async getWishlistData(){
    (await this.singleV1Service.getAllWishList()).subscribe((res: any) => {
      this.wishlistData = res;
    });
  }

  /**
   * On mobile toggle button clicked
   */
  SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }

  async getUserData(id: any) {
    (await this.service.getUserById(id)).subscribe((res: any) => {
      this.usersData = res;
    });
  }


  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    loop: true,
  };


  logout() {
    debugger;
    localStorage.clear();
    this.router.navigate(['/']);
  }

  async removeFromWishlist(venueId:any){
    (await this.singleV1Service.deleteWishList(venueId)).subscribe(
      async (res: any) => {
        this.getWishlistData();
        },
    );
      }

  async getUserDataWish(id: any) {
    (await this.accountService.getUserById(id)).subscribe((res: any) => {
      this.usersData = res;
      localStorage.setItem('user', JSON.stringify(this.usersData));
      let userData: any = localStorage?.getItem('user');
      this.loggedInUser = JSON?.parse(userData);
      location.reload();
    });
  }
}


