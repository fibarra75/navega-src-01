import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Organizacion } from 'src/app/models/organizacion.model';

import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  organizacion!: Organizacion;
  organizacionResp: Organizacion | undefined;
  lstOrg: Organizacion[] = [];
  nombre!: string;

  constructor(
    //private fb: FormBuilder,
    private dialogRef: MatDialogRef<FichaComponent>,
    public organizacionService: OrganizacionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.organizacion = data;
 }  

  ngOnInit(): void {
    console.log('Organizacion:',this.organizacion);

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

  close() {
    this.dialogRef.close();
  }  

}
