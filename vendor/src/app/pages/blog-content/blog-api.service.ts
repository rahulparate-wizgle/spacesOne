import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BlogAPIService {

  constructor(private http: HttpClient, public apiService:ApiService, public toastController: ToastController) { }

  async  postBlog(data : any){
    return await this.apiService.commonPost(
      "/blogs",data

    );
  }
  updateBlog(id:any,data:any){
    return  this.http.put(
      "http://localhost:3000/blogs/" +id , data

    );
  }

  getBlogbyId(id :any){
    return  this.apiService.commonGet(
      "/blogs/" +id

    );
  }


  async getBlogList() {
    return await this.apiService.commonGet("/blogs");
  }

  deleteBlog(id :number){
    return  this.http.delete(
      "http://localhost:3000/blogs/" +id

    );
  }



  async postImage(data : any) {
    return await this.apiService.commonPostImage("/files", data);
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
