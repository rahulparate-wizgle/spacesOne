import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { RulesAPIService } from "../rules-api.service";
import { rulesFormList } from "./rules-form.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VenueTypesApiService } from "../../venue-types/venue-types-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-rules-form",
  templateUrl: "./rules-form.component.html",
  styleUrls: ["./rules-form.component.scss"],
})
export class RulesFormComponent implements OnInit {
  rulesForm: UntypedFormGroup;
  public Editor = ClassicEditor;
  validationError: any = {};
  id: string;
  employeeModelObj: rulesFormList = new rulesFormList();
  submit: boolean;
  rulesData: any;
  selected: string;
  hidden: boolean;
  formsubmit: boolean;
  selectedIcon = "bx bx-loader";
  venueType: any[];
  pageSize: any;
  pageNo: any;

  // image: any;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private service: RulesAPIService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private venueTypeService: VenueTypesApiService
  ) { }

  ngOnInit(): void {
    this.submit = false;
    this.getVenueType();
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.rulesForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["", [Validators.required]],
      icon: ["", [Validators.required]],
      // image: ["", [Validators.required]],
      // editor: ["", [Validators.required]],
    });

    this.rulesForm.patchValue({

    });
    if (this.id) {
      this.getRules(this.id);
    }
    this.selected = "";
    this.hidden = true;
    this.formsubmit = false;
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  get form() {
    return this.rulesForm.controls;
  }
  async getRules(id) {
    (await this.service.getRulesbyId(id)).subscribe((res) => {
      this.rulesData = res;
      this.rulesForm.patchValue(this.rulesData);
    });
  }

  async getVenueType() {
    (await this.venueTypeService.getVenueTypesList(this.pageSize, this.pageNo)).subscribe(
      (res) => {
        this.venueType = res;
      }
    );
  }

  postCancel() {
    this.router.navigate(["/venue-rules/list"]);
  }

  async postRulesData(event) {
    this.employeeModelObj.name = this.rulesForm.value.name;
    this.employeeModelObj.type = this.rulesForm.value.type;
    this.employeeModelObj.description = this.rulesForm.value.description;
    this.employeeModelObj.icon = this.rulesForm.value.icon;
    if (this.rulesForm.status != "INVALID") {
      if (this.id) {

        swalWithBootstrapButtons
          .fire({
            title: "Are you sure you want to update the details?",
            icon: "success",
            confirmButtonText: "Yes, Update!",
            cancelButtonText: "No, Cancel!",
            showCancelButton: true,
          })
          .then(async (result) => {
            if (result.value) {
              (
                await this.service.updateRules(this.id, this.employeeModelObj)
              ).subscribe(async (res: any) => {
                this.rulesForm.reset();
                this.router.navigate(["venue-rules/list"]);
              });
            }
            else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
            }
          }
          )
      }
      else {

        swalWithBootstrapButtons
          .fire({
            title: "Are you sure you want to add?",
            icon: "warning",
            confirmButtonText: "Yes, Add!",
            cancelButtonText: "No, Cancel!",
            showCancelButton: true,
          })
          .then(async (result) => {
            if (result.value) {
              (await this.service.postRules(this.employeeModelObj)).subscribe(
                async (res: any) => {
                  this.rulesForm.reset();
                  this.router.navigate(["venue-rules/list"]);
                });
            }
            else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {

            }

          }
          );
      }
    }
    else {
      this.submit = true;
      this.formsubmit = true;
    }
  }
  onSelectedIcon = (data) => {
    this.selectedIcon = data.class;
    this.rulesForm.patchValue({ icon: data.class });
  };
}
