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
  @Input() organizacion!: Organizacion;

  constructor(
    public organizacionService: OrganizacionService
    ) {

    ;
  }   

  ngOnInit(): void {
    console.log('Input Organizacion:',this.organizacion);

    this.nombre = this.organizacion.nombre;

    //this.lstOrg = await this.organizacionService.GetOrganizacion(this.organizacion.idOrganizacion);
    this.getOrganzacion(this.organizacion.idOrganizacion);
  }

  getOrganzacion(idOrganizacion:number) {
    this.organizacionService.GetOrganizacion(idOrganizacion).subscribe((data: Organizacion[]) => {
      this.organizacionResp = data[0];
      console.log('Organizacion Resp: ', this.organizacionResp);
    })    
  }
}
