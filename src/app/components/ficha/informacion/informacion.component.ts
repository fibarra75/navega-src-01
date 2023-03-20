import { Component, Inject, Input, OnInit } from '@angular/core';
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

  @Input() organizacion!: Organizacion;

  constructor(
    public organizacionService: OrganizacionService
    ) {
    ;
  }   

  ngOnInit(): void {
    this.cargando = true;
    console.log('Input Organizacion:',this.organizacion);

    this.nombre = this.organizacion.nombre;

    //this.lstOrg = await this.organizacionService.GetOrganizacion(this.organizacion.idOrganizacion);
    this.getOrganzacion(this.organizacion.idOrganizacion);
  }

  getOrganzacion(idOrganizacion:number) {
    this.organizacionService.GetOrganizacion(idOrganizacion).subscribe((data: Organizacion[]) => {
      this.organizacionResp = data[0];
      this.cargando = false
      console.log('Organizacion_Resp: ', this.organizacionResp);
      console.log("direcciones", this.organizacionResp.direcciones)
    })    
  }
}
