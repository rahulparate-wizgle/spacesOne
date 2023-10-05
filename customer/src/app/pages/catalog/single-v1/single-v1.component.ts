import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Lightbox } from 'ngx-lightbox';

import { aboutReviews, recently } from './single-v1.model';
import { aboutReviewData, recentlyData } from './data';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { SingleV1Service } from './single-v1.service';
import { ChatService } from 'src/app/services/chat.service';
import { customerType,customerStatus } from './type.data';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-single-v1',
  templateUrl: './single-v1.component.html',
  styleUrls: ['./single-v1.component.scss']
})

/**
 * SingleV1 Component
 */
export class SingleV1Component implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  aboutReviewData!: aboutReviews[];
  recentlyData!: recently[];
  public overviewColleaps = true;
  public amenitiesColleaps = true;
  //  Validation form
  validationform!: UntypedFormGroup;
  signUpform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;
  longitude = 20.728218;
  latitude = 52.128973;
  venuesDetails: any;
  id: any;
  hideForm: boolean = false;
  venuesSameType: any;
  type: any;
  venuesFromVendor: any;
  isLoading: boolean = false;
  _album: any = [];
  loggedInUser: any;
  cust_id: any;
  usersData: any;
  wishlistData: any;
  isAlreadyWishlisted: boolean = false;
  wishListEmpty: any;
  validobj: any;
  showSaveButton: boolean = true;
  venueContact: any;
  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder,
    private _lightbox: Lightbox,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private accountService: AccountService,
    private service: SingleV1Service,
    private chatService:ChatService,
  ) {
    let userData: any = localStorage?.getItem('user');
    this.loggedInUser = JSON?.parse(userData);
  }

  getFrontBaseUrl(){
    return window.location.origin+'/#/venues/details/';
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.venueDetailsById(this.id);
    }
    this.loginUser();
    this.checkEmployee(this.id);
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Space', link: '/venues' },
      { label: 'Space Details', active: true }
    ];

    /**
    * Bootstrap validation form data
    */
    this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      bookingDate: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      additionalMessage: [''],
      emailQuotation: [''],
      numberOfPeople: ['', [Validators.required]],
    });

    /**
     * Bootstrap validation form data
     */
    this.signUpform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

    // Data Get Function
    this._fetchData();

  }

  async venueDetailsById(id: string) {
    this.isLoading = true;
    (await this.apiService.commonGet('/venues/' + id)).subscribe((res: any) => {
      this.venuesDetails = res;
      this.similarVenue();
      this.getVenueFromVendor();
      this.patchNameFromLoggedinUser();
      this.isLoading = false;
      this.venuesDetails.gallery.forEach((valueSrc: any, i: number) => {
        const src = valueSrc;
        const caption = '';
        const thumb = valueSrc;
        const album = {
          src: src,
          caption: caption,
          thumb: thumb
        };
        this._album.push(album);
      })
    });
  }

  async similarVenue() {
    this.isLoading = true;
    let query = {
      limit: 100,
      skip: 0,
      where: { type: this.venuesDetails.type[0] },
    };
    (await this.apiService.commonGet('/venues/', query)).subscribe((res: any) => {
      this.venuesSameType = res;


      this.venuesSameType.splice(0, 1); // need to changed, proper data should come from backend

      this.isLoading = false;
    });
  }

  async getVenueFromVendor() {
    this.isLoading = true;
    let query = {
      limit: 100,
      skip: 0,
      where: {
        master_venue: this.venuesDetails.master_venue,
        vendorId: this.venuesDetails.vendorId
      },
    };
    (await this.apiService.commonGet('/venues/', query)).subscribe((res: any) => {
      this.venuesFromVendor = res;
      this.venuesFromVendor.splice(0, 1); // need to changed, proper data should come from backend

      this.isLoading = false;
    });
  }

  // Data Fetch
  private _fetchData() {
    this.aboutReviewData = aboutReviewData;
    this.recentlyData = recentlyData;
  }

  /**
   * Open Review modal
   * @param reviewContent modal content
   */
  openReviewModal(reviewContent: any) {
    this.modalService.open(reviewContent, { centered: true });
  }

  /**
   * Open Review modal
   * @param content modal content
   */
  openMapModal(content: any) {
    this.modalService.open(content, { size: 'fullscreen', centered: true });
  }

  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: true,
    navigation: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 4,
      }
    }
  };

  /**
  * Bootsrap validation form submit method
  */
  patchNameFromLoggedinUser() {
    this.validationform?.patchValue({
      name: this.loggedInUser?.name,
      emailId: this.loggedInUser?.email,
      mobileNumber: this.loggedInUser?.mobileNumber,
      customerId: this.loggedInUser?.id, // Add customerId
    });
    if (this.loggedInUser) {
      this.validationform?.get('name')?.disable();
      this.validationform?.get('emailId')?.disable();
      this.validationform?.get('mobileNumber')?.disable();
    }
  }

  async validSubmit() {
    let validobj: any = {};
    validobj.name = this.validationform.value.name;
    validobj.emailId = this.validationform.value.emailId;
    validobj.bookingDate = this.validationform.value.bookingDate;
    validobj.mobileNumber = this.validationform.value.mobileNumber;
    validobj.additionalMessage = this.validationform.value.additionalMessage;
    validobj.numberOfPeople = this.validationform.value.numberOfPeople;
    validobj.venueId = this.id;
    validobj.customerId = this.loggedInUser?.id;
    validobj.venueName = this.venuesDetails?.name;
    validobj.vendorId = this.venuesDetails?.vendorId;
    validobj.userId = this.loggedInUser?.userId;
    validobj.status = customerStatus.New,
   validobj.type = customerType.Online;
    validobj.venuePrice = parseInt(this.venuesDetails?.pricing?.perUnit);
    this.submit = true;
    if (this.validationform.status != "INVALID") {
      (await this.apiService.commonPost('enquiry', validobj)).subscribe((res: any) => {
        this.hideForm = true;
        this.createEnquiryChannel(res)
      })
    }
    else {
      return;
    }
  }

  async createEnquiryChannel(enq:any){
    let userStr = localStorage.getItem('user') || '';
    let user = JSON.parse(userStr);
    let channel = await this.chatService.createOpenChannel( user.name, enq.id,{venueId:enq.venueId,venueName:enq.venueName})
  }
  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }

  /**
   * returns tooltip validation form
   */
  get formData() {
    return this.signUpform.controls;
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  customOpen(a: any): void {
    // open lightbox
    this._lightbox.open(this._album, a);

  }

  // Sort filter
  sortField: any;
  sortBy: any
  SortFilter() {
    this.sortField = (document.getElementById("reviews-sorting") as HTMLInputElement).value;
    if (this.sortField[0] == 'A') {
      this.sortBy = 'desc';
      this.sortField = this.sortField.replace(/A/g, '')
    }
    if (this.sortField[0] == 'D') {
      this.sortBy = 'asc';
      this.sortField = this.sortField.replace(/D/g, '')
    }
  }


  openPdf(url: string) {
    window.open(url, "_blank");
  }

  async addToWishlist() {
    let wishlistObj: any = {};
    (await this.service.postWishlist(this.id, wishlistObj)).subscribe(
      async (res: any) => {
        this.checkWishlist(this.id);
        this.showSaveButton = false;
      },
    );
  }

  async removeFromWishlist() {

    (await this.service.deleteWishList(this.id)).subscribe(
      async (res: any) => {
        this.checkWishlist(this.id);
        this.showSaveButton = true;
      },
    );
  }

  async getUserData(id: any) {
    (await this.accountService.getUserById(id)).subscribe((res: any) => {
      this.usersData = res;
      localStorage.setItem('user', JSON.stringify(this.usersData));
      let userData: any = localStorage?.getItem('user');
      this.loggedInUser = JSON?.parse(userData);
      location.reload();
    });
  }

  async loginUser() {
    if (this.loggedInUser) {
      await this.checkWishlist(this.loggedInUser.id);
    }
  }


  async checkWishlist(id: any) {
    (await this.service.getAlreadyInWishList(id)).subscribe((res: any) => {
      this.isAlreadyWishlisted = res.isAlreadyInWishlist;
    });
  }
  async checkEmployee(id: any) {
    (await this.service.getAllEmployeeList(id)).subscribe((res: any) => {
      this.venueContact = res[0];
    });
  }

  getInitials(fullName: string): string {
    const words = fullName.split(' ');
    const initials = words.map(word => word.charAt(0)).join('');
    return initials.toUpperCase(); // Convert to uppercase if needed
  }


}
