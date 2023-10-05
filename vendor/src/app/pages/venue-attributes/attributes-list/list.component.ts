import { Component, QueryList, ViewChildren, OnInit } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { jobListModel } from "./list.model";
import { JobListService } from "./list.service";
import {
  NgbdJobListSortableHeader,
  SortEvent,
} from "./list-sortable.directive";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { AttributesAPIService } from "../attributes-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  providers: [JobListService, DecimalPipe],
})

/**
 * List Component
 */
export class ListComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  jobListForm!: UntypedFormGroup;
  submitted = false;

  // Table data
  content?: any;
  lists?: any;
  jobList!: Observable<jobListModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdJobListSortableHeader)
  headers!: QueryList<NgbdJobListSortableHeader>;
  filteredUsers: any[];
  filterBy;
  attributesData: any;
  pageSize: any;
  pageNo: any;

  constructor(
    private modalService: NgbModal,
    public service: JobListService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    private attributeservice: AttributesAPIService,
    private loadingController: LoadingController
  ) {
    this.jobList = service.jobList$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Enquiry" },
      { label: "Enquiry List", active: true },
    ];
    let id = this.activeRoute.snapshot.paramMap.get("id");

    this.getAllAttributesList();

    this.jobList.subscribe((x) => {
      this.content = this.attributesData;
    });
  }

  async refresh() {
    this.getAllAttributesList();
    const loading = await this.loadingController.create();
    await loading.present();
    await loading.dismiss();
  }

  async getAllAttributesList() {
    (
      await this.attributeservice.getAttributesList(this.pageSize, this.pageNo)
    ).subscribe((res) => {
      this.attributesData = res;
      this.filteredUsers = [...this.attributesData];
    });
  }

  filter() {
    this.filteredUsers = [
      ...this.attributesData.filter((item) =>
        item.name.toLowerCase().includes(this.filterBy.toLowerCase())
      ),
    ];
  }

  /**
   * Open modal
   * @param content modal content
   */
  openViewModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.lists.forEach((x: { state: any }) => (x.state = ev.target.checked));
  }

  // Delete Data
  async deleteAttributesData(id, event) {
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
            (await this.attributeservice.deleteAttributes(id)).subscribe((res) => {
              this.getAllAttributesList();
          });
          this.router.navigate(["venue-attributes/list"]);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {

          }

      });
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
  }

  /**
   * Form data get
   */
  get form() {
    return this.jobListForm.controls;
  }

  onEdit(id) {
    this.router.navigate(["venue-attributes/attributes-form/" + id]);
  }
}
