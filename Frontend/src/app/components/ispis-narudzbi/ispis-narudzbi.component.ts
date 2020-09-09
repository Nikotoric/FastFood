import { KorisnikService } from './../../servisi/korisnik.service';
import { Component, OnInit } from '@angular/core';
import { NarudzbaService } from '../../servisi/narudzba.service';
import { Router } from '../../../../node_modules/@angular/router';
import { ToastrModule } from '../../../../node_modules/ngx-toastr';


@Component({
  selector: 'app-ispis-narudzbi',
  templateUrl: './ispis-narudzbi.component.html',
  styleUrls: ['./ispis-narudzbi.component.css']
})
export class IspisNarudzbiComponent implements OnInit {
  listaNarudzbi;

  constructor(
    private toastrService: ToastrModule,
    private service: NarudzbaService,
    private router: Router,
    private korisnikService: KorisnikService
  ) { }

  ngOnInit(): void {
    this.osvjezi();
  }

  // tslint:disable-next-line: typedef
  osvjezi(){
    this.service.dohvatiNarudzbu().then(res => this.listaNarudzbi = res);
  }

  // tslint:disable-next-line: typedef
  buttonVisibleIspis(){
    const role = this.korisnikService.getRole();
    if (role === 'admin'){
      return false;
    }
    else{
      return true;
    }
  }

  // tslint:disable-next-line: typedef
  goToIspis(){
    const role = this.korisnikService.getRole();
    const token = this.korisnikService.getToken();
    console.log(token);
    console.log(role);
    if (role === 'admin'){
      this.router.navigate(['/ispis']);
    }
  }

  // tslint:disable-next-line: typedef
  onLogout(){
    localStorage.removeItem('tokenData');
    localStorage.removeItem('roleData');
    this.router.navigate(['/home/prijava']);

  }

}
