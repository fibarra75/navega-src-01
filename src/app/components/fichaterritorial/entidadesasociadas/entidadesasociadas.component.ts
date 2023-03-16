import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Organizacion } from 'src/app/models/organizacion.model';

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
  
  infoContent = ''

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });

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
    this.infoContent = content;
    this.info.open(marker)
  }
}
