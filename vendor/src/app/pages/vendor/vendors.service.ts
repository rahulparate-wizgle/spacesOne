import { Observable } from 'rxjs/Rx';
import { ApiService } from './../../services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(private apiService: ApiService ) { }
  async updateVendor(data: any, id: any) {
    return await this.apiService.commonPatch(
      "/vendors/"+ id, data

    );
  }

  async updateVendorOnly(data: any, id: any) {
    return await this.apiService.commonPut("/vendors/"+ id, data);
  }


  getVendorsbyId(id: any) {
    return this.apiService.commonGet("/vendors/" + id);
  }

  getVendors() {
    return this.apiService.commonGet("/vendors/");
  }

  async getVendorsList(pageSize,pageNo) {
    const filters = new Map();
    let _limit = 10;
     const filter = {   skip:10,   limit:_limit  };
     filters.set('filter', JSON.stringify(filter));
    return await this.apiService.commonGet("/vendors");
  }

  async deleteVendors(id: number) {
    return await this.apiService.commonDelete("/vendors/" + id);
  }

  async addImages(file,id){

    return Observable.create( observer => {
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

      xhr.open("POST", this.apiService.base_path+"/vendors/logo/" + id);
      xhr.setRequestHeader("Authorization", "Bearer "+token);
      xhr.send(data);

       });

    }

}
