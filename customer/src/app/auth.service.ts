import { Injectable } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private apiService: ApiService,
    private router: Router) { }

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
}
