import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { Artikal } from '../../servisi/artikal.model';
import { MenuService } from 'src/app/servisi/menu.service';
import { AlertService } from 'src/app/servisi/alert.service';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/servisi/korisnik.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private gridApi: GridApi;
  style = {
    width: '100%',
    height: '100%'
  };

  listaArtikla: Artikal[] = [];
  pizze = [];
  sendvici = [];
  pica = [];

  columnPizza = [
    {headerName: 'Pizze', field: 'imeArtikla', sortable: true, filter: true, width: 150 },
    {headerName: 'Cijena (kn)', field: 'cijena', sortable: true, filter: true, width: 80 }
  ];

  columnSendvici = [
    {headerName: 'Sendviči', field: 'imeArtikla', sortable: true, filter: true, width: 150 },
    {headerName: 'Cijena (kn)', field: 'cijena', sortable: true, filter: true, width: 100 }
  ];

  columnPica = [
    {headerName: 'Pića', field: 'imeArtikla', sortable: true, filter: true, width: 150 },
    {headerName: 'Cijena (kn)', field: 'cijena', sortable: true, filter: true, width: 100 }
  ];

  constructor(
    private menuService: MenuService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private router: Router,
    private korisnikService: KorisnikService
  ) { }

  ngOnInit(): void {
    this.menuService.dohvacanjeArtikala().subscribe(data => {
      this.listaArtikla = data;
      this.pizze = data.filter( artikal => artikal.tipArtikla === 0 );
      this.sendvici = data.filter( artikal => artikal.tipArtikla === 1 );
      this.pica = data.filter( artikal => artikal.tipArtikla === 2 );
      console.log(this.listaArtikla);
    });

  }

  onGridReady(params){
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();

  }

  onGridSizeChanged(e){
    if (window.innerWidth > 800){
      this.gridApi.sizeColumnsToFit();
    }
  }

  onLogout(){
    localStorage.removeItem('tokenData');
    localStorage.removeItem('roleData');
    this.router.navigate(['/home/prijava']);

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

}
