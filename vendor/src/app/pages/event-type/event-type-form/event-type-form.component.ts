import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  FormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { eventTypeFormList } from "../event-type.model";
import { EventTypeService } from "../event-type.service";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-event-type-form",
  templateUrl: "./event-type-form.component.html",
  styleUrls: ["./event-type-form.component.scss"],
})
export class EventTypeFormComponent implements OnInit {
  public Editor = ClassicEditor;
  id: string;
  eventTypeData: any;
  eventTypeForm: UntypedFormGroup;
  selectedIcon = "bx bx-loader";
  eventObj: eventTypeFormList = new eventTypeFormList();

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private service: EventTypeService
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.eventTypeForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      icon: ["", [Validators.required]],
      featured: ["",[Validators.required]],
    });
    if (this.id) {
      this.getEventTypes(this.id);
    }
  }

  get form() {
    return this.eventTypeForm.controls;
  }

  status(event) {
    if (event.target.checked) {
      this.eventTypeForm.get("featured").setValue(true);
    } else {
      this.eventTypeForm.get("featured").setValue(false);
    }
  }

  async getEventTypes(id) {
    (await this.service.getEventTypesbyId(id)).subscribe((res) => {
      this.eventTypeData = res;
      this.eventTypeForm.patchValue(this.eventTypeData);
    });
  }

  postCancel() {
    this.router.navigate(["/event-type/list"]);
  }

  postEventTypeData(event) {
    this.eventObj.title = this.eventTypeForm.value.title;
    this.eventObj.description = this.eventTypeForm.value.description;
    this.eventObj.icon = this.eventTypeForm.value.icon;
    this.eventObj.featured = this.eventTypeForm.value.featured
      ? this.eventTypeForm.value.featured
      : false;
    if (this.eventTypeForm.status != "INVALID") {
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
                await this.service.updateEventTypes(this.id, this.eventObj)
              ).subscribe(async (res: any) => {
                this.eventTypeForm.reset();
                this.router.navigate(["/event-type/list"]);
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
              (await this.service.postEventTypes(this.eventObj)).subscribe(
                async (res: any) => {
                  this.eventTypeForm.reset();
                  this.router.navigate(["/event-type/list"]);
                }
              );
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
            }
          });
      }
    }
  }

  onSelectedIcon = (data) => {
    this.selectedIcon = data.class;
    this.eventTypeForm.patchValue({ icon: data.class });
  };
}
