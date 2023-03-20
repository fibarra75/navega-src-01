import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { OrganizacionesComponent } from './components/organizaciones/organizaciones.component';
import { PoliticaprivacidadComponent } from './components/politicaprivacidad/politicaprivacidad.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'', component:InicioComponent
  },
  {
    path:'inicio', component:InicioComponent
  },  
  {
    path:'login', component:LoginComponent
  },    
  {
    path:'busqueda', component:BusquedaComponent
  },
  {
    path:'organizaciones', component:OrganizacionesComponent
  },
  {
    path:'conocenos', component:ConocenosComponent
  },
  {
    path:'contactanos', component:ContactanosComponent
  },  
  {
    path:'politicaprivacidad', component:PoliticaprivacidadComponent
  },  
  {
    path:'**',component:InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
