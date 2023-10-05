import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VenueDetailsService } from '../venue-details.service';

@Component({
  selector: 'app-should-know',
  templateUrl: './should-know.component.html',
  styleUrls: ['./should-know.component.scss']
})
export class ShouldKnowComponent implements OnInit {
  venue;
  constructor(
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private activeRoute: ActivatedRoute
  ) {}
  blockForm: any;
  currentItems = [];
  should_know: any[];
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
        this.should_know = res?.should_know?.should_know;
        if (!this.should_know) {
          this.should_know = [];
        }
      },
      (err) => {}
    );
  }
  async saveBlocks() {
    if (this.heading && this.currentItems.length > 0) {
      if (this.index == -1) {
        this.should_know.push({
          heading: this.heading,
          items: this.currentItems,
        });
      } else {
        this.should_know[this.index] = {
          heading: this.heading,
          items: this.currentItems,
        };
      }
      await this.updateEntity();
    }
  }

  async updateEntity() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    this.venue["should_know"] = this.should_know;
    (
      await this.service.postEntities(
        { should_know: this.should_know },
        venueId,
        "should_know"
      )
    ).subscribe(async (res: any) => {
      this.index = -1;
      this.should_know = [];
      this.currentItems = [];
      this.getVenueDetails();
    });
  }

  cancelSave() {
    this.index = -1;
  }

  editBlock(index) {
    this.index = index;
    this.heading = this.should_know[index].heading;
    this.currentItems = this.should_know[index].items;
  }
  deleteBlock(index) {
    let result = confirm("Do you want to delete the block ?");
    if (result) {
      this.should_know.splice(index, 1);
      this.updateEntity();
    }
  }
}
