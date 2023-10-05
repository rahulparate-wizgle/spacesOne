import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class BenefitsApiService {

  constructor(
    private http: HttpClient,
    public apiService: ApiService,
   public toastController: ToastController
  ) { }

  async postAdditionalBenefits(data: any) {
    return await this.apiService.commonPost(
      "/additional-benefits", data

    );
  }
  async updateAdditionalBenefits(id: any, data: any) {
    return await this.apiService.commonPatch(
      "/additional-benefits/" + id, data

    );
  }

  getAdditionalBenefitsbyId(id: any) {
    return this.apiService.commonGet(
      "/additional-benefits/" + id

    );
  }

  async getAdditionalBenefitsList(pageSize,pageNo) {
    const filters = new Map();
    let _limit = 10;
     const filter = {   skip:10,   limit:_limit  };
     filters.set('filter', JSON.stringify(filter));
    return await this.apiService.commonGet("/additional-benefits");
  }

  async deleteAdditionalBenefits(id: number) {
    return await this.apiService.commonDelete(
      "/additional-benefits/" + id
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
