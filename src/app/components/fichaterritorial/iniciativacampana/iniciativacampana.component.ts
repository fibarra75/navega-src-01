import { Component, Input, OnInit } from '@angular/core';
import { Organizacion } from 'src/app/models/organizacion.model';
import { IniciativaCampana } from 'src/app/models/iniciativa-campana.model';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-iniciativacampana',
  templateUrl: './iniciativacampana.component.html',
  styleUrls: ['./iniciativacampana.component.css']
})
export class IniciativacampanaComponent implements OnInit {
 
  @Input() organizacion!: Organizacion;
  listaIniciativaCampana: IniciativaCampana[] = [];
  nombre!: string;

  constructor(
    public organizacionService: OrganizacionService
    ) {;}

  ngOnInit(): void {
    console.log('Input Organizacion Iniciativa Campaña:',this.organizacion);
    console.log("yo entre")
    this.nombre = this.organizacion.nombre;
    this.getIniciativaCampana(this.organizacion.idOrganizacion);
  }

  getIniciativaCampana(idOrganizacion:number) {
    this.organizacionService.GetIniciativaCampanaByIdOrg(idOrganizacion).subscribe((data: IniciativaCampana[]) => {
      this.listaIniciativaCampana = data;
      console.log('Listado Iniciativa Campaña: ', this.listaIniciativaCampana);
    })    
  }

  truncate(str:any, length:any) {
    if (str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;
  }

}
