import { Injectable } from '@angular/core';
import { Narudzba } from './narudzba.model';
import { NarudzbaJela } from './narudzba-jela.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NarudzbaDto } from '../components/narudzba/narudzbaDto.model';

@Injectable({
  providedIn: 'root'
})
export class NarudzbaService {
  formData: Narudzba;
  artikli: NarudzbaJela[];

  constructor(
    private http: HttpClient
  ) { }

  spremiAzurirajNarudzbu(dto: NarudzbaDto){
    return this.http.post(environment.apiURL + '/Narudzba', dto);
  }

  dohvatiNarudzbu(){
    return this.http.get(environment.apiURL + '/Narudzba').toPromise();
  }

  dohvatiNarudzbuLocal(){
    return this.formData;
  }
  dohvatiArtikleLocal(){
    return this.artikli;
  }

  dohvatiNarudzbuPoID(id: number){
    return this.http.get(environment.apiURL + '/Narudzba/' + id).toPromise();
  }

  obrisiNarudzbu(id: number){
    return this.http.delete(environment.apiURL + '/Narudzba/' + id).toPromise();

  }
}
