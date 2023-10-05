import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "src/app/services/api.service";
import { ValidationErrors } from "@angular/forms";
import { ToastController } from "@ionic/angular/providers/toast-controller";

@Injectable({
  providedIn: "root",
})
export class VenuelistApiService {
  constructor(private http: HttpClient, public apiService: ApiService) {}

  async postEnquiry(data: any) {
    return await this.apiService.commonPost("/enquiry", data);
  }
  getFormValidationErrors(productForm) {
    let errors = {};
    Object.keys(productForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = productForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors[key] = keyError;
        });
      }
    });
    return errors;
  }

  getVenueListbyId() {
    return this.apiService.commonGet("/vendor-venue/" );
  }
  async getVenueList(pageSize, pageNo, searchCriteria) {
    let query = {
      limit: 100,
      skip: 0,
      where: searchCriteria,
};
    return await this.apiService.commonGet("/vendor-venue", query);
  }

  async getList() {
    return await this.apiService.commonGet("/vendor-venue");
  }

  async deleteVenue(id: any) {
    return await this.apiService.commonDelete("/venues/" + id);
  }
}
