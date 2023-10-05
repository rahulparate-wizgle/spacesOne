import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VenueDetailsService } from '../venue-details.service';

@Component({
  selector: 'app-room-tnc',
  templateUrl: './room-tnc.component.html',
  styleUrls: ['./room-tnc.component.scss']
})
export class RoomTncComponent implements OnInit {
  venue;
  constructor(
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute
  ) {}
  blockForm: any;
  currentItems = [];
  room_tnc: any[];
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
        this.room_tnc = res?.room_tnc?.room_tnc;
        if (!this.room_tnc) {
          this.room_tnc = [];
        }
      },
      (err) => {}
    );
  }
  async saveBlocks() {
    if (this.heading && this.currentItems.length > 0) {
      if (this.index == -1) {
        this.room_tnc.push({
          heading: this.heading,
          items: this.currentItems,
        });
      } else {
        this.room_tnc[this.index] = {
          heading: this.heading,
          items: this.currentItems,
        };
      }
      await this.updateEntity();
    }
  }

  async updateEntity() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    this.venue["room_tnc"] = this.room_tnc;
    (
      await this.service.postEntities(
        { room_tnc: this.room_tnc },
        venueId,
        "room_tnc"
      )
    ).subscribe(async (res: any) => {
      this.index = -1;
      this.room_tnc = [];
      this.currentItems = [];
      this.getVenueDetails();
    });
  }

  cancelSave() {
    this.index = -1;
  }

  editBlock(index) {
    this.index = index;
    this.heading = this.room_tnc[index].heading;
    this.currentItems = this.room_tnc[index].items;
  }
  deleteBlock(index) {
    let result = confirm("Do you want to delete the block ?");
    if (result) {
      this.room_tnc.splice(index, 1);
      this.updateEntity();
    }
  }
}
