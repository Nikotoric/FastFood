import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IspisNarudzbiComponent } from './components/ispis-narudzbi/ispis-narudzbi.component';
import { NarudzbaComponent } from './components/narudzba/narudzba.component';
import { NarudzbaJelaComponent } from './components/narudzba-jela/narudzba-jela.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { AgGridModule } from 'ag-grid-angular';
import { NarudzbaService } from './servisi/narudzba.service';
import { JwtInterceptor } from './interceptor';
import { ErrorInterceptor } from './ErrorInterceptor';
import { HomeComponent } from './components/home/home.component';
import { PrijavaComponent } from './components/home/prijava/prijava.component';
import { RegistracijaComponent } from './components/home/registracija/registracija.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistracijaComponent,
    IspisNarudzbiComponent,
    NarudzbaComponent,
    NarudzbaJelaComponent,
    MenuComponent,
    PrijavaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatListModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    ],
  entryComponents: [NarudzbaJelaComponent],
  providers: [NarudzbaService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
