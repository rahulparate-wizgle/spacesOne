import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SingleV1Service {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  async postWishlist(id:string, data: any) {
    return await this.apiService.commonPost(
      "/add-to-wishlist/" + id, data
    );
  }
  async deleteWishList(id: any) {
    return await this.apiService.commonDelete("/remove-from-wishlist/" + id);
  }

  async getAllWishList(){
    return this.apiService.commonGet('/wishlist/');
  }

  async getAlreadyInWishList(id:any){
    return await this.apiService.commonGet("/is-already-in-wishlist/" +id);
  }

  async getAllEmployeeList(id:any){
    return this.apiService.commonGet('/venue-contact/'+id);
  }

}
