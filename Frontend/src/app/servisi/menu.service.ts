import { environment } from 'src/environments/environment';
import { Artikal } from './artikal.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  dohvacanjeArtikala(){
    return this.http.get<Artikal[]>(environment.apiURL + '/Artikli');
  }
}
