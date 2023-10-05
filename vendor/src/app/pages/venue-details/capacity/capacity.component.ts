import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { VenueDetailsService } from "../venue-details.service";
import { attributeFormList } from "../attributes/attribute.model";
import Swal from "sweetalert2";
import { ActivatedRoute, Route, Router } from "@angular/router";
import {
  cateringData,
  facilitiesData,
  musicData,
  accessibility,
  selectAmenities,
} from "../attributes/attribute-constants";
@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit {

  attributeObj: attributeFormList = new attributeFormList();

  Name: any;
  attributeForm: any;
  validationError: any = {};
  id: any;
  returnUrl: string;
  selectAmenities: string[] = selectAmenities;
  cateringData = cateringData;
  facilitiesData = facilitiesData;
  musicData = musicData;
  accessibility = accessibility;
  venue;
  @Input() venueId;
  constructor(
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    console.log("venueId", venueId);
    // if (this.id) {
    //   this.postAttributeData(this.id);
    // }

    this.attributeForm = this.formBuilder.group({
      standing: ["", [Validators.required]],
      dinning: ["", [Validators.required]],
      theater: ["", [Validators.required]],
      cabaret: ["", [Validators.required]],
      cateringValue: [""],
      //  facilityValue:[""],
      musicValue: [""],
      accessibilityValue: [""],
      casual: ["", [Validators.required]],
      cluster: ["", [Validators.required]],
      schoolroom: ["", [Validators.required]],
      conference: ["", [Validators.required]],
      ushaped: ["", [Validators.required]],
      boardroom: ["", [Validators.required]],
    });
    this.getVenueDetails();
  }
  async getVenueDetails() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    (await this.service.getVenueDetails(venueId)).subscribe(
      (res) => {
        this.venue = res;
        this.attributeForm.patchValue(this.venue.capacity);
      },
      (err) => {}
    );
  }
  async postAttributeData(event) {
    this.attributeObj.standing = this.attributeForm.value.standing;
    this.attributeObj.dinning = this.attributeForm.value.dinning;
    this.attributeObj.theater = this.attributeForm.value.theater;
    this.attributeObj.cabaret = this.attributeForm.value.cabaret;
    this.attributeObj.cateringValue = this.attributeForm.value.cateringValue;
    // this.attributeObj.facilityValue = this.attributeForm.value.facilityValue;
    this.attributeObj.musicValue = this.attributeForm.value.musicValue;
    this.attributeObj.casual = this.attributeForm.value.casual;
    this.attributeObj.cluster = this.attributeForm.value.cluster;
    this.attributeObj.schoolroom = this.attributeForm.value.schoolroom;
    this.attributeObj.conference = this.attributeForm.value.conference;
    this.attributeObj.ushaped = this.attributeForm.value.ushaped;
    this.attributeObj.boardroom = this.attributeForm.value.boardroom;
    this.attributeObj.accessibilityValue =
      this.attributeForm.value.accessibilityValue;

    if (this.attributeForm.status != "INVALID") {
      let venueId = this.activeRoute.snapshot.paramMap.get("id");
      (
        await this.service.postEntities(this.attributeObj, venueId, "capacity")
      ).subscribe(async (res: any) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger ms-2",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "You Want to Save?",
            icon: "warning",
            confirmButtonText: "Yes, Save!",
            cancelButtonText: "No, cancel!",
            showCancelButton: true,
          })
          .then((result) => {
            this.attributeForm.reset();
            // this.router.navigate(['venue-rules/list'])
            if (result.value) {
              swalWithBootstrapButtons.fire(
                "Save",
                "Your file has been Saved.",
                "success"
              );
              event.target.closest("tr")?.remove();
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                "Cancelled",
                "Your imaginary file is safe :)",
                "error"
              );
            }
          });
      });
      this.attributeForm.reset();
    } else {
      this.validationError = this.service.getFormValidationErrors(
        this.attributeForm
      );
    }
  }

}
