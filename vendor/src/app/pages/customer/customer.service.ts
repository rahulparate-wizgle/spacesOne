import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, public apiService: ApiService,) { }

  async postCustomer(data: any) {
    return await this.apiService.commonPost(
      "customers", data
    );
  }

  async getCustomersList(pageSize, pageNo, searchCriteria) {
    let query = {
      limit: 100,
      skip: 0,
      where: searchCriteria,
    };
    return await this.apiService.commonGet("/customers", query);
  }

  async getCustomerList() {
    return await this.apiService.commonGet("/customers");
  }

  async updateCustomer(id: any, data: any) {
    return await this.apiService.commonPatch(
      "/customers/" + id, data
    );
  }

  getCustomerbyId(id: any) {
    return this.apiService.commonGet(
      "/customers/" + id
    );
  }

  verifyCustomer(email: any) {
    return this.apiService.commonGet("/verify-customer/" + email)
  }

  async deleteCustomer(id: number) {
    return await this.apiService.commonDelete(
      "customers/" + id
    );
  }

  async postImage(file : any, id) {
    return await this.apiService.commonPostImageUpload("/customers/image/" + id, file);
  }

}
