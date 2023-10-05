import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class VenueDetailsService {

  constructor(private http: HttpClient, public apiService: ApiService, public toastController: ToastController) { }

  async postRules(data: any) {
    return await this.apiService.commonPost(
      "/rules", data
    );
  }

  // async postGallery(data: any,id:string, entity:string) {
  //   return await this.apiService.commonPost(
  //     "/venues/"+id+"/"+entity, data

  //   );
  // }

  async postOverview(data: any,id = ''){
    if(id?.length > 0 && id != '0'){
      return await this.apiService.commonPatch(
        "/venues/"+id, data
      );
    }else{
      return await this.apiService.commonPost(
        "/venues", data
      );
    }

  }

  async postEntities(data: any,id:string, entity:string){
    return await this.apiService.commonPost(
      "/venues/"+id+"/"+entity, data
    );
  }

  async getVenueDetails(id:string){
    return await this.apiService.commonGet(
      "/venues/"+id
    );
  }

  async getVenueTypes(){
    return await this.apiService.commonGet(
      "/venue-types/"
    );
  }

  a

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

  async addGalleryImages(file,venueId,callback){
   return (await this.apiService.addVenueImage(file,"/venues/gallery/" + venueId,callback));
  }

  async addPricingGalleryImages(file,venueId,callback){
    return (await this.apiService.addVenueImage(file,"/venues/pricing-gallery/" + venueId,callback));
   }

  async removeGalleryImages(venueId,index){
    return (await this.apiService.commonDelete('/venues/gallery/'+venueId+'/'+index));
  }

  async removePricingGalleryImages(venueId,index){
    return (await this.apiService.commonDelete('/venues/pricing-gallery/'+venueId+'/'+index));
  }

  async getMyVendorLocations(){
    let vendorId= JSON.parse(localStorage.getItem('user'))?.vendorId;
    return await this.apiService.commonGet(
      "/vendors/"+vendorId
    );
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
