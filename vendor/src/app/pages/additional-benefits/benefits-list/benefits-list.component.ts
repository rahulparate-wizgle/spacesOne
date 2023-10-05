import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { BenefitsApiService } from '../benefits-api.service';
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});
@Component({
  selector: 'app-benefits-list',
  templateUrl: './benefits-list.component.html',
  styleUrls: ['./benefits-list.component.scss']
})
export class BenefitsListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  filteredUsers: any[];
  filterBy;
  benefitsData: any;
  pageSize: any;
  pageNo: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private service: BenefitsApiService,
    public router: Router,
 ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Enquiry' }, { label: 'Enquiry List', active: true }];
    let id = this.activeRoute.snapshot.paramMap.get('id');

    this.getAllBenefitsList()
  }

  filter() {
    this.filteredUsers = [...this.benefitsData.filter(item => item.name.toLowerCase().includes(this.filterBy.toLowerCase()))];
  }

  async refresh() {
    this.getAllBenefitsList();
    const loading = await this.loadingController.create();
    await loading.present();
    await loading.dismiss();
  }

  async getAllBenefitsList() {
    (await this.service.getAdditionalBenefitsList(this.pageSize,this.pageNo)).subscribe(res => {
      this.benefitsData = res;
      this.filteredUsers = [...this.benefitsData];
    })
  }


  // Delete Data
  async deleteAmenitiesData(id, event) {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure, You won't be able to revert this?",
        icon: 'warning',
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(async result => {

          if (result.value) {
            ( await this.service.deleteAdditionalBenefits(id)).subscribe(res => {
            this.getAllBenefitsList()
          });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {

          }

      })
  };

onEdit(id) {
    this.router.navigate(['additional-benefits/form/' + id])
  }

}
