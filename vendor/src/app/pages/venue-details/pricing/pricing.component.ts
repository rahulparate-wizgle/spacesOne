import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { VenueDetailsService } from "../venue-details.service";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.scss"],
})
export class PricingComponent implements OnInit {
  pricingForm: any;
  validationError: any = {};
  venue;
  @Input() venueId;
  files: any;
  image: any;
  gallery: string[] = [];

  isUploadStarted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pricingForm = this.formBuilder.group({
      perUnit: [""],
      minimumCharges: [""],
      perUnitDesc: [""],
      minimumChargesDesc: [""],
      isMinChargesRequired:['']
    });
    this.getVenueDetails();
  }
  async getVenueDetails() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    (await this.service.getVenueDetails(venueId)).subscribe(
      (res) => {
        this.venue = res;
        if (this.venue.pricing) {
          if (this.venue.pricing.gallery?.length) {
            this.gallery = this.venue.pricing.gallery;
          }
          this.pricingForm.patchValue(this.venue.pricing);
        }
      },
      (err) => {}
    );
  }
  changesMinCharges(event){
    this.pricingForm.patchValue({
      isMinChargesRequired:event
    });
console.log(event)
  }

  async postprice(event) {
    if (this.pricingForm.status != "INVALID") {
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
        .then(async (result) => {
          if (result.value) {
            let pricing: any = {};
            pricing.perUnitDesc = this.pricingForm.value.perUnitDesc;
            pricing.minimumChargesDesc =
              this.pricingForm.value.minimumChargesDesc;
            pricing.perUnit = this.pricingForm.value.perUnit;
            pricing.minimumCharges = this.pricingForm.value.minimumCharges;
            pricing.isMinChargesRequired = this.pricingForm.value.isMinChargesRequired;

            let venueId = this.activeRoute.snapshot.paramMap.get("id");
            (
              await this.service.postEntities(pricing, venueId, "pricing")
            ).subscribe(async (res: any) => {
              swalWithBootstrapButtons.fire(
                "Save",
                "Your file has been Saved.",
                "success"
              );
              event.target.closest("tr")?.remove();
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    } else {
      this.validationError = this.service.getFormValidationErrors(
        this.pricingForm
      );
    }
  }

  openPdf(url){
    debugger;
    console.log(url);
    window.open(url, "_blank");
  }

  async uploadPricingGallery() {
    this.isUploadStarted = true;
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    for (let i = 0; i < this.files.length; i++) {
      await this.service.addPricingGalleryImages(
        this.files[i],
        venueId,
        () => {}
      );
    }
   // window.location.reload();
  // this.getVenueDetails();
  }

  fileChangeEvent(event: any): void {
    this.files = event.target.files;
  }
  setMainImage(img) {
    this.image = img;
  }
  async deleteImage(index) {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    (await this.service.removePricingGalleryImages(venueId, index)).subscribe(
      (res) => {
        console.log(res);
        this.getVenueDetails();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
