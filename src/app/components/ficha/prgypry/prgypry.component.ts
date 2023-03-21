import { Component, Input, OnInit } from '@angular/core';
import { Direccion } from 'src/app/models/direccion.model';
import { Responsable } from 'src/app/models/entidad-relacionada.model';
import { Organizacion } from 'src/app/models/organizacion.model';
import { ProgramaProyecto } from 'src/app/models/programa-proyecto.model';
import { PublicoObjetivo } from 'src/app/models/publico-objetivo.model';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-prgypry',
  templateUrl: './prgypry.component.html',
  styleUrls: ['./prgypry.component.css']
})
export class PrgypryComponent implements OnInit {
  listaPrgPry!: ProgramaProyecto[]
  prgPryResp!: ProgramaProyecto;
  listaResponsable!:Responsable[];
  listaDirecciones!:Direccion[];
  listaPublicoObj!:PublicoObjetivo[];


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
    this.organizacionService.GetProgramaProyectoByIdOrg(idOrganizacion).subscribe((data: ProgramaProyecto[]) => {
      this.listaPrgPry = data;
      console.log('Lista Proyectos: ', this.listaPrgPry);
    })    
  }

  getOrganzacionId(prgPry: ProgramaProyecto) {
    this.organizacionService.GetProgramaProyectoByIdOrg(prgPry.idOrganizacion).subscribe((data: ProgramaProyecto[]) => {
      this.listaPrgPry = data;

      var p;
      
      for(let i = 0; i < this.listaPrgPry.length; i++) {

        p = this.listaPrgPry[i];

        console.log('ID:',prgPry.idProgramaProyecto,'ID Prg:',p.idProgramaProyecto);

        if (p.idProgramaProyecto == prgPry.idProgramaProyecto) {
          console.log('Programa encontrado',p);
          this.prgPryResp = p;
          this.listaDirecciones = p.direcciones;
          this.listaResponsable = p.responsable;
          this.listaPublicoObj = p.publicosObjetivo;
        }
      }
    }) 

  }

  mostrarPrgPry(prgPry: ProgramaProyecto) {
    this.getOrganzacionId(prgPry);
  }
}
