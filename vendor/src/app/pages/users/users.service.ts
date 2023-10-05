import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, public apiService: ApiService,) { }

  async postUsers(data: any) {
    return await this.apiService.commonPost(
      "employees", data
    );
  }

  async getUsersList(pageSize, pageNo, searchCriteria) {
    let query = {
      limit: 100,
      skip: 0,
      where: searchCriteria,
    };
    return await this.apiService.commonGet("/employees", query);
  }

  async getUserList() {
    return await this.apiService.commonGet("/employees");
  }

  async getVenueList() {
    return await this.apiService.commonGet("/venues");
  }

  async updateUsers(id: any, data: any) {
    return await this.apiService.commonPatch(
      "/employees/" + id, data
    );
  }

  getUsersbyId(id: any) {

    return this.apiService.commonGet(
      "/employees/" + id
    );
  }

  async getCurrentUser(){
    let user = localStorage.getItem("user");
    if(user){
      return JSON.parse(user);
    }
    return null;
  }

  verifyUser(email: any) {
    return this.apiService.commonGet("/verify-employees/" + email)
  }

    async addGalleryImages(file, id, callback) {
    let token = await this.apiService.getStorage("token");
    var data = new FormData();
    data.append("file", file, file.name);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        callback(this.responseText)
      }
    });

    xhr.open("POST", this.apiService.base_path + "/employees/updateImage/" + id);
    xhr.setRequestHeader("Authorization", "Bearer " + token);

    xhr.send(data);

    return "1"
  }

  async deleteUsers(id: number) {
    return await this.apiService.commonDelete(
      "employees/" + id
    );
  }

  async generateOtp(data: any) {
    return await this.apiService.commonPost("/user/generate-otp/", data);
  }

  verifyOtp(email: string, otp: string)
  {
    return this.apiService.commonPost("/user/verify-otp/"+ email, otp);
  }

  updatePassword(email: string, password: any)
  {
    return this.apiService.commonPost("/user/update-password/"+ email, password);
  }

}
