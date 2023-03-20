import { Component, Input, OnInit } from '@angular/core';
import { Organizacion } from 'src/app/models/organizacion.model';
import { RrhhFinanzas } from 'src/app/models/rrhh-finanzas.model';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rrhhfinanzas',
  templateUrl: './rrhhfinanzas.component.html',
  styleUrls: ['./rrhhfinanzas.component.css']
})
export class RrhhfinanzasComponent implements OnInit {

  rrhhFinanzasResp!: RrhhFinanzas;
  @Input() organizacion!: Organizacion;
  rrhhDocumentos!: any[]

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
      this.rrhhDocumentos = data[0].archivos
      console.log("🚀 ~ file: rrhhfinanzas.component.ts:35 ~ RrhhfinanzasComponent ~ this.organizacionService.GetRrhhFinanzas ~ this.rrhhDocumentos:", this.rrhhDocumentos)
      console.log('RRHH Resp: ', this.rrhhFinanzasResp);
    })
  }

  getDocument(idOrganizacion: number, filename: string) {
    this.organizacionService.GetRrhhDocumentos(idOrganizacion, filename).subscribe((data: any) => {
      var link = document.createElement('a');
      link.href = 'data:application/octet-stream;base64,' + data;
      link.download = filename;
      link.click();
    })
  }

}


