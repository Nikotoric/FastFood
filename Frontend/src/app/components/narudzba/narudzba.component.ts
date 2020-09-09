import { KorisnikService } from './../../servisi/korisnik.service';
import { Korisnik } from './../../servisi/korisnik.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NarudzbaJelaComponent } from '../narudzba-jela/narudzba-jela.component';
import { NarudzbaService } from '../../servisi/narudzba.service';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NarudzbaDto } from './narudzbaDto.model';
import { Artikal } from '../../servisi/artikal.model';
import { NarudzbaJela } from '../../servisi/narudzba-jela.model';

@Component({
  selector: 'app-narudzba',
  templateUrl: './narudzba.component.html',
  styleUrls: ['./narudzba.component.css']
})
export class NarudzbaComponent implements OnInit {
  listaKorisnika: Korisnik[];
  // tslint:disable-next-line: no-inferrable-types
  isValid: boolean = true;
  narudzbaDto: NarudzbaDto = new NarudzbaDto();


  constructor(
    public service: NarudzbaService,
    private dialog: MatDialog,
    private router: Router,
    private korisnikService: KorisnikService,
    private trenutnaRuta: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: prefer-const
    let narudzbaID = this.trenutnaRuta.snapshot.paramMap.get('id');
    if (narudzbaID == null){
      this.obnoviFormu();
    }
    else {
      // tslint:disable-next-line: radix
      this.service.dohvatiNarudzbuPoID(parseInt(narudzbaID)).then(res => {
      });
    }
    this.korisnikService.dohvatiKorisnika().then(res => this.listaKorisnika = res as Korisnik[]);
  }

  obnoviFormu(form?: NgForm){
    // tslint:disable-next-line:no-conditional-assignment
    if (form = null){
      form.resetForm();
    }
    this.service.formData = {
      NarudzbaID : null,
      brojNarudzbe: Math.floor(1000 + Math.random() * 9000).toString(),
      KorisnikID: 0,
      nacinPlacanja: '',
      nacinIsporuke: '',
      ukupanIznos: 0,
      obrisanArtikalID: '',
    };
    this.service.artikli = [];
  }

  dodajArtikal(narudzbaJelaIndex, NarudzbaID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { narudzbaJelaIndex, NarudzbaID };
    this.dialog.open(NarudzbaJelaComponent, dialogConfig).afterClosed().subscribe(res => {

      this.ukupnaCijena();
    });
  }

  goToIspis(){
    const role = this.korisnikService.getRole();
    const token = this.korisnikService.getToken();
    console.log(token);
    console.log(role);
    if (role === 'admin'){
      this.router.navigate(['/ispis']);
    }
  }

  buttonVisibleIspis(){
    const role = this.korisnikService.getRole();
    if (role === 'admin'){
      return false;
    }
    else{
      return true;
    }
  }

  obrisiArtikal(stavkeNarudzbeID: number, i: number){
    if (stavkeNarudzbeID != null){
      this.service.formData.obrisanArtikalID += stavkeNarudzbeID + ',';
    }
    this.service.artikli.splice(i, 1);
    this.ukupnaCijena();
  }

  ukupnaCijena(){
    this.service.formData.ukupanIznos = this.service.artikli.reduce((prethodni, trenutni) => {
      return prethodni + trenutni.ukupanIznos;
    }, 0);

    this.service.formData.ukupanIznos = parseFloat(this.service.formData.ukupanIznos.toFixed(2));

  }

  napraviNarudzbu(form: NgForm){


  const narudzbaTmp = this.service.dohvatiNarudzbuLocal();
  this.narudzbaDto.brojNarudzbe = narudzbaTmp.brojNarudzbe;
  this.narudzbaDto.nacinPlacanje = narudzbaTmp.nacinPlacanja;
  this.narudzbaDto.nacinIsporuke = narudzbaTmp.nacinIsporuke;
  this.narudzbaDto.ukupanIznos = narudzbaTmp.ukupanIznos;

  this.narudzbaDto.stavkeNarudzbe = [];

  const artikli = this.service.dohvatiArtikleLocal();
  artikli.forEach(element => {
    const artikalTmp = new NarudzbaJela(); // prije bilo let
    artikalTmp.cijena = element.cijena;
    artikalTmp.Kolicina = element.Kolicina;
    artikalTmp.imeArtikla = element.imeArtikla;
    artikalTmp.ukupanIznos = element.ukupanIznos;
    artikalTmp.ArtikalID = element.ArtikalID;
    console.log(artikalTmp.ArtikalID);

    this.narudzbaDto.stavkeNarudzbe.push(artikalTmp);
  });

  console.log(this.narudzbaDto);


  this.service.spremiAzurirajNarudzbu(this.narudzbaDto).subscribe(res => {
      this.obnoviFormu();
      this.toastr.success('Uspješna narudžba', 'Fast food');
      this.router.navigate(['/narudzba']);
    });

  }


  validateForm(){
    this.isValid = true;
    if (this.service.formData.KorisnikID === 0){
      this.isValid = false;
    }
    else if (this.service.artikli.length === 0){
      this.isValid = false;
    }
    return this.isValid;
  }

  onLogout(){
    localStorage.removeItem('tokenData');
    localStorage.removeItem('roleData');

    this.router.navigate(['/home/prijava']);

  }
}
