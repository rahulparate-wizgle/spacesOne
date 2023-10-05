import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {
  customerData: any;
  filteredUsers: any[];
  usersData: any;
  filterBy;
  data: any;
  p :number = 1;

  constructor(
    public router: Router,
    private modalService: NgbModal,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.getCustomerListAllData();
  }

  async getCustomerListAllData() {
    (await this.customerService.getCustomerList()).subscribe(res => {
      this.customerData = res;
      this.filteredUsers = [...this.customerData];
    })
  }

  filter() {
    this.filteredUsers = [...this.customerData.filter(data => data.name.toLowerCase().includes(this.filterBy.toLowerCase()))];
  }

  async deleteCustomerData(id, event) {
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
        (await this.customerService.deleteCustomer(id)).subscribe(res => {
          this.getCustomerListAllData();
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

  goToDetails(id) {
    this.router.navigate(['customer/details/' + id])
  }

  goToEdit(id) {
    this.router.navigate(['customer/customer-form/' + id])
    this.data = id;
  }
}
