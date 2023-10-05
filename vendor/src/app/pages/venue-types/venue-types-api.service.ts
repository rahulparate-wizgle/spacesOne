import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class VenueTypesApiService {

  constructor(
    private http: HttpClient,
    public apiService: ApiService,
    public toastController: ToastController
  ) { }

  async postVenueTypes(data: any) {
    return await this.apiService.commonPost(
      "/venue-types", data

    );
  }

  async updateVenueTypes(id: any, data: any) {
    return await this.apiService.commonPatch(
      "/venue-types/" + id, data

    );
  }

  getVenueTypesbyId(id: any) {
    return this.apiService.commonGet(
      "/venue-types/" + id

    );
  }

  async getVenueTypesList(pageSize, pageNo) {
    const filters = new Map();
    let _limit = 10;
    const filter = { skip: 10, limit: _limit };
    filters.set('filter', JSON.stringify(filter));
    return await this.apiService.commonGet("/venue-types");
  }

  async deleteVenueTypes(id: number) {
    return await this.apiService.commonDelete(
      "/venue-types/" + id
    );
  }

  // async postImage(data : any) {
  //   return await this.apiService.commonPostImage("/files", data);
  // }

  getFormValidationErrors(productForm) {
    let errors = {};
    Object.keys(productForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = productForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors[key] = keyError;
        });
      }
    });
    return errors;
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
