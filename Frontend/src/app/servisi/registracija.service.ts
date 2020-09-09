import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from './korisnik.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistracijaService {

  url = environment.apiURL + '/Korisnik';

  constructor(private http: HttpClient) { }

  dodajKorisnika(korisnik: Korisnik){
    return this.http.post(this.url + '/register', korisnik);
  }

  urediKorisnika(korisnik: Korisnik){
    return this.http.put(this.url + korisnik.KorisnikID, korisnik);
  }

  dohvatiKorisnika(id: number){
    return this.http.get(this.url + id);
  }

  dohvatiKorisnike(){
    return this.http.get(this.url);
  }

  obrisiKorisnika(id){
    return this.http.delete(this.url + id);

  }

}
