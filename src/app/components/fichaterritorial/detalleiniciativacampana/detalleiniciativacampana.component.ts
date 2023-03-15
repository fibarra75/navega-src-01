import {Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntidadRelacionada } from 'src/app/models/entidad-relacionada.model';
import { Direccion } from 'src/app/models/direccion.model';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-detalleiniciativacampana',
  templateUrl: './detalleiniciativacampana.component.html',
  styleUrls: ['./detalleiniciativacampana.component.css']
})
export class DetalleiniciativacampanaComponent implements OnInit {

  data1: any;
  listaEntidadRelacionada: EntidadRelacionada[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: 
    {idIniciativaCampana: number,
    name: string,
    descripcion: string,
    fechaInicio: string,
    fechaTermino: string,
    contacto: string,
    publicoObjetivo: string,
    direcciones: Direccion[]}, public organizacionService: OrganizacionService) { }
  
    ngOnInit(): void {
      console.log("iniciativa campana",this.data)
      this.getIniciativaCampana();
    }

    getIniciativaCampana() {
      this.data1 = this.data;
      console.log("data form",this.data1)
      this.getEntidadRelacionada(this.data1.idIniciativaCampana)
    }

    getEntidadRelacionada(idIniciativaCampana:number) {
      this.organizacionService.GetEntidadRelacionadaByIniciativaCampana(idIniciativaCampana).subscribe((data: EntidadRelacionada[]) => {
        this.listaEntidadRelacionada = data;
        console.log('Listado Entidades Relacionadas: ', this.listaEntidadRelacionada);
      })    
    }

}
