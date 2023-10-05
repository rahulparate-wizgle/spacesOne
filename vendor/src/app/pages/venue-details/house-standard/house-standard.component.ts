import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueDetailsService } from '../venue-details.service';
import Swal from 'sweetalert2';
import { houseStandardList } from './house-standard.model';

@Component({
  selector: 'app-house-standard',
  templateUrl: './house-standard.component.html',
  styleUrls: ['./house-standard.component.scss']
})
export class HouseStandardComponent implements OnInit {
  houseStandardForm: any;
  validationError: any = {};
  id: string;
  @Input() setId;
  @Input() venueId;
  employeeModelObj: houseStandardList = new houseStandardList();
  venue;
  constructor(
    public router:Router,
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  this.houseStandardForm = this.formBuilder.group({
    icon: ["", [Validators.required]],
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
  });
  this.getVenueDetails();
}
async getVenueDetails(){
  let venueId = this.activeRoute.snapshot.paramMap.get("id");
  (await this.service.getVenueDetails(venueId)).subscribe(res=>{
    this.venue = res;
  },err=>{})
}

async postHouseStandardData(event) {
  this.employeeModelObj.icon = this.houseStandardForm.value.icon;
  this.employeeModelObj.title = this.houseStandardForm.value.title;
  this.employeeModelObj.description = this.houseStandardForm.value.description;

  if (this.houseStandardForm.status != "INVALID") {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
      (await this.service.postEntities(this.employeeModelObj,venueId,'houseStandard')).subscribe(
        async (res: any) => {
          // this.router.navigate(['/venue-details/'+res.id],);
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger ms-2'
            },
            buttonsStyling: false
          });

          swalWithBootstrapButtons
            .fire({
              title: 'You Want to Save?',
              icon: 'warning',
              confirmButtonText: 'Yes, Save!',
              cancelButtonText: 'No, cancel!',
              showCancelButton: true
            })
            .then(result => {
              this.houseStandardForm.reset();
              if (result.value) {
                swalWithBootstrapButtons.fire(
                  'Save',
                  'Your file has been Saved.',
                  'success'
                );
                event.target.closest('tr')?.remove();
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
                );
              }
            });
        }
      );

      this.houseStandardForm.reset();
  }

  else {
    this.validationError = this.service.getFormValidationErrors(
      this.houseStandardForm
    );
  }
}

}
