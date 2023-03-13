import { Component, Input, OnInit } from '@angular/core';
import { Organizacion } from 'src/app/models/organizacion.model';
import { IniciativaCampana } from 'src/app/models/iniciativa-campana.model';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DetalleiniciativacampanaComponent } from '../detalleiniciativacampana/detalleiniciativacampana.component';

@Component({
  selector: 'app-iniciativacampana',
  templateUrl: './iniciativacampana.component.html',
  styleUrls: ['./iniciativacampana.component.css']
})
export class IniciativacampanaComponent implements OnInit {
 
  @Input() organizacion!: Organizacion;
  listaIniciativaCampana: IniciativaCampana[] = [];
  nombre!: string;
  publicoObjetivo!: string;

  constructor(
    public organizacionService: OrganizacionService, private dialog: MatDialog
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

  openModalIniciativaCampana(iniciativaCampana: IniciativaCampana) {
    this.publicoObjetivo = ''
    console.log("objeto iniciativaCampana",Object.values(iniciativaCampana.publicoObjetivo).length);
    
    iniciativaCampana.publicoObjetivo.forEach((publico,index) => {
      this.publicoObjetivo = this.publicoObjetivo + publico.nombre + ', '
      if ((index+1) === iniciativaCampana.publicoObjetivo.length) {
        this.publicoObjetivo = this.publicoObjetivo.slice(0,-2)
      }
    });

    console.log(this.publicoObjetivo)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;    
    dialogConfig.maxWidth = '85vw';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.height = '100%';
    dialogConfig.width = '100%';
    dialogConfig.panelClass = 'full-screen-modal'

    dialogConfig.data = {
      idIniciativaCampana: iniciativaCampana.idIniciativaCampana,
      nombre: iniciativaCampana.nombre,
      descripcion: iniciativaCampana.descripcion,
      fechaInicio: iniciativaCampana.fechaInicio,
      fechaTermino: iniciativaCampana.fechaTermino,
      contacto: iniciativaCampana.email,
      publicoObjetivo: this.publicoObjetivo,
      direcciones: iniciativaCampana.direccion
    };

    this.dialog.open(DetalleiniciativacampanaComponent, dialogConfig);
   
  }  

}
