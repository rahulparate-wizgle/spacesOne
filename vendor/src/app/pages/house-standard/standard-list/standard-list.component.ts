import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import Swal from "sweetalert2";
import { StandardApiService } from "../standard-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});
@Component({
  selector: "app-standard-list",
  templateUrl: "./standard-list.component.html",
  styleUrls: ["./standard-list.component.scss"],
})
export class StandardListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  filteredUsers: any[];
  filterBy;
  standardData: any;
  pageSize: any;
  pageNo: any;
  constructor(
    private activeRoute: ActivatedRoute,
    public router: Router,
    private service: StandardApiService,
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Enquiry" },
      { label: "Enquiry List", active: true },
    ];
    let id = this.activeRoute.snapshot.paramMap.get("id");

    this.getAllStandardList();
  }
  async refresh() {
    this.getAllStandardList();
    const loading = await this.loadingController.create();
    await loading.present();
    await loading.dismiss();
  }

  async getAllStandardList() {
    (
      await this.service.getHouseStandardList(this.pageSize, this.pageNo)
    ).subscribe((res) => {
      this.standardData = res;
      this.filteredUsers = [...this.standardData];
    });
  }

  filter() {
    this.filteredUsers = [
      ...this.standardData.filter((item) =>
        item.name.toLowerCase().includes(this.filterBy.toLowerCase())
      ),
    ];
  }

  async deleteAmenitiesData(id, event) {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure, You won't be able to revert this?",
        icon: "warning",
        confirmButtonText: "Yes, delete!",
        cancelButtonText: "No, cancel!",
        showCancelButton: true,
      })
      .then(async (result) => {

          if (result.value) {
            (await this.service.deleteHouseStandard(id)).subscribe((res) => {
              this.getAllStandardList();
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {

          }

      });
  }

  onEdit(id) {
    this.router.navigate(["house-standard/form/" + id]);
  }
}
