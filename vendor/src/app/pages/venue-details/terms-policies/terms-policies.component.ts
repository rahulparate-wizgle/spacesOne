import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { VenueDetailsService } from "../venue-details.service";
import { termPoliciesFormList } from "./term-policies.model";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-terms-policies",
  templateUrl: "./terms-policies.component.html",
  styleUrls: ["./terms-policies.component.scss"],
})
export class TermsPoliciesComponent implements OnInit {
  @Input() venueId;
  venue;
  termPoliciesobj: termPoliciesFormList = new termPoliciesFormList();
  houseRules = [
    { rulesValue: "No pets", rulesIcon: "fa-regular fa-paw" },
    { rulesValue: "No parties", rulesIcon: "fa-regular fa-champagne-glasses" },
    { rulesValue: "Smoking Allowed", rulesIcon: "fa-regular fa-smoking" },
  ];
  // healthData = [
  //   { healthValue: "COVID-19 guidelines",healthIcon:"fa-regular fa-kit-medical"},
  //   { healthValue: "Fire alarm",healthIcon:"fa-regular fa-fire-extinguisher"},
  //   { healthValue: "Carbon monoxide alarm" ,healthIcon:"fa-regular fa-fire-flame-curved"},
  //   { healthValue: "Security cameras" ,healthIcon:"fa-regular fa-video"},
  // ];
  staticPageForm: any;
  validationError: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.staticPageForm = this.formBuilder.group({
      checkInTime: ["", [Validators.required]],
      checkOutTime: ["", [Validators.required]],
      rulesValue: [""],
      // healthValue:[""],
      cancellationTerm: ["", [Validators.required]],
      attributesType: [""],
    });
    this.getVenueDetails();
  }
  async getVenueDetails() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    (await this.service.getVenueDetails(venueId)).subscribe(
      (res) => {
        this.venue = res;
        if(this.venue.terms_policies){
          this.staticPageForm.patchValue(this.venue.terms_policies);
        }

      },
      (err) => {}
    );
  }

  async poststaticData(event) {
    this.termPoliciesobj.checkInTime = this.staticPageForm.value.checkInTime;
    this.termPoliciesobj.checkOutTime = this.staticPageForm.value.checkOutTime;
    this.termPoliciesobj.rulesValue = this.staticPageForm.value.rulesValue;
    // this.termPoliciesobj.healthValue = this.staticPageForm.value.healthValue;
    this.termPoliciesobj.cancellationTerm =
      this.staticPageForm.value.cancellationTerm;
    this.termPoliciesobj.attributesType =
      this.staticPageForm.value.attributesType;

    if (this.staticPageForm.status != "INVALID") {
      let venueId = this.activeRoute.snapshot.paramMap.get("id");
      (
        await this.service.postEntities(
          this.termPoliciesobj,
          venueId,
          "terms_policies"
        )
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
            this.staticPageForm.reset();
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

      this.staticPageForm.reset();
    } else {
      this.validationError = this.service.getFormValidationErrors(
        this.staticPageForm
      );
    }
  }
}
