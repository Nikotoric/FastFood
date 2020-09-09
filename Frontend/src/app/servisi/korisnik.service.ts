import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/internal/operators/map';
import { Token } from 'src/app/servisi/Token';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('tokenData')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Token {
    return this.currentUserSubject.value;
  }
  dohvatiKorisnika(){
    return this.http.get(environment.apiURL + '/Korisnik').toPromise();
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.apiURL + '/korisnik/login', { username, password })
        .pipe(map(t => {
            // login successful if there's a jwt token in the response
            if (t && t.token && t.role) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('tokenData', JSON.stringify(t.token));
                localStorage.setItem('roleData', JSON.stringify(t.role));
                this.currentUserSubject.next(t);
                console.log(this.getToken());
            }

            return t;
        }));
    }

    public getToken(): string {
      return JSON.parse(localStorage.getItem('tokenData'));
    }

    public getRole(): string {
      return JSON.parse(localStorage.getItem('roleData'));
    }
}
