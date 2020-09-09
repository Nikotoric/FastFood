import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { KorisnikService } from './servisi/korisnik.service';
import { Router } from '../../node_modules/@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: KorisnikService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // tslint:disable-next-line:quotemark
                console.log("Unauthorize");
                console.log(err.url);
                this.router.navigate(['/home/prijava']);


                const error = err;
                console.log(error);
                return throwError(error);
        }
        if (err.status === 403) {
            // tslint:disable-next-line:quotemark
            console.log("Unauthorize");
            console.log(err.url);
            this.router.navigate(['menu']);


            const error = err;
            console.log(error);
            return throwError(error);
    }
    
    }));
  }
}

