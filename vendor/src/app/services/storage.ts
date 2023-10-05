import { Injectable } from "@angular/core";
// import { Plugins } from '@capacitor/core';
import { Storage } from "@capacitor/storage";
import { Platform } from "@ionic/angular";
import { environment } from "src/environments/environment";
// const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(public platform: Platform) {}
  base_path = environment.apiEndpoint;
  store_base_url = environment.frontAPPEndpoint; ;


  async setString(key: string, value: string) {
    await Storage.set({ key, value });
  }

  async getString(key: string): Promise<{ value: any }> {
    return await Storage.get({ key });
  }

  getStorage(_key: string): any {
    try {
      return localStorage.getItem(_key);
    } catch (error) {
      console.error(error);
    }
  }

  async setStorage(_key: string, _value: any) {
    try {
      if (this.platform.is("mobileweb")) {
        if (!_value || _value === "") {
          localStorage.removeItem(_key);
        } else {
          localStorage.setItem(_key, _value);
        }
      } else {
        if (!_value || _value === "") {
          await Storage.remove({ key: _key });
        } else {
          await Storage.set({ key: _key, value: _value });
        }
      }
    } catch (error) {
      console.log(" setStorage error ", error);
    }
  }

  async setObject(key: string, value: any) {
    await Storage.set({ key, value: JSON.stringify(value) });
  }

  async getObject(key: string): Promise<{ value: any }> {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async removeItem(key: string) {
    await Storage.remove({ key });
  }

  async clearStorage() {
    if (this.platform.is("mobileweb")) {
      return localStorage.clear();
    } else {
      await Storage.clear();
    }
  }


}
