import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps'

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSliderModule } from '@angular/material/slider';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { FichaComponent } from './components/ficha/ficha.component';
import { FichaterritorialComponent } from './components/fichaterritorial/fichaterritorial.component';

import { DisplayNombrePipe }  from './cortartexto.pipe';
import { ThousandsPipe } from './formatoNumero.pipe';

import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { OrganizacionesComponent } from './components/organizaciones/organizaciones.component';
import { LoginComponent } from './components/login/login.component';
import { PrgypryComponent } from './components/ficha/prgypry/prgypry.component';
import { InformacionComponent } from './components/ficha/informacion/informacion.component';
import { RrhhfinanzasComponent } from './components/ficha/rrhhfinanzas/rrhhfinanzas.component';
import { IniciativacampanaComponent } from './components/fichaterritorial/iniciativacampana/iniciativacampana.component';
import { DetalleiniciativacampanaComponent } from './components/fichaterritorial/detalleiniciativacampana/detalleiniciativacampana.component';
import { PoliticaprivacidadComponent } from './components/politicaprivacidad/politicaprivacidad.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    BusquedaComponent,
    FichaComponent,
    FichaterritorialComponent,
    DisplayNombrePipe,
    ThousandsPipe,
    ConocenosComponent,
    ContactanosComponent,
    OrganizacionesComponent,
    LoginComponent,
    PrgypryComponent,
    InformacionComponent,
    RrhhfinanzasComponent,
    IniciativacampanaComponent,
    DetalleiniciativacampanaComponent,
    PoliticaprivacidadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GoogleMapsModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
