import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  URL: string = 'https://my-fake-api-server.herokuapp.com';

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { url: requestURL } = request;

    request = !requestURL.startsWith(this.URL)
      ? request.clone({ url: `${this.URL}/${requestURL}` })
      : request;

    return next.handle(request).pipe(
      retry(2),

      catchError((error: HttpErrorResponse) => {
        alert(`Http Error: ${request.url}`);
        return throwError(error);
      })
    );

    return next.handle(request);
  }
}
