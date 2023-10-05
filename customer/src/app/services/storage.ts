import { Injectable } from "@angular/core";
// import { Plugins } from '@capacitor/core';
import { environment } from "src/environments/environment";
// const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}
  base_path = environment.apiEndpoint;
  store_base_url = environment.frontAPPEndpoint; ;



  getStorage(_key: string): any {
    try {
      return localStorage.getItem(_key);
    } catch (error) {
      console.error(error);
    }
  }

  async setStorage(_key: string, _value: any) {
    try {
      if (!_value || _value === "") {
        localStorage.removeItem(_key);
      } else {
        localStorage.setItem(_key, _value);
      }
    } catch (error) {
      console.log(" setStorage error ", error);
    }
  }



  async clearStorage() {
    return localStorage.clear();
  }


}
