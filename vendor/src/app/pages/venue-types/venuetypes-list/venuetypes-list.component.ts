import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { VenueTypesApiService } from '../venue-types-api.service';
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});
@Component({
  selector: 'app-venuetypes-list',
  templateUrl: './venuetypes-list.component.html',
  styleUrls: ['./venuetypes-list.component.scss']
})
export class VenueTypesListcomponent implements OnInit {
  breadCrumbItems: Array<{}>;
  filteredVenueType: any[];
  filterBy;
  venueTypeData: any;
  pageSize: any;
  pageNo: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private service: VenueTypesApiService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Enquiry" },
      { label: "Enquiry List", active: true },
    ];
    let id = this.activeRoute.snapshot.paramMap.get("id");
    this.getAllVenueTypesList()
  }

  async refresh() {
    this.getAllVenueTypesList();
    const loading = await this.loadingController.create();
    await loading.present();
    await loading.dismiss();
  }

  async getAllVenueTypesList() {
    (await this.service.getVenueTypesList(this.pageSize, this.pageNo)).subscribe(res => {
      this.venueTypeData = res;
      this.filteredVenueType= [...this.venueTypeData];
    })
  }

  filter() {
    this.filteredVenueType= [
      ...this.venueTypeData.filter((item) =>
        item.title.toLowerCase().includes(this.filterBy.toLowerCase())
      ),
    ];
  }


  // Delete Data
  async deleteVenueTypesData(id, event) {
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
          (await this.service.deleteVenueTypes(id)).subscribe(res => {
            this.getAllVenueTypesList()
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {

        }

      })
  };

  onEdit(id) {
    this.router.navigate(['venue-types/venuetype-form/' + id])
  }

}
