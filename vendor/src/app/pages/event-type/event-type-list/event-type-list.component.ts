import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventTypeService } from "../event-type.service";
import Swal from "sweetalert2";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-secondary ms-2",
  },
  buttonsStyling: false,
});

@Component({
  selector: "app-event-type-list",
  templateUrl: "./event-type-list.component.html",
  styleUrls: ["./event-type-list.component.scss"],
})
export class EventTypeListComponent implements OnInit {
  filteredEventType: any[];
  filterBy;
  eventTypeData: any;

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private service: EventTypeService
  ) {}

  ngOnInit(): void {
    this.getAllEventTypeList();
  }

  async getAllEventTypeList() {
    (
      await this.service.getEventTypesList()
    ).subscribe((res) => {
      this.eventTypeData = res;
      this.filteredEventType = [...this.eventTypeData];
    });
  }

  filter() {
    this.filteredEventType = [
      ...this.eventTypeData.filter((item) =>
        item.title.toLowerCase().includes(this.filterBy.toLowerCase())
      ),
    ];
  }

  async deleteEventTypesData(id) {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure, You won't be able to revert this?",
        icon: "warning",
        confirmButtonText: "Yes, delete!",
        cancelButtonText: "No, cancel!",
        showCancelButton: true,
      })
      .then(async (result) => {
        if (result.value) {
          (await this.service.deleteEventTypes(id)).subscribe((res) => {
            this.getAllEventTypeList();
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  onEdit(id) {
    this.router.navigate(["event-type/form/" + id]);
  }
}
