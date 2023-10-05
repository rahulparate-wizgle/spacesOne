import { Component, QueryList, ViewChildren, OnInit } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { jobListModel } from "./list.model";
import { JobListService } from "./list.service";
import { NgbdJobListSortableHeader } from "./list-sortable.directive";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { RulesAPIService } from "../rules-api.service";
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
  // p: number = 1;
  // Table data
  content?: any;
  lists?: any;
  jobList!: Observable<jobListModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdJobListSortableHeader)
  headers!: QueryList<NgbdJobListSortableHeader>;
  filteredUsers: any[];
  filterBy;
  rulesData: any;
  pageSize: any;
  pageNo: any;

  constructor(
    private modalService: NgbModal,
    public service: JobListService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    private ruleservice: RulesAPIService,
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

    this.getAllRulesList();

    this.jobList.subscribe((x) => {
      this.content = this.rulesData;
    });
  }

  async refresh() {
    this.getAllRulesList();
    const loading = await this.loadingController.create();
    await loading.present();
    await loading.dismiss();
  }

  async getAllRulesList() {
    (await this.ruleservice.getRulesList(this.pageSize, this.pageNo)).subscribe(
      (res) => {
        this.rulesData = res;
        this.filteredUsers = [...this.rulesData];
      }
    );
  }

  filter() {
    this.filteredUsers = [
      ...this.rulesData.filter((item) =>
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
  async deleteRulesData(id, event) {
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
          (await this.ruleservice.deleteRules(id)).subscribe((res) => {
            this.getAllRulesList();
          });
          } else if (
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
    this.router.navigate(["venue-rules/rules-form/" + id]);
  }
}
