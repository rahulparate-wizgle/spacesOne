import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    public apiService: ApiService)
    { }

    async updateCustomer(id: any, data: any) {
    return await this.apiService.commonPatch(
      "/customers/" + id, data

    );
  }

  getUserById(id: any) {
    return this.apiService.commonGet("/customers/" + id);
  }

  async getCustomerWishlist(){
    let userData: any = localStorage?.getItem('user');
    let loggedInUser = JSON?.parse(userData);
    let wishlist = loggedInUser?.wishlist;
      let filterIds = [];
      for(let i=0;i<wishlist.length;i++){
        filterIds.push({id:wishlist[i]})
      }
      let query = {
        limit: 100,
        skip: 0,
        where: {
          or:filterIds,
        },
      };
    return this.apiService.commonGet('/venues/', query);
  }

    verifyPassword(loginData: any)
  {
    return this.apiService.commonPost("/user/verify-login", loginData);
  }

  // async postImage( id: string, file : any) {
  //   return await this.apiService.commonPostImage("/customers/image/" + id, file);
  // }

  async addImages(id: string, file : any){

    return Observable.create( (observer:any) => {
      let token =  this.apiService.getStorage("token");
      var data = new FormData();
      data.append("file", file, file.name);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
           xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
        } else {
        observer.error(xhr.response);
        }        }
      });

      xhr.open("POST", this.apiService.base_path+"/customers/image/" + id);
      xhr.setRequestHeader("Authorization", "Bearer "+token);
      xhr.send(data);

       });

    }

}
