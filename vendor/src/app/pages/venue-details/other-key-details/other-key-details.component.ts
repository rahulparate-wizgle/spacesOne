import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VenueDetailsService } from '../venue-details.service';

@Component({
  selector: 'app-other-key-details',
  templateUrl: './other-key-details.component.html',
  styleUrls: ['./other-key-details.component.scss']
})
export class OtherKeyDetailsComponent implements OnInit {
  venue;
  constructor(
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute
  ) {}
  blockForm: any;
  currentItems = [];
  other_key_details: any[];
  index = -1;
  icon = "bx bx-check";
  heading = "";
  ngOnInit(): void {
    this.blockForm = this.formBuilder.group({
      icon: ["", [Validators.required]],
      title: ["", [Validators.required]],
      desc: ["", [Validators.required]],
    });
    this.getVenueDetails();
  }

  addBlockEntry() {
    if (this.blockForm.value.title) {
      if (!this.blockForm.value.icon) {
        this.blockForm.patchValue({ icon: "bx bx-check" });
      }
      this.currentItems.push({
        icon: this.blockForm.value.icon,
        title: this.blockForm.value.title,
        desc: this.blockForm.value.desc,
      });
      this.blockForm.reset();
    }
  }
  deleteFromCurrent(i) {
    this.currentItems.splice(i, 1);
  }
  async getVenueDetails() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    (await this.service.getVenueDetails(venueId)).subscribe(
      (res) => {
        this.venue = res;
        this.other_key_details = res?.other_key_details?.other_key_details;
        if (!this.other_key_details) {
          this.other_key_details = [];
        }
      },
      (err) => {}
    );
  }
  async saveBlocks() {
    if (this.heading && this.currentItems.length > 0) {
      if (this.index == -1) {
        this.other_key_details.push({
          heading: this.heading,
          items: this.currentItems,
        });
      } else {
        this.other_key_details[this.index] = {
          heading: this.heading,
          items: this.currentItems,
        };
      }
      await this.updateEntity();
    }
  }

  async updateEntity() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    this.venue["other_key_details"] = this.other_key_details;
    (
      await this.service.postEntities(
        { other_key_details: this.other_key_details },
        venueId,
        "other_key_details"
      )
    ).subscribe(async (res: any) => {
      this.index = -1;
      this.other_key_details = [];
      this.currentItems = [];
      this.getVenueDetails();
    });
  }

  cancelSave() {
    this.index = -1;
  }

  editBlock(index) {
    this.index = index;
    this.heading = this.other_key_details[index].heading;
    this.currentItems = this.other_key_details[index].items;
  }
  deleteBlock(index) {
    let result = confirm("Do you want to delete the block ?");
    if (result) {
      this.other_key_details.splice(index, 1);
      this.updateEntity();
    }
  }
}
