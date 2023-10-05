import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorsService } from './vendors.service';
import Swal from 'sweetalert2';
import { VenuelistApiService } from '../venue-list/venuelist-api.service';
import { Users } from '../users/users-list/users-list.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../users/users.service';
import { userGridData } from '../users/users-list/data';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-secondary ms-2'
  },
  buttonsStyling: false
});


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  vendorId: string;
  pageFor: any;
  vendorData: any;
  profileForm: FormGroup;
  file: any;
  user: any;
  locationName: string = '';
  locationError: boolean = false;
  logo: string;
  venueList: any;
  venueLocationError: boolean;
  locationArr: any[];
  preview: boolean = false;
  breadCrumbItems: Array<{}>;
  userGridData: Users[];
  selected;
  userForm: UntypedFormGroup;
  data: any;
  filteredUsers: any[];
  filterBy;
  usersData: any;
  value: string[];
  dropData: any;
  userslist: UntypedFormGroup;
  selectStatus: string[];
  location: string[];
  status: string[];
  company: string[];
  companyData: any;
  filterData: any;
  locations: any;
  companyDataList: any;

  constructor(private vendorsService: VendorsService,
    public router: Router,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private userservice: UsersService,
    private activeRoute: ActivatedRoute,
    private vendorService: VendorsService,
    private fb: FormBuilder,
    private venueService: VenuelistApiService,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.vendorId = this.user?.vendorId;
  }

  ngOnInit(): void {
    this.pageFor = 'Profile'
    this.fetchData();
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.getCompanyData(this.user?.vendorId);
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users Grid', active: true }];
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      email: ['', [Validators.required]],
      designation: ['', [Validators.required]],
    });
    this.userslist = this.formBuilder.group({
      cName: [""],
      location: [""],
      status: [""],
    })
    this.getUsersListAllData()
    this.status = ['Active', 'Disable'];
     }

  fetchData()
  {
    this.getVendor();
    this.createForm();
  }
  createForm() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      companyEmail: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      companyWebsite: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      contactPersonName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      contactMobileNumber: ['', [Validators.required]],
      contactEmail: ['', [Validators.required]],
      gstn: ['', [Validators.required, Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]],
      cin: ['', [Validators.required, Validators.pattern('^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$')]],
      tan: ['', [Validators.required, Validators.pattern('[A-Za-z]{4}[0-9]{5}[A-Za-z]{1}')]],
      logo: [''],
    });
  }

  getVenueLocation()
  {
    let venueLocation;
    this.locationArr = []
    this.vendorData?.locations?.forEach(async loc => {
      this.locationArr.push({'name':loc, 'disable': true});
      // venueLocation = this.venueList?.filter(v => v.location === loc);

    });
  }


  async addLocation() {
    if (this.locationName) {
      this.locationError = false;

      if (!this.vendorData?.locations?.length) {
        this.vendorData['locations'] = [];
      }
      this.vendorData.locations.push(this.locationName);
      this.vendorData['logo'] = this.logo;
      (await this.vendorsService.updateVendorOnly(this.vendorData, this.vendorId)).subscribe((res => {

        this.locationName = '';
        this.getVendor();
        swalWithBootstrapButtons.fire(
          "Location Added Successfully",
          " ",
          "success"
        );
      }))

    }
    else {
      this.locationError = true;
    }

  }

  async removeLocation(i) {
   if (this.vendorData.locations.length) {
        this.vendorData.locations.splice(i, 1);
      }
      (await this.vendorsService.updateVendorOnly(this.vendorData, this.vendorId)).subscribe((res => {
        this.locationName = '';
        // this.pageFor = 'Profile';
        this.getVendor();
      }))
  }
  async getVendor() {
    (await this.vendorsService.getVendorsbyId(this.vendorId)).subscribe(res => {

      this.vendorData = res;
      this.logo = this.vendorData.logo;
      this.getVenueLocation();
      if (this.vendorData?.createdProfile) {
        this.profileForm.patchValue(this.vendorData);
      }
      else {
        this.profileForm.patchValue({
          name: this.vendorData?.name,
          contactPersonName: this.user?.name,
          designation: this.user?.designation,
          contactMobileNumber: this.user?.contactNo,
          contactEmail: this.user?.email,

        })
      }

    })
  }



  confirmPost() {

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No, cancel!",

      })
      .then(result => {
        if (result.isConfirmed) {
          this.postVendorData();

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {

        }
      });

  }
  async postVendorData() {

    let profileFormData = this.profileForm.value;
    profileFormData['createdProfile'] = true;
    profileFormData['logo'] = this.logo;


    (await this.vendorsService.updateVendor(profileFormData, this.vendorId)).subscribe((res => {

      let vendorData = {
        logo: profileFormData?.logo,
        name: profileFormData?.name,
      }
      localStorage.setItem("vendor", JSON.stringify(vendorData));

      this.pageFor = 'Profile';
      this.getVendor();
    }))
  }

  editProfile() {
    this.pageFor = 'Edit';
  }

  uploadLogo(event: any): void {
    this.file = event.target.files[0];
    this.postAttachedFiles();
  }

  get f() {
    return this.profileForm.controls;
  }

  async postAttachedFiles() {
(await this.vendorsService.addImages(this.file, this.vendorId)).subscribe(
      (resp) =>{
          this.logo = resp?.url;
      }
    );


  }

  previewImage(){
    this.preview = true;
    this.logo = this.vendorData?.logo;
  }


  async getUsersListAllData() {
    (await this.userservice.getUserList()).subscribe(res => {
      this.usersData = res;
      this.filteredUsers = [...this.usersData];
    })
  }


  async getCompanyData(id) {
    (await this.vendorService.getVendorsbyId(id)).subscribe((res) => {
      this.companyDataList = res;
      this.locations = this.companyDataList?.locations;
      this.userslist.patchValue({
        cName: this.companyDataList?.name,
      })
    });
  }

  getCompanyNameById(companyId) {
    return this.companyData?.find(company => company.id === companyId)?.name
  }
  onDetails(id) {
    this.router.navigate(['/users-list/users-detail/' + id])
    this.data = id;
  }

  filter() {
    this.filteredUsers = [...this.usersData.filter(data => data.name.toLowerCase().includes(this.filterBy.toLowerCase()))];
  }

  get form() {
    return this.userForm.controls;
  }

  /**
 * Open modal
 * @param content modal content
 */
  openViewModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  // onSettingsButtonClicked() {
  //   document.body.classList.toggle('right-bar-enabled');
  // }
  public hide() {
    // document.body.classList.remove('right-bar-enabled');
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }


  /**
   * User grid data fetches
   */
  private _fetchData() {
    this.userGridData = userGridData;
  }

  /**
   * Save user
   */
  saveUser() {
    if (this.userForm.valid) {
      const name = this.userForm.get('name').value;
      const email = this.userForm.get('email').value;
      const designation = this.userForm.get('designation').value;
      this.userGridData.push({
        id: this.userGridData.length + 1,
        name,
        email,
        designation,
        projects: this.selected
      })
      this.modalService.dismissAll()
    }
  }

  async deleteUsersData(id, event) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: false
      })
      .then(async result => {
        (await this.userservice.deleteUsers(id)).subscribe(res => {
          this.getUsersListAllData();
          if (result.value) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            // event.target.closest('tr')?.remove();
          } else
            /* Read more about handling dismissals below */ {
            this.modalService.dismissAll()
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            );
          }
        });
      })
  };

  goToDetails() {
    this.router.navigate(['users-list/users-detail/'])
  }

  goToEdit(id) {
    this.router.navigate(['users-list/users-form/' + id])
    this.data = id;
  }
  close() {
    this.modalService.dismissAll();
    this.router.navigate(['users-list/list'])
  }
  cancel() {
    document.body.classList.remove('right-bar-enabled');
  }

}
