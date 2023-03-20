import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Direccion } from 'src/app/models/direccion.model';
import { EntidadRelacionada, Responsable, TipoEntidad } from 'src/app/models/entidad-relacionada.model';
import { LabelMarca, MarcaMapa, OptionsMarpa, PositionMarca } from 'src/app/models/marca-mapa.model';
import { Organizacion } from 'src/app/models/organizacion.model';
import { OrganizacionService } from 'src/app/services/organizacion.service';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  }
};

@Component({
  selector: 'app-entidadesasociadas',
  templateUrl: './entidadesasociadas.component.html',
  styleUrls: ['./entidadesasociadas.component.css']
})
export class EntidadesasociadasComponent implements OnInit {
  listaEntRel!: EntidadRelacionada[]
  entRel!: EntidadRelacionada;
  responable!: Responsable; 

  @Input() organizacion!: Organizacion;
  title = 'angular-google-maps-app';

  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

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
  //markers = []  as  any;
  
  markers: any[] = [
    { position : {lat: -33.43873919967874, lng: -70.65032780756958}, label: { color:'blue', text : 'Texto Eiffel Tower'}, title : '1234567', info : 'Info xxxx', options : {animation: google.maps.Animation.DROP}}, // Eiffel Tower
    { position : {lat: -33.44049396025105, lng: -70.65419018855103}, label: { color:'blue', text : 'Texto Eiffel Tower'}, title : 'Titulo Eiffel Tower', info : 'Info xxxx', options : {animation: google.maps.Animation.DROP}}, // Eiffel Tower
    { position : {lat: -33.437915524314256, lng: -70.64706624140747}, label: { color:'blue', text : 'Texto Eiffel Tower'}, title : 'Titulo Eiffel Tower', info : 'Info xxxx', options : {animation: google.maps.Animation.DROP}}, // Eiffel Tower
  ];

  lstMarcas! : MarcaMapa[];
  
  infoContent = '';

  constructor(
    public organizacionService: OrganizacionService
    ) {
    ;
  }    

  ngOnInit() {
    /*
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    */

    this.getEntidadesRelacionadas(this.organizacion.idOrganizacion);
    //this.getEntidadesRelacionadas(1);

    this.center = {
      lat: -33.43698411475028,
      lng: -70.65073714260485,
    }

  }

  zoomIn() {
    if (this.zoom < this.maxZoom) this.zoom++;
    console.log('Get Zoom',this.map.getZoom());
  }

  zoomOut() {
    if (this.zoom > this.minZoom) this.zoom--;
  }

  eventHandler(event: any ,name:string){
    console.log(event,name);
    
    // Add marker on double click event
    if(name === 'mapDblclick'){
      this.dropMarker(event)
      console.log(this.markers);
    }
  }

  // Markers
  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  dropMarker(event:any) {
    this.markers.push({
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      label: {
        color: 'blue',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
      },
    })
  }

  openInfo(marker: MapMarker, content: string) {
    console.log('content', content);

    let entidad : number;
    //entRel
    let er : EntidadRelacionada;

    entidad = Number(content);

    console.log('Lista Entedidad Relacionadas', this.listaEntRel);

    for(let i = 0; i < this.listaEntRel.length; i++) {
      er = this.listaEntRel[i];

      if (er.idEntidadRelacionada === entidad) {
        console.log('Entidad:', er);
        this.entRel = er;
        
        //if ()
        this.responable = er.responsable[0];
        break;
      }

    }

    console.log('Ent Rel:', this.entRel);
    console.log('Responsable:', this.responable);

    //this.infoContent = content;
    //this.info.open(marker)
  }

  getEntidadesRelacionadas(idOrganizacion:number) {
    this.organizacionService.GetEntidadRelacionadaByIniciativaCampana(idOrganizacion).subscribe((data: EntidadRelacionada[]) => {
      this.listaEntRel = data;

      let m:MarcaMapa;
      let lstDir:Direccion[];
      let d:Direccion;

      this.lstMarcas = [];


      for(let i = 0; i < this.listaEntRel.length; i++) {
        lstDir = this.listaEntRel[i].direcciones;

        //console.log('Largo direcciones:',lstDir.length,'Entidad:',i);

        for(let j = 0; j < lstDir.length; j++) {
          m = new MarcaMapa();
          d = lstDir[j];

          //console.log('Loop Direcciones');

          if (typeof d !== 'undefined') {          
            console.log('Direccion:', d);

            m.position = new PositionMarca();
            m.position.lat = d.latitud;
            m.position.lng = d.longitud;
            m.label = new LabelMarca();
            m.label.color = 'blue';
            m.label.text = this.listaEntRel[i].nombre;
            m.title = this.listaEntRel[i].nombre;
            m.info = this.listaEntRel[i].idEntidadRelacionada.toString();
            m.options = new OptionsMarpa();
            m.options.animation = google.maps.Animation.DROP;

            this.lstMarcas.push(m);
          }
        }        
        console.log('Direcciones Entidades:',this.listaEntRel[i].direcciones);
        console.log('Lista Marcas:',this.lstMarcas);
      }      
      
      console.log('Entidades Relacionadas: ', this.listaEntRel);
    })    
  }
}
