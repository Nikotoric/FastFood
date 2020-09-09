import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NarudzbaJela } from '../../servisi/narudzba-jela.model';
import { ArtikalService } from '../../servisi/artikal.service';
import { Artikal } from '../../servisi/artikal.model';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { NarudzbaService } from '../../servisi/narudzba.service';


@Component({
  selector: 'app-narudzba-jela',
  templateUrl: './narudzba-jela.component.html',
  styleUrls: ['./narudzba-jela.component.css']
})
export class NarudzbaJelaComponent implements OnInit {
  formData: NarudzbaJela;
  listaArtikla: Artikal[];
  // tslint:disable-next-line:no-inferrable-types
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<NarudzbaJelaComponent>,
    private artikalService: ArtikalService,
    private narudzba: NarudzbaService
  ) { }

  ngOnInit(): void {

    this.artikalService.dohvatiArtikle().then(res => this.listaArtikla = res as Artikal[]);

    if (this.data.narudzbaJelaIndex == null) {
      this.formData = {
        StavkeNarudzbeID: null,
        NarudzbaID: this.data.NarudzbaID,
        ArtikalID: 0,
        Kolicina: 0,
        imeArtikla: '',
        cijena: 0,
        ukupanIznos: 0,
      };
    }
    else {
      this.formData = Object.assign({}, this.narudzba.artikli[this.data.narudzbaJelaIndex]);
    }
  }


  cijenaArtikla(odabrano) {
    if (odabrano.selectedIndex === 0) {
      this.formData.cijena = 0;
      this.formData.imeArtikla = '';
    }
    else {
      this.formData.cijena = this.listaArtikla[odabrano.selectedIndex - 1].cijena;
      this.formData.imeArtikla = this.listaArtikla[odabrano.selectedIndex - 1].imeArtikla;
      this.formData.ArtikalID = this.listaArtikla[odabrano.selectedIndex - 1].artikalID;
      console.log(this.listaArtikla);
      console.log(this.formData.ArtikalID);
    }
    this.ukupanIzracun();
  }

  ukupanIzracun() {
    this.formData.ukupanIznos = this.formData.Kolicina * this.formData.cijena;
  }

  dodaj(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.narudzbaJelaIndex == null) {
        this.narudzba.artikli.push(form.value);
      }
      else {
        this.narudzba.artikli[this.data.narudzbaJelaIndex] = form.value;
      }
      this.dialogRef.close();
    }

  }

  validateForm(formData: NarudzbaJela) {
    this.isValid = true;
    if (formData.ArtikalID === 0) {
      this.isValid = false;
    } else if (formData.Kolicina === 0) {
      this.isValid = false;
    }
    return this.isValid;
  }

}
