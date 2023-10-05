import { ApiService } from "src/app/services/api.service";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { VenueDetailsService } from "../venue-details.service";
import { attributeFormList } from "./attribute.model";
import Swal from "sweetalert2";
import { ActivatedRoute, Route, Router } from "@angular/router";
import {
  cateringData,
  facilitiesData,
  musicData,
  accessibility,
  selectAmenities,
} from "./attribute-constants";
@Component({
  selector: "app-attributes",
  templateUrl: "./attributes.component.html",
  styleUrls: ["./attributes.component.scss"],
})
export class AttributesComponent implements OnInit {
  venue;
  @Input() venueId;
  general_attributes = {};
  rulesList: any[];
  safety_rulesList: any[];
  additional_benefitsList: any[];

  house_standardsList: any[];
  attributesList: any[];
  amenitiesList: any[];
  constructor(
    private formBuilder: FormBuilder,
    private service: VenueDetailsService,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getVenueDetails();
  }

  async getAllList(type) {
    //rules
    (await this.apiService.commonGet("/rules")).subscribe(
      (res) => {
        this.rulesList = res;
        if (res.length) {
          this.rulesList = this.reflectSelection(
            this.rulesList,
            this.venue.general_attributes.rules
          );
        }
      },
      (err) => {}
    );

    //additional-benefits
    (await this.apiService.commonGet("/additional-benefits")).subscribe(
      (res) => {
        this.additional_benefitsList = res;
        if (res.length) {
          this.additional_benefitsList = this.reflectSelection(
            this.additional_benefitsList,
            this.venue.general_attributes.additional_benefits
          );
        }
      },
      (err) => {}
    );
    //safety-rules
    (await this.apiService.commonGet("/safety-rules")).subscribe(
      (res) => {
        this.safety_rulesList = res;
        if (res.length) {
          this.safety_rulesList = this.reflectSelection(
            this.safety_rulesList,
            this.venue.general_attributes.safety_rules
          );
        }
      },
      (err) => {}
    );

    //house-standards
    (await this.apiService.commonGet("/house-standards")).subscribe(
      (res) => {
        this.house_standardsList = res;
        if (res.length) {
          this.house_standardsList = this.reflectSelection(
            this.house_standardsList,
            this.venue.general_attributes.house_standards
          );
        }
      },
      (err) => {}
    );

    //attributes
    (await this.apiService.commonGet("/attributes")).subscribe(
      (res) => {
        this.attributesList = res;
        if (res.length) {
          this.attributesList = this.reflectSelection(
            this.attributesList,
            this.venue.general_attributes.attributes
          );
        }
      },
      (err) => {}
    );

    //amenities
    (await this.apiService.commonGet("/amenities")).subscribe(
      (res) => {
        this.amenitiesList = res;
        if (res.length) {
          this.amenitiesList = this.reflectSelection(
            this.amenitiesList,
            this.venue.general_attributes.amenities
          );
        }
      },
      (err) => {}
    );
  }

  //**additional_benefits init */
  changesAdditional_benefits(checked, i) {
    this.additional_benefitsList[i]["checked"] = checked;
  }
  saveAdditional_benefits() {
    let selectedAdditional_benefits = this.additional_benefitsList.filter(
      (a) => a.checked == true
    );
    if (!this.general_attributes) {
      this.general_attributes = {};
    }
    this.general_attributes["additional_benefits"] =
      this.removeCheckedFromArray(selectedAdditional_benefits);
    this.saveVenueAttribute();
  }
  //*additional_benefits END

  //**rule  */
  changesRules(checked, i) {
    this.rulesList[i]["checked"] = checked;
  }
  saveRules() {
    let selectedRules = this.rulesList.filter((a) => a.checked == true);
    if (!this.general_attributes) {
      this.general_attributes = {};
    }
    this.general_attributes["rules"] =
      this.removeCheckedFromArray(selectedRules);
    this.saveVenueAttribute();
  }
  //*rule END

  //**safety_rule init */
  changesSafety_Rules(checked, i) {
    this.safety_rulesList[i]["checked"] = checked;
  }
  saveSafety_Rules() {
    let selectedSafety_Rules = this.safety_rulesList.filter(
      (a) => a.checked == true
    );
    if (!this.general_attributes) {
      this.general_attributes = {};
    }
    this.general_attributes["safety_rules"] =
      this.removeCheckedFromArray(selectedSafety_Rules);
    this.saveVenueAttribute();
  }
  //*safety_rule END

  //**house_standards */
  changesHouse_standards(checked, i) {
    this.house_standardsList[i]["checked"] = checked;
  }
  saveHouse_standards() {
    let selectedHouse_standards = this.house_standardsList.filter(
      (a) => a.checked == true
    );
    if (!this.general_attributes) {
      this.general_attributes = {};
    }
    this.general_attributes["house_standards"] = this.removeCheckedFromArray(
      selectedHouse_standards
    );
    this.saveVenueAttribute();
  }
  //*house_standards END

  //**attribute */
  changesAttributes(checked, i) {
    this.attributesList[i]["checked"] = checked;
  }
  saveAttributes() {
    let selectedAttributes = this.attributesList.filter(
      (a) => a.checked == true
    );
    if (!this.general_attributes) {
      this.general_attributes = {};
    }
    this.general_attributes["attributes"] =
      this.removeCheckedFromArray(selectedAttributes);
    this.saveVenueAttribute();
  }
  //*attribute END

  //**amenities */
  changesAmenities(checked, i) {
    this.amenitiesList[i]["checked"] = checked;
  }
  saveAmenities() {
    let selectedAmenities = this.amenitiesList.filter((a) => a.checked == true);
    if (!this.general_attributes) {
      this.general_attributes = {};
    }
    this.general_attributes["amenities"] =
      this.removeCheckedFromArray(selectedAmenities);
    this.saveVenueAttribute();
  }
  //*amenities END

  //** COMMON */
  reflectSelection(arrSrc, arrSelected) {
    for (let i = 0; i < arrSrc.length; i++) {
      arrSrc[i]["checked"] =
        arrSelected?.find((a) => a.id == arrSrc[i]["id"]) != null;
    }
    return arrSrc;
  }
  removeCheckedFromArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      delete arr[i]["checked"];
    }
    return arr;
  }

  async saveVenueAttribute() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    (
      await this.service.postEntities(
        this.general_attributes,
        venueId,
        "general_attributes"
      )
    ).subscribe(async (res: any) => {
      this.getVenueDetails();
    });
  }

  async getVenueDetails() {
    let venueId = this.activeRoute.snapshot.paramMap.get("id");
    (await this.service.getVenueDetails(venueId)).subscribe(
      (res) => {
        this.venue = res;
        if (this.venue.general_attributes) {
          this.general_attributes = this.venue.general_attributes;
        } else {
          this.general_attributes = {};
        }

        this.getAllList(this.venue.type);
      },
      (err) => {}
    );
  }
}
