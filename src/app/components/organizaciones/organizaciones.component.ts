import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.css']
})
export class OrganizacionesComponent {
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
    nombreOrgCtrl: ['', Validators.required],
    tipoOrgCtrl: ['', Validators.required],
    rutOrgCtrl: ['', Validators.required],
    telOrgCtrl: ['', Validators.required],
    dirOrgCtrl: ['', Validators.required],
    representanteOrgCtrl: ['', Validators.required],
    sitioWebOrgCtrl: ['', Validators.required],
  });
  
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
