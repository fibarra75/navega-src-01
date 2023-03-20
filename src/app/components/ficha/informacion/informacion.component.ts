import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Direccion } from 'src/app/models/direccion.model';
import { LabelMarca, MarcaMapa, OptionsMarpa, PositionMarca } from 'src/app/models/marca-mapa.model';
import { Organizacion } from 'src/app/models/organizacion.model';

import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  organizacionResp: Organizacion | undefined;
  lstOrg: Organizacion[] = [];
  nombre!: string;
  cargando:boolean=true;
  lstMarcas! : MarcaMapa[];

  @Input() organizacion!: Organizacion;
  
  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  //@ViewChild(MapInfoWindow, { static: false })
  //info!: MapInfoWindow;

  zoom = 12;
  maxZoom = 16;
  minZoom = 10;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom:this.maxZoom,
    minZoom:this.minZoom,
  }  

  constructor(
    public organizacionService: OrganizacionService
    ) {
    ;
  }   

  ngOnInit(): void {
    this.cargando = true;
    console.log('Input Organizacion:',this.organizacion);

    this.nombre = this.organizacion.nombre;

    this.center = {
      lat: -33.43698411475028,
      lng: -70.65073714260485,
    }    

    //this.lstOrg = await this.organizacionService.GetOrganizacion(this.organizacion.idOrganizacion);
    this.getOrganzacion(this.organizacion.idOrganizacion);
  }

  getOrganzacion(idOrganizacion:number) {
    this.organizacionService.GetOrganizacion(idOrganizacion).subscribe((data: Organizacion[]) => {
      let lstDir:Direccion[];
      this.lstMarcas = [];
      this.organizacionResp = data[0];

      let m:MarcaMapa;
      let d:Direccion;
      lstDir = this.organizacionResp.direcciones;

      for(let j = 0; j < lstDir.length; j++) {
        m = new MarcaMapa();
        d = lstDir[j];

        if (typeof d !== 'undefined') {          
          m.position = new PositionMarca();
          m.position.lat = d.latitud;
          m.position.lng = d.longitud;
          m.label = new LabelMarca();
          m.label.color = 'blue';
          m.label.text = this.organizacionResp.nombre;
          m.title = this.organizacionResp.nombre;
          m.info = this.organizacionResp.nombre;
          m.options = new OptionsMarpa();
          m.options.animation = google.maps.Animation.DROP;

          this.lstMarcas.push(m);
        }
      }      

      this.cargando = false
      
      console.log('Marcas: ', this.lstMarcas);      
    })    
  }
}
