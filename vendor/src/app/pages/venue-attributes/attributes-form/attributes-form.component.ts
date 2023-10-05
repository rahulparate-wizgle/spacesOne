import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { attributesFormList } from "./attributes-form.model";
import { AttributesAPIService } from "../attributes-api.service";
import { VenueTypesApiService } from "../../venue-types/venue-types-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-attributes-form",
  templateUrl: "./attributes-form.component.html",
  styleUrls: ["./attributes-form.component.scss"],
})
export class AttributesFormComponent implements OnInit {
  public Editor = ClassicEditor;
  validationError: any = {};
  id: string;
  employeeModelObj: attributesFormList = new attributesFormList();
  attributesData: any;
  attributesForm: UntypedFormGroup;
  submit: boolean;
  selectVenueType: any[];
  selected: string;
  hidden: boolean;
  venueType: any[];
  formsubmit: boolean;
  selectedIcon = "bx bx-loader";
  pageSize: any;
  pageNo: any;


  // image: any;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private service: AttributesAPIService,
    private activeRoute: ActivatedRoute,
    private venueTypeService: VenueTypesApiService
  ) { }

  ngOnInit(): void {
    this.getVenueType();
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.attributesForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["", [Validators.required]],
      icon: ["", [Validators.required]],
      // image: ["", [Validators.required]],
      // editor: ["", [Validators.required]],
    });
    this.attributesForm.patchValue({
    });
    if (this.id) {
      this.getAttributes(this.id);
    }
    this.submit = false;
    this.selected = "";
    this.hidden = true;
    this.formsubmit = false;
  }

  get form() {
    return this.attributesForm.controls;
  }
  async getAttributes(id) {
    (await this.service.getAttributesbyId(id)).subscribe((res) => {
      this.attributesData = res;
      this.attributesForm.patchValue(this.attributesData);
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
    this.router.navigate(["/venue-attributes/list"]);
  }

  async postAttributesData(event) {
    this.employeeModelObj.name = this.attributesForm.value.name;
    this.employeeModelObj.type = this.attributesForm.value.type;
    this.employeeModelObj.description = this.attributesForm.value.description;
    this.employeeModelObj.icon = this.attributesForm.value.icon;
    // this.employeeModelObj.editor = this.blogForm.value.editor;
    if (this.attributesForm.status != "INVALID") {
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
                await this.service.updateAttributes(this.id, this.employeeModelObj)
              ).subscribe(async (res: any) => {
                this.attributesForm.reset();
                this.router.navigate(["venue-attributes/list"]);
              });
            } else if (
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
              (await this.service.postAttributes(this.employeeModelObj)).subscribe(
                async (res: any) => {
                  this.attributesForm.reset();
                  this.router.navigate(["venue-attributes/list"]);
                });
            }
            else if (
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
    this.attributesForm.patchValue({ icon: data.class });
  };
}
