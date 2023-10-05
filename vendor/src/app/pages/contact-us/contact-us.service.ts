import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor( private http: HttpClient, public apiService: ApiService, public toastController: ToastController) { }

  async postContactUs(data: any) {
    return await this.apiService.commonPost(
      "/enquiry", data

    );
  }

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
}
