import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  constructor(
    private http: HttpClient,
    public apiService: ApiService,
    public toastController: ToastController
  ) { }


  async postEventTypes(data: any) {
    return await this.apiService.commonPost(
      "/event-types", data

    );
  }

  async updateEventTypes(id: any, data: any) {
    return await this.apiService.commonPatch(
      "/event-types/" + id, data

    );
  }

  getEventTypesbyId(id: any) {
    return this.apiService.commonGet(
      "/event-types/" + id

    );
  }

  async getEventTypesList() {
    const filters = new Map();
    let _limit = 10;
    const filter = { skip: 10, limit: _limit };
    filters.set('filter', JSON.stringify(filter));
    return await this.apiService.commonGet("/event-types");
  }

  async deleteEventTypes(id: number) {
    return await this.apiService.commonDelete(
      "/event-types/" + id
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

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

}
