import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { venueTypesFormList } from "./venuetypes-form.model";
import { VenueTypesApiService } from "../venue-types-api.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-venuetypes-form",
  templateUrl: "./venuetypes-form.component.html",
  styleUrls: ["./venuetypes-form.component.scss"],
})
export class VenueTypesFormComponent implements OnInit {
  public Editor = ClassicEditor;
  validationError: any = {};
  id: string;
  venueTypeModelObj: venueTypesFormList = new venueTypesFormList();
  venueTypeData: any;
  venueTypeForm: UntypedFormGroup;
  submit: boolean;
  selectVenueType: any[];
  selected: string;
  hidden: boolean;
  formsubmit: boolean;
  selectedIcon = "bx bx-loader";

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private service: VenueTypesApiService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.venueTypeForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      icon: ["", [Validators.required]],

    });

    this.venueTypeForm.patchValue({
      type: this.selectVenueType,
    });

    if (this.id) {
      this.getVenueTypes(this.id);
    }
    this.submit = false;
    this.selected = "";
    this.hidden = true;
    this.formsubmit = false;
  }
  get form() {
    return this.venueTypeForm.controls;
  }

  async getVenueTypes(id) {
    (await this.service.getVenueTypesbyId(id)).subscribe((res) => {
      this.venueTypeData = res;
      this.venueTypeForm.patchValue(this.venueTypeData);
    });
  }

  postCancel() {
    this.router.navigate(["/venue-types/venuetype-list"]);
  }

  async postVenueTypesData(event) {
    this.venueTypeModelObj.title = this.venueTypeForm.value.title;
    this.venueTypeModelObj.description = this.venueTypeForm.value.description;
    this.venueTypeModelObj.icon = this.venueTypeForm.value.icon;
    if (this.venueTypeForm.status != "INVALID") {
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
                await this.service.updateVenueTypes(
                  this.id,
                  this.venueTypeModelObj
                )
              ).subscribe(async (res: any) => {
                this.venueTypeForm.reset();
                this.router.navigate(["/venue-types/venuetype-list"]);
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
                await this.service.postVenueTypes(this.venueTypeModelObj)
              ).subscribe(async (res: any) => {
                this.venueTypeForm.reset();
                this.router.navigate(["/venue-types/venuetype-list"]);
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
    this.venueTypeForm.patchValue({ icon: data.class });
  };
}
