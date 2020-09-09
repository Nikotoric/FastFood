import { RegistracijaService } from './../../../servisi/registracija.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../servisi/alert.service';
import { KorisnikService } from '../../../servisi/korisnik.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Korisnik } from 'src/app/servisi/korisnik.model';


@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  korisnik: Korisnik = new Korisnik();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private korisnikService: KorisnikService,
    private registracijaService: RegistracijaService,
    private toastr: ToastrService
  ) {
    // napraviti if petlju koja vraca na pocetnu stranicu ako je korisnik vec logiran
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullname: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {

    this.submitted = true;

    this.korisnik.address = this.form.get('address').value;
    this.korisnik.fullname = this.form.get('fullname').value;
    this.korisnik.username = this.form.get('username').value;
    this.korisnik.password = this.form.get('password').value;

    this.registracijaService.dodajKorisnika(this.korisnik).pipe(first())
    .subscribe(
      data => {
        this.toastr.success('Novi korisnik kreiran!', 'Registracija uspješna!'),
        this.router.navigate(['../prijava'], {
          relativeTo:
            this.route
        });
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

}
