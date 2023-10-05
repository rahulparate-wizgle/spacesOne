import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient,
    public apiService: ApiService,
     public toastController: ToastController) { }

     async postSignUp(data: any) {
      return await this.apiService.commonPost(
        "/vendor/onboard", data

      );
    }

    async postLogin(data: any) {
      return await this.apiService.commonPost(
        "/users/login", data

      );
    }

    async getUserList(searchCriteria) {
          let query = {

        where:searchCriteria ,
      };
      return await this.apiService.commonGet("users",query);
    }
}
