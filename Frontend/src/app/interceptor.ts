import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KorisnikService } from './servisi/korisnik.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: KorisnikService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // tslint:disable-next-line:prefer-const
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
