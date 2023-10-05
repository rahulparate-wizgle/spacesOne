import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VenueDetailsService } from '../venue-details.service';

@Component({
  selector: 'app-add-on-services',
  templateUrl: './add-on-services.component.html',
  styleUrls: ['./add-on-services.component.scss']
})
export class AddOnServicesComponent implements OnInit {
  venue;
  constructor(
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute
  ) {}
  blockForm: any;
  currentItems = [];
  add_on_services: any[];
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
        this.add_on_services = res?.add_on_services?.add_on_services;
        if (!this.add_on_services) {
          this.add_on_services = [];
        }
      },
      (err) => {}
    );
  }
  async saveBlocks() {
    if (this.heading && this.currentItems.length > 0) {
      if (this.index == -1) {
        this.add_on_services.push({
          heading: this.heading,
          items: this.currentItems,
        });
      } else {
        this.add_on_services[this.index] = {
          heading: this.heading,
          items: this.currentItems,
        };
      }
      await this.updateEntity();
    }
  }

  async updateEntity() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    this.venue["add_on_services"] = this.add_on_services;
    (
      await this.service.postEntities(
        { add_on_services: this.add_on_services },
        venueId,
        "add_on_services"
      )
    ).subscribe(async (res: any) => {
      this.index = -1;
      this.add_on_services = [];
      this.currentItems = [];
      this.getVenueDetails();
    });
  }

  cancelSave() {
    this.index = -1;
  }

  editBlock(index) {
    this.index = index;
    this.heading = this.add_on_services[index].heading;
    this.currentItems = this.add_on_services[index].items;
  }
  deleteBlock(index) {
    let result = confirm("Do you want to delete the block ?");
    if (result) {
      this.add_on_services.splice(index, 1);
      this.updateEntity();
    }
  }
}
