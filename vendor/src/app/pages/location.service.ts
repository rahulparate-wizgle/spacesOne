import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "../services/api.service";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  constructor(private http: HttpClient, public apiService: ApiService) {}


  async getLocation() {


    const location = [
      {
        id: 1,
        location: "Nagpur",
      },
      {
        id: 2,
        location: "Noida",
      },
      {
        id: 3,
        location: "Andheri",
      },
      {
        id: 4,
        location: "Goregaon",
      },
    ];

   return location;
  }
}
