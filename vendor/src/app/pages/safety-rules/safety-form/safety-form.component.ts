import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { safetyFormList } from "./safety-form.model";
import { SafetyApiService } from "../safety-api.service";
import { VenueTypesApiService } from "../../venue-types/venue-types-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-safety-form",
  templateUrl: "./safety-form.component.html",
  styleUrls: ["./safety-form.component.scss"],
})
export class SafetyFormComponent implements OnInit {
  public Editor = ClassicEditor;
  validationError: any = {};
  id: string;
  employeeModelObj: safetyFormList = new safetyFormList();
  safetyData: any;
  safetyForm: UntypedFormGroup;
  submit: boolean;
  selectVenueType: any[];
  selected: string;
  hidden: boolean;
  formsubmit: boolean;
  selectedIcon = "bx bx-loader";
  venueType: any[];
  pageSize: any;
  pageNo: any;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private service: SafetyApiService,
    private activeRoute: ActivatedRoute,
    private venueTypeService: VenueTypesApiService
  ) { }

  ngOnInit(): void {
    this.getVenueType();
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.safetyForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["", [Validators.required]],
      icon: ["", [Validators.required]],
    });

    this.safetyForm.patchValue({
      type: this.selectVenueType,
    });

    if (this.id) {
      this.getSafetyRules(this.id);
    }
    this.submit = false;
    this.selected = "";
    this.hidden = true;
    this.formsubmit = false;
  }
  get form() {
    return this.safetyForm.controls;
  }

  async getSafetyRules(id) {
    (await this.service.getSafetyRulesbyId(id)).subscribe((res) => {
      this.safetyData = res;
      this.safetyForm.patchValue(this.safetyData);
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
    this.router.navigate(["/safety-rules/list"]);
  }

  async postSafetyRulesData(event) {
    this.employeeModelObj.name = this.safetyForm.value.name;
    this.employeeModelObj.type = this.safetyForm.value.type;
    this.employeeModelObj.description = this.safetyForm.value.description;
    this.employeeModelObj.icon = this.safetyForm.value.icon;
    if (this.safetyForm.status != "INVALID") {
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
                await this.service.updateSafetyRules(this.id, this.employeeModelObj)
              ).subscribe(async (res: any) => {
                this.safetyForm.reset();
                this.router.navigate(["safety-rules/list"]);
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
            }

          });

      } else {
        swalWithBootstrapButtons
          .fire({
            title: "Are you sure you want to add?",
            icon: "warning",
            confirmButtonText: "Yes, Add!",
            cancelButtonText: "No, cancel!",
            showCancelButton: true,
          })
          .then(async (result) => {
            if (result.value) {
              (await this.service.postSafetyRules(this.employeeModelObj)).subscribe(
                async (res: any) => {
                  this.safetyForm.reset();
                  this.router.navigate(["safety-rules/list"]);
                });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {

            }
          });
      }
    } else {
      this.submit = true;
      this.formsubmit = true;
    }
  }

  onSelectedIcon = (data) => {
    this.selectedIcon = data.class;
    this.safetyForm.patchValue({ icon: data.class });
  };
}
