import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.css']
})
export class OrganizacionesComponent implements OnInit {
  
  firstFormGroup = this._formBuilder.group({
    nombreCtrl: ['', Validators.required],
    aPaternoCtrl: ['', Validators.required],
    aMaternoCtrl: ['', Validators.required],
    rutCtrl: ['', Validators.required],
    cargoCtrl: ['', Validators.required],
    celularCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
    passwdCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    nombreOrgCtrl: ['', Validators.required],
    tipoOrgCtrl: ['', Validators.required],
    rutOrgCtrl: ['', Validators.required],
    telOrgCtrl: ['', Validators.required],
    dirOrgCtrl: ['', Validators.required],
    representanteOrgCtrl: ['', Validators.required],
    sitioWebOrgCtrl: ['', Validators.required],
  });
  tercerFormGroup = this._formBuilder.group({
    
  });
  
  isLinear = false;
  nombre!: string;

  constructor(private _formBuilder: FormBuilder, public organizacionService: OrganizacionService) {;}

  ngOnInit(): void {
    console.log("nombre",this.firstFormGroup.get('nombreCtrl')!.value)
  }

  getNombre() {
    console.log(this.firstFormGroup.get('nombreCtrl'))
    return this.firstFormGroup.get('nombreCtrl')!.value
  }

  getPaterno() {
    return this.firstFormGroup.get('aPaternoCtrl')!.value
  }

  getMaterno() {
    return this.firstFormGroup.get('aMaternoCtrl')!.value
  }

  getRUT() {
    return this.firstFormGroup.get('rutCtrl')!.value
  }

  getCargo() {
    return this.firstFormGroup.get('cargoCtrl')!.value
  }

  getTelefono() {
    return this.firstFormGroup.get('celularCtrl')!.value
  }

  getEmail() {
    return this.firstFormGroup.get('emailCtrl')!.value
  }

  getPassword() {
    return this.firstFormGroup.get('passwdCtrl')!.value
  }

  getNombreOrganizacion() {
    return this.secondFormGroup.get('nombreOrgCtrl')!.value
  }

  getTipoOrganizacion() {
    return this.secondFormGroup.get('tipoOrgCtrl')!.value
  }

  getRutOrganizacion() {
    return this.secondFormGroup.get('rutOrgCtrl')!.value
  }

  getTelefonoOrganizacion() {
    return this.secondFormGroup.get('telOrgCtrl')!.value
  }

  getDireccion() {
    return this.secondFormGroup.get('dirOrgCtrl')!.value
  }

  getRepresentante() {
    return this.secondFormGroup.get('representanteOrgCtrl')!.value
  }

  createOrganizacion() {
    this.organizacionService.createOrganizacion({
      "nombre": this.getNombre(),
	    "paterno": this.getPaterno(),
	    "materno": this.getMaterno(),
	    "rut": this.getRUT(),
	    "cargo": this.getCargo(),
	    "telefono": this.getTelefono(),
	    "email": this.getEmail(),
	    "password": this.getPassword(),
	    "nombreorg": this.getNombreOrganizacion(),
	    "tipoorg": this.getTipoOrganizacion(),
	    "rutorg": this.getRutOrganizacion(),
	    "telefonoorg": this.getTelefonoOrganizacion(),
	    "direccion": this.getDireccion(),
	    "representante": this.getRepresentante()
    } as any).subscribe(response => {
      console.log("resultado",response)
    })
  }

}
