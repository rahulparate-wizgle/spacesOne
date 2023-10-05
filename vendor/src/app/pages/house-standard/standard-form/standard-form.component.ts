import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { standardFormList } from "./standard-form.model";
import { StandardApiService } from "../standard-api.service";
import { VenueTypesApiService } from "../../venue-types/venue-types-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-standard-form",
  templateUrl: "./standard-form.component.html",
  styleUrls: ["./standard-form.component.scss"],
})
export class StandardFormComponent implements OnInit {
  public Editor = ClassicEditor;
  validationError: any = {};
  id: string;
  employeeModelObj: standardFormList = new standardFormList();
  standardData: any;
  standardForm: UntypedFormGroup;
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
    private service: StandardApiService,
    private activeRoute: ActivatedRoute,
    private venueTypeService: VenueTypesApiService
  ) { }

  ngOnInit(): void {
    this.getVenueType();
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.standardForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["", [Validators.required]],
      icon: ["", [Validators.required]],
      // image: ["", [Validators.required]],
      // editor: ["", [Validators.required]],
    });

    this.standardForm.patchValue({
      type: this.selectVenueType,
    });

    if (this.id) {
      this.getHouseStandard(this.id);
    }
    this.submit = false;
    this.selected = "";
    this.hidden = true;
    this.formsubmit = false;
  }

  get form() {
    return this.standardForm.controls;
  }

  async getHouseStandard(id) {
    (await this.service.getHouseStandardbyId(id)).subscribe((res) => {
      this.standardData = res;
      this.standardForm.patchValue(this.standardData);
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
    this.router.navigate(["/house-standard/list"]);
  }

  async postStandardData(event) {
    this.employeeModelObj.name = this.standardForm.value.name;
    this.employeeModelObj.type = this.standardForm.value.type;
    this.employeeModelObj.description = this.standardForm.value.description;
    this.employeeModelObj.icon = this.standardForm.value.icon;
    // this.employeeModelObj.editor = this.blogForm.value.editor;
    if (this.standardForm.status != "INVALID") {
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
                await this.service.updateHouseStandard(this.id, this.employeeModelObj)
              ).subscribe(async (res: any) => {
                this.standardForm.reset();
                this.router.navigate(["/house-standard/list"]);

              });

            }

            else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
            }
          });
      }
      else {
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
              (await this.service.postHouseStandard(this.employeeModelObj)).subscribe(
                async (res: any) => {
                  this.standardForm.reset();
                  this.router.navigate(["/house-standard/list"]);
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
    this.standardForm.patchValue({ icon: data.class });
  };
}
