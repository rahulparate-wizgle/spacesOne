import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { BehaviorSubject, from, Observable, Subject, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { map, tap, switchMap } from "rxjs/operators";

import { Plugins } from "@capacitor/core";

import { Platform, IonSlides, ToastController } from "@ionic/angular";
import { StorageService } from "./storage";
import { ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";
// import { User } from "ionic";

const { Storage } = Plugins;

const TOKEN_KEY = "token";

@Injectable({
  providedIn: "root",
})
export class ApiService extends StorageService {
  healthCardTeacher() {
    throw new Error("Method not implemented.");
  }
  back() {
    window.history.back();
  }

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = "";

  // Http Options
  httpOptions = {};
  constructor(
    private http: HttpClient,
    public platform: Platform,
    public toastController: ToastController,
    public router : Router
  ) {
    super(platform);
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (document.getElementsByClassName("venue-loader").length)
        document.getElementsByClassName("venue-loader")[0].classList.add("hide");

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
     } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    this.router.navigate(["/error-pages/page500/"]);
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  startLoader() {
    if (document.getElementsByClassName("venue-loader").length)
      document
        .getElementsByClassName("venue-loader")[0]
        .classList.remove("hide");
  }
  stopLoader() {
    if (document.getElementsByClassName("venue-loader").length)
      document.getElementsByClassName("venue-loader")[0].classList.add("hide");
  }
  requestLogin(username, password) {
    const loginData = `username=${username}&grant_type=password&password=${password}`;

    return this.http
      .post(this.base_path + "token", loginData)
      .pipe(retry(2), catchError(this.handleError));
  }

  //******** COMMON METHODS

  async commonGet(url, filter?: object): Promise<any> {
    let token = await this.getStorage("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };
    if (filter) {
      url +=
        url.indexOf("?") != -1
          ? "&"
          : "?" + "filter=" + encodeURIComponent(JSON.stringify(filter));
    }
    return this.http
      .get(this.base_path + url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  async commonPostImage(url, data) {
    let token = await this.getStorage("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary6D0SpaTBmRUpQrXB",
        Accept: "multipart/form-data",
        Authorization: "Bearer " + token,
      }),
    };

    return this.http
      .post(this.base_path + url, data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  async commonPost(url, data) {
    let token = await this.getStorage("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };

    return this.http.post(this.base_path + url, data, this.httpOptions);
    // .pipe(retry(2), catchError(this.handleError));
  }

  async commonDelete(url) {
    let token = await this.getStorage("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };

    return this.http
      .delete(this.base_path + url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  async commonPut(url, data) {
    let token = await this.getStorage("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };

    return this.http
      .put(this.base_path + url, data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  async commonPatch(url, data) {
    let token = await this.getStorage("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };

    return this.http
      .patch(this.base_path + url, data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  async commonPostFile(url, data) {
    let token = await this.getStorage("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      }),
    };

    return this.http
      .post(this.base_path + url, data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  getFormValidationErrors(productForm) {
    let err = [];
    Object.keys(productForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = productForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          err.push(key + " " + keyError);
        });
      }
    });
    return err;
  }

  async addVenueImage(file, url, callback) {
    let token = await this.getStorage("token");
    var data = new FormData();
    data.append("file", file, file.name);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        callback(this.responseText);
      }
    });

    xhr.open("POST", this.base_path + url);
    xhr.setRequestHeader("Authorization", "Bearer " + token);

    xhr.send(data);

    return "1";
  }
  //******** COMMON METHODS END

  async commonPostImageUpload(url, file) {
    return Observable.create(observer => {
      let token = this.getStorage("token");
      var data = new FormData();
      data.append("file", file, file.name);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      });

      xhr.open("POST", this.base_path + url);
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.send(data);
    });
  }
}
