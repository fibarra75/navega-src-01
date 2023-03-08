import { Component, Input, OnInit } from '@angular/core';
import { Organizacion } from 'src/app/models/organizacion.model';
import { RrhhFinanzas } from 'src/app/models/rrhh-finanzas.model';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-rrhhfinanzas',
  templateUrl: './rrhhfinanzas.component.html',
  styleUrls: ['./rrhhfinanzas.component.css']
})
export class RrhhfinanzasComponent implements OnInit {

  rrhhFinanzasResp!: RrhhFinanzas;
  @Input() organizacion!: Organizacion;

  constructor(
    public organizacionService: OrganizacionService
    ) {

    ;
  } 

  ngOnInit(): void {
    console.log('Input Organizacion:',this.organizacion);

    //this.lstOrg = await this.organizacionService.GetOrganizacion(this.organizacion.idOrganizacion);
    this.getOrganzacion(this.organizacion.idOrganizacion);
  }

  getOrganzacion(idOrganizacion:number) {
    this.organizacionService.GetRrhhFinanzas(idOrganizacion).subscribe((data: RrhhFinanzas[]) => {
      this.rrhhFinanzasResp = data[0];
      console.log('RRHH Resp: ', this.rrhhFinanzasResp);
    })    
  }
}  


