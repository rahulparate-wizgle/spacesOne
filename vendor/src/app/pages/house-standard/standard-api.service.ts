import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class StandardApiService {

  constructor(
    private http: HttpClient,
    public apiService: ApiService,
   public toastController: ToastController
  ) { }
// postAmenities
  async postHouseStandard(data: any) {
    return await this.apiService.commonPost(
      "/house-standards", data

    );
  }
  // updateAmenities
  async updateHouseStandard(id: any, data: any) {
    return await this.apiService.commonPatch(
      "/house-standards/" + id, data

    );
  }
// getAmenitiesbyId
  getHouseStandardbyId(id: any) {
    return this.apiService.commonGet(
      "/house-standards/" + id

    );
  }
// getAmenitiesList
  async getHouseStandardList(pageSize,pageNo) {
    const filters = new Map();
    let _limit = 10;
     const filter = {   skip:10,   limit:_limit  };
     filters.set('filter', JSON.stringify(filter));
    return await this.apiService.commonGet("/house-standards");
  }
// deleteAmenities
  async deleteHouseStandard(id: number) {
    return await this.apiService.commonDelete(
      "/house-standards/" + id
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
