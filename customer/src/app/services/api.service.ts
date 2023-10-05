import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";



import { StorageService } from "./storage";
import { ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";



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

  token = "";

  // Http Options
  httpOptions = {};
  constructor(
    private http: HttpClient,
    public router : Router
  ) {
    super();
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    this.stopLoader();
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


  //******** COMMON METHODS

  async commonGet(url: string, filter?: object): Promise<any> {
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

  async commonPostImage(url:string, data:any) {
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

  async commonPost(url: string, data: any) {
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

  async commonDelete(url: string) {
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

  async commonPut(url: string, data: any) {
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

  async commonPatch(url: string, data: any) {
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

  async commonPostFile(url: string, data: any) {
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

  getFormValidationErrors(productForm: { controls: {}; get: (arg0: string) => { (): any; new(): any; errors: ValidationErrors; }; }) {
    let err: string[] = [];
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

  //******** COMMON METHODS END
}
