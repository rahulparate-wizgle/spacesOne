import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IconData } from "./icons-data";
import { laIcons } from "./la-icon-data";

@Component({
  selector: "app-icon-picker",
  templateUrl: "./icon-picker.component.html",
  styleUrls: ["./icon-picker.component.scss"],
})
export class IconPickerComponent implements OnInit {
  constructor() {}
  @Input() onSelectedIcon;
  data = [];
  laData = [];
  view:string = 'line'
  ngOnInit(): void {
    this.data = IconData;
    this.laData = laIcons;
  }
  SearchIcons(event) {
    if (event.target.value) {
      this.data = IconData.filter((a) => a.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()));
      this.laData = laIcons.filter((a) => a.class.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()));
    } else {
      this.data = IconData;
      this.laData = laIcons
    }
  }
  LocalIconSelected(item){
    this.onSelectedIcon(item);

  }
  setView(v){
    this.view = v;
  }
}
