import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "src/app/services/api.service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(public apiService: ApiService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if(!(event instanceof HttpResponse)){
          this.apiService.startLoader();
        }
        if (event instanceof HttpResponse) {
          this.apiService.stopLoader();
        }
        return event;
      })
    );
  }
}
