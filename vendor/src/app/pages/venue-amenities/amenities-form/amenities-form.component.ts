import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { AmenitiesAPIService } from "../amenities-api.service";
import { amenitiesFormList } from "./amenities-form.model";
import { VenueTypesApiService } from "../../venue-types/venue-types-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-amenities-form",
  templateUrl: "./amenities-form.component.html",
  styleUrls: ["./amenities-form.component.scss"],
})
export class AmenitiesFormComponent implements OnInit {
  public Editor = ClassicEditor;
  validationError: any = {};
  id: string;
  employeeModelObj: amenitiesFormList = new amenitiesFormList();
  amenitiesData: any;
  amenitiesForm: UntypedFormGroup;
  submit: boolean;
  selectVenueType: any[];
  selected: string;
  hidden: boolean;
  formsubmit: boolean;
  selectedIcon = "bx bx-loader";
  selectValue = [];
  venueType: any[];
  pageSize: any;
  pageNo: any;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private service: AmenitiesAPIService,
    private activeRoute: ActivatedRoute,
    private venueTypeService: VenueTypesApiService
  ) { }

  ngOnInit(): void {
    this.getVenueType();
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.amenitiesForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["", [Validators.required]],
      icon: ["", [Validators.required]],
      // image: ["", [Validators.required]],
      // editor: ["", [Validators.required]],
    });
    if (this.id) {
      this.getAmenities(this.id);
    }
    this.submit = false;
    this.selected = "";
    this.hidden = true;
    this.formsubmit = false;

    this.amenitiesForm.patchValue({
      type: this.selectVenueType,
    });
  }

  get form() {
    return this.amenitiesForm.controls;
  }
  async getAmenities(id) {
    (await this.service.getAmenitiesbyId(id)).subscribe((res) => {
      this.amenitiesData = res;
      this.amenitiesForm.patchValue(this.amenitiesData);
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
    this.router.navigate(["/venue-amenities/list"]);
  }

  async postAmenitiesData(event) {
    this.employeeModelObj.name = this.amenitiesForm.value.name;
    this.employeeModelObj.type = this.amenitiesForm.value.type;
    this.employeeModelObj.description = this.amenitiesForm.value.description;
    this.employeeModelObj.icon = this.amenitiesForm.value.icon;
    // this.employeeModelObj.editor = this.blogForm.value.editor;
    if (this.amenitiesForm.status != "INVALID") {
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
                await this.service.updateAmenities(this.id, this.employeeModelObj)
              ).subscribe(async (res: any) => {
                this.amenitiesForm.reset();
                this.router.navigate(["venue-amenities/list"]);
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
              (await this.service.postAmenities(this.employeeModelObj)).subscribe(
                async (res: any) => {
                  this.amenitiesForm.reset();
                  this.router.navigate(["venue-amenities/list"]);
                });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
            }

          }
          );
      }
    } else {
      this.submit = true;
      this.formsubmit = true;
    }
  }

  onSelectedIcon = (data) => {
    this.selectedIcon = data.class;
    this.amenitiesForm.patchValue({ icon: data.class });
  };
}
