import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    public apiService: ApiService
  ) { }

  async postCustomer(data: any) {
    return await this.apiService.commonPost(
      "/customers", data
    );
  }

  async updateCustomer(id: any, data: any) {
    return await this.apiService.commonPatch(
      "/customers/" + id, data

    );
  }

  async postLogin(data: any) {
    return await this.apiService.commonPost(
      "/users/login", data
    );
  }
  public setUser(response:{token:string,profile:any}){
    localStorage.setItem('token',response.token)
    localStorage.setItem('user', JSON.stringify(response.profile))
}

  /**
   * Logout the user
   */
  logout() {
    // logout the user
   localStorage.clear();
}

verifyUser(email: any) {
  return this.apiService.commonGet("/verify-customer/" + email)
}

async generateOtp(data: any) {
  return await this.apiService.commonPost("/customers/generate-otp", data);
}
async getRegOTP(data: any) {
  return await this.apiService.commonPost("/generate-otp", data);
}

verifyRegOTP(email: string, data: any)
{
  return this.apiService.commonPost("/verify-otp/"+ email, data);
}

updatePassword(email: string, password: any)
{
  return this.apiService.commonPost("/user/update-password/"+ email, password);

}

verifyOtp(email: string, data: any)
{
  return this.apiService.commonPost("/customers/verify-otp/"+ email, data);
}

}
