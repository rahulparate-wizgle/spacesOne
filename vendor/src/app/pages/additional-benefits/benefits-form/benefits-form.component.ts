import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { benefitsFormList } from "./benefits-form.model";
import { BenefitsApiService } from "../benefits-api.service";
import { VenueTypesApiService } from "../../venue-types/venue-types-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-benefits-form",
  templateUrl: "./benefits-form.component.html",
  styleUrls: ["./benefits-form.component.scss"],
})
export class BenefitsFormComponent implements OnInit {
  public Editor = ClassicEditor;
  validationError: any = {};
  id: string;
  employeeModelObj: benefitsFormList = new benefitsFormList();
  benefitsData: any;
  benefitsForm: UntypedFormGroup;
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
    private service: BenefitsApiService,
    private activeRoute: ActivatedRoute,
    private venueTypeService: VenueTypesApiService
  ) { }

  ngOnInit(): void {
    this.getVenueType();
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.benefitsForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["", [Validators.required]],
      icon: ["", [Validators.required]],
      // image: ["", [Validators.required]],
      // editor: ["", [Validators.required]],
    });

    this.benefitsForm.patchValue({
      type: this.selectVenueType,
    });

    if (this.id) {
      this.getBenefits(this.id);
    }
    this.submit = false;
    this.selected = "";
    this.hidden = true;
    this.formsubmit = false;
  }
  get form() {
    return this.benefitsForm.controls;
  }

  async getBenefits(id) {
    (await this.service.getAdditionalBenefitsbyId(id)).subscribe((res) => {
      this.benefitsData = res;
      this.benefitsForm.patchValue(this.benefitsData);
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
    this.router.navigate(["/additional-benefits/list"]);
  }

  async postbenefitsData(event) {
    this.employeeModelObj.name = this.benefitsForm.value.name;
    this.employeeModelObj.type = this.benefitsForm.value.type;
    this.employeeModelObj.description = this.benefitsForm.value.description;
    this.employeeModelObj.icon = this.benefitsForm.value.icon;
    if (this.benefitsForm.status != "INVALID") {
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
                await this.service.updateAdditionalBenefits(
                  this.id,
                  this.employeeModelObj
                )
              ).subscribe(async (res: any) => {
                this.benefitsForm.reset();
                this.router.navigate(["additional-benefits/list"]);
              });
            }
            else if (
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
              (
                await this.service.postAdditionalBenefits(this.employeeModelObj)
              ).subscribe(async (res: any) => {
                this.benefitsForm.reset();
                this.router.navigate(["additional-benefits/list"]);
              });
            }
            else if (
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
    this.benefitsForm.patchValue({ icon: data.class });
  };
}
