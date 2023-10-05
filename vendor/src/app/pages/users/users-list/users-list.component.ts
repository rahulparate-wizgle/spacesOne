import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2';
import 'simplebar';
import { userGridData } from './data';
import { Users } from './users-list.model';
import { VendorsService } from '../../vendor/vendors.service';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
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
  pageSize: any;
  pageNo: any;
  selectStatus: string[];
  search: any = {};
  location: string[];
  status: string[];
  company: string[];
  showResetBtn: boolean = false;
  companyData: any;
  locationData: any;
  filterData: any;
  locations: any;
  companyDataList: any;
  user: any;

  constructor(public router: Router, private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private userservice: UsersService,
    private activeRoute: ActivatedRoute,
    private vendorService: VendorsService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.dropData = this.user?.designation;
   }

  ngOnInit(): void {
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

  async getAllUsersList() {
    this.showResetBtn = true;
    this.search = {};
    if (this.userslist.value.cName?.name?.length > 0) {
      this.search.company = this.userslist.value.cName.name;
    }
    if (this.userslist.value.location?.location?.length > 0) {
      this.search.location = this.userslist.value.location.location;
    }
    if (this.userslist.value.status?.length > 0) {
      this.search.status = this.userslist.value.status;
    }
    (await this.userservice.getUsersList(this.pageSize, this.pageNo, this.search)).subscribe(res => {
      this.usersData = res;
      this.filteredUsers = [...this.usersData];
    })
    this.modalService.dismissAll();
  }

  resetAll() {
    this.userslist.reset();
    this.getUsersListAllData();
  }

  async getUsersListAllData() {
    (await this.userservice.getUserList()).subscribe(res => {
      this.usersData = res;
      this.filteredUsers = [...this.usersData];
    })
    this.getFilterData();
  }

  async getFilterData() {
    (await this.vendorService.getVendors()).subscribe(res => {
      this.filterData = res;
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
