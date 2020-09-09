import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NarudzbaComponent } from './components/narudzba/narudzba.component';
import { IspisNarudzbiComponent } from './components/ispis-narudzbi/ispis-narudzbi.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrijavaComponent } from './components/home/prijava/prijava.component';
import { RegistracijaComponent } from './components/home/registracija/registracija.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home/prijava', pathMatch: 'full'},
  { path: 'home', component: HomeComponent,
  children: [
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava', component: PrijavaComponent }
  ]
},
  { path: 'menu', component: MenuComponent },
  { path: 'ispis', component: IspisNarudzbiComponent },
  { path: 'narudzba', children: [
    { path: '', component: NarudzbaComponent },
    { path: 'edit/:id', component: NarudzbaComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
