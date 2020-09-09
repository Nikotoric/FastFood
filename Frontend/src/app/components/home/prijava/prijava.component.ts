import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../servisi/alert.service';
import { KorisnikService } from '../../../servisi/korisnik.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: KorisnikService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;


    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Uspješna prijava')
          console.log(data);
          console.log(this.f.username.value)
          this.router.navigate(['/menu']);
        },
        error => {
          if (error.status === 400){
            this.toastr.error('Pogrešan unos korisničkog imena ili lozinke. Pokušajte ponovo!', 'Authentication failed');
          }
          else{
            console.log(error);
          }

        });
  }
}
