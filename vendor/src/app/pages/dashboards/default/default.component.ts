import { Component, OnInit, ViewChild } from "@angular/core";
import { emailSentBarChart, monthlyEarningChart } from "./data";
import { ChartType } from "./dashboard.model";
import { NgbDropdown, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventService } from "../../../core/services/event.service";

import { ConfigService } from "../../../core/services/config.service";
// import { UserService } from "venue-lib";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
  providers:[NgbDropdown]
})
export class DefaultComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor(
)
  {}
  // private userService: UserService
  // private todoService: TodoService,
  // TodoService
  async ngOnInit() {
    this.breadCrumbItems = [
      { label: "Utility" },
      { label: "Starter Page", active: true },
    ];
    // console.log(this.userService.thirdMethod());
    // (await this.todoService.getAllTodo()).subscribe((res) => {
    //   console.log("result ", res);
    // });
  }
}
