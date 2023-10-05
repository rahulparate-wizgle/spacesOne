import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'
import { ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RulesAPIService {

  constructor(private http: HttpClient, public apiService: ApiService, public toastController: ToastController) { }

  async postRules(data: any) {
    return await this.apiService.commonPost(
      "rules", data

    );
  }
  async updateRules(id: any, data: any) {
    return await this.apiService.commonPatch(
      "/rules/" + id, data

    );
  }

  getRulesbyId(id: any) {
    return this.apiService.commonGet(
      "/rules/" + id

    );
  }



  async getRulesList(pageSize, pageNo) {
    const filters = new Map();
    let _limit = 10;
    const filter = { skip: 10, limit: _limit };
    filters.set('filter', JSON.stringify(filter));
    return await this.apiService.commonGet("/rules");
  }

  async deleteRules(id: any) {
    return await this.apiService.commonDelete(
      "/rules/" + id
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
