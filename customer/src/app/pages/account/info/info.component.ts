import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,} from '@angular/router';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { AccountService } from '../account.service';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

/**
 * Info Component
 */
export class InfoComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public firstColleaps = true;
  profileForm!: UntypedFormGroup;
  profileFormData:any;
  loggedInUser: any;
  id!: any;
  file: any
  image!: any;
  usersData:any;
  formsubmit!: boolean;


  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private service: AccountService,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,

           ) {
    let userData: any = localStorage?.getItem('user');
    this.loggedInUser = JSON?.parse(userData);

  }

  ngOnInit(): void {

    this.id=this.loggedInUser.id;
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', link: '' },
      { label: 'Account', link: '/account/info' },
      { label: 'Personal Info', active: true }
    ];

    this.profileForm = this.formBuilder.group({
      name: ["",[Validators.required]],
      mobileNo: ["",[Validators.pattern('^[0-9]{10}')]],
      address: ["",[Validators.required]],
      // shortBio: ["",[Validators.required]]
    });
    if(this.id){
      this.getUserData(this.id);
      this.profileForm.patchValue({
        name: this.loggedInUser.name ,
        mobileNo: this.loggedInUser.mobileNo,
        address: this.loggedInUser.address ,
        shortBio: this.loggedInUser.shortBio
      })
      this.image=this.loggedInUser.image;
    }
  }

  /**
   * On mobile toggle button clicked
   */
  SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }

  get form() {
    return this.profileForm.controls;
  }

 async getUserData(id: any) {
    (await this.service.getUserById(id)).subscribe((res: any) => {
      this.usersData = res;
      localStorage.setItem('user',JSON.stringify(this.usersData) );
      let userData: any = localStorage?.getItem('user');
      this.loggedInUser = JSON?.parse(userData);
    });
   }

  async onSave() {
    let profileObj: any = {};
    profileObj.name = this.profileForm.value.name;
    profileObj.mobileNo = this.profileForm.value.mobileNo;
    profileObj.address = this.profileForm.value.address;
    profileObj.shortBio = this.profileForm.value.shortBio;

    if (this.profileForm.status != "INVALID") {
      (await this.service.updateCustomer(this.id, profileObj)).subscribe(
        async (res: any) => {
          this.profileForm.reset();
          this.profileFormData = undefined;
          this.modalService.dismissAll();
          this.getUserData(this.id);
        }

      );
    }
  }

  uploadLogo(event: any): void {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.image = reader.result;
    reader.readAsDataURL(this.file);
  }

logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  editProfileData(content: any) {
    this.modalService.open(content, { centered: true });
    // this.profileFormData = item;
    if (this.profileFormData != null) {
      this.profileFormData.patchValue(this.profileFormData);
      }
  }

  async postAttachedFiles() {
    (await this.service.addImages( this.id, this.file)).subscribe((res: any) => {
      this.getUserData(this.id);
      window.location.reload();
      })
    }
}
