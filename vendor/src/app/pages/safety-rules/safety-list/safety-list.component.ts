import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import Swal from "sweetalert2";
import { SafetyApiService } from "../safety-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});
@Component({
  selector: "app-safety-list",
  templateUrl: "./safety-list.component.html",
  styleUrls: ["./safety-list.component.scss"],
})
export class SafetyListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  filteredUsers: any[];
  filterBy;
  safetyData: any;
  pageSize: any;
  pageNo: any;

  constructor(
    private activeRoute: ActivatedRoute,
    public router: Router,
    private service: SafetyApiService,
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Enquiry" },
      { label: "Enquiry List", active: true },
    ];
    let id = this.activeRoute.snapshot.paramMap.get("id");
    this.getAllSafetyRulesList();
  }

  async refresh() {
    this.getAllSafetyRulesList();
    const loading = await this.loadingController.create();
    await loading.present();
    await loading.dismiss();
  }

  async getAllSafetyRulesList() {
    (
      await this.service.getSafetyRulesList(this.pageSize, this.pageNo)
    ).subscribe((res) => {
      this.safetyData = res;
      this.filteredUsers = [...this.safetyData];
    });
  }

  filter() {
    this.filteredUsers = [
      ...this.safetyData.filter((item) =>
        item.name.toLowerCase().includes(this.filterBy.toLowerCase())
      ),
    ];
  }

  // Delete Data
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
            (await this.service.deleteSafetyRules(id)).subscribe((res) => {
              this.getAllSafetyRulesList();
          });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {

          }

      });
  }
  onEdit(id) {
    this.router.navigate(["safety-rules/form/" + id]);

  }
}
