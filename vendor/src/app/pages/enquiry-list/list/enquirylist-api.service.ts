import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class enquirylistApiService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  async postEnquiry(data: any) {
    return await this.apiService.commonPost(
      "/enquiry", data
 );
  }
 async getUserList() {
    return await this.apiService.commonGet("/employees",);
  }

  async postComment(id: any,data: any) {
    return await this.apiService.commonPost(
      "/enquiry/comment/" + id,data
 );
  }

  getenquiryListbyId(id: any) {
    let include = {"include":[{"relation":"vendor"},{"relation": "venue"},{"relation": "customer"}]}
    return this.apiService.commonGet(
      "/enquiry/" + id, include );
  }

  async getenquiryList(pageSize,pageNo,searchCriteria) {
    let include = [{"relation":"vendor"},{"relation": "venue"},{"relation": "employees"},{"relation": "customer"}];
    let query = {
      limit: 100,
      skip: 0,
      where:searchCriteria ,
      include:include
    };
    return await this.apiService.commonGet("/enquiry",query );
}

async getList() {
  let include = {"include":[{"relation":"vendor"},{"relation": "venue"},{"relation": "employees"},{"relation": "customer"}]}
  return await this.apiService.commonGet("/enquiry",include );
}
async deletEnquiry(id: number) {
  return await this.apiService.commonDelete(
    "/enquiry/" + id
  );
}
async updateEnquiry(id: any, data: any) {
  return await this.apiService.commonPatch(
    "/enquiry/" + id, data
  );
}
}
