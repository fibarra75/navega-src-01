import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import Swal from 'sweetalert2';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { TipoOrganizacion } from 'src/app/models/tipo-organizacion.model';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Comuna } from 'src/app/models/comuna.model';
import { Region } from 'src/app/models/region.model';

@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.css']
})
export class OrganizacionesComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    nombreCtrl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$')]],
    aPaternoCtrl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$')]],
    aMaternoCtrl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$')]],
    rutCtrl: ['', [Validators.required, Validators.maxLength(10), this.validarRut]],
    cargoCtrl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$')]],
    celularCtrl: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]*$/)]],
    emailCtrl: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
    passwdCtrl: ['', [Validators.required, Validators.minLength(8), Validators.pattern("'/^[0-9]+$/'")]],
  });
  secondFormGroup = this._formBuilder.group({
    nombreOrgCtrl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$')]],
    tipoOrgCtrl: ['', [Validators.required]],
    rutOrgCtrl: ['', [Validators.required, Validators.maxLength(10), this.validarRut]],
    telOrgCtrl: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]*$/)]],
    representanteOrgCtrl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$')]],
    regionOrgCtrl: [[Validators.required]],
    comunaOrgCtrl: [[Validators.required]],
    ciudadOrgCtrl: [[Validators.required]],
    calleOrgCtrl:  ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$')]],
    numeroOrgCtrl: ['', [Validators.required, Validators.pattern('/^[0-9]+$/')]],
    sitioWebOrgCtrl: ['', [Validators.required, Validators.pattern("/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i")]],
  });
  tercerFormGroup = this._formBuilder.group({

  });

  isLinear = false;
  nombre!: string;
  listaTipoOrganizacion: TipoOrganizacion[] = [];
  listaRegion: Region[] = [];
  listaComuna: Comuna[] = [];
  listaCiudad: Ciudad[] = [];
  submitted = false;
  file!: File;
  file2!: File;
  mostrarCertificado: boolean = false;
  mostrarCarta: boolean = false;


  constructor(private _formBuilder: FormBuilder, public organizacionService: OrganizacionService,
    public busquedaService: BusquedaService) {;}

  ngOnInit(): void {
    console.log("nombre",this.firstFormGroup.get('nombreCtrl')!.value)
    this.cargarCombos()
  }

  get f() { return this.firstFormGroup.controls }

  cargarCombos() {
    this.cargarRegiones();
    this.cargarTiposOrganizacion();
    this.cargarCiudades()
  }

  cargarRegiones() {
    this.busquedaService.GetRegiones().subscribe((data: Region[]) => {
      this.listaRegion = data;
      console.log('Lista Regiones: ', this.listaRegion);
    });
  }

  cargarComunasRegion(obj:any) {
    let idRegion : number;
    idRegion = Number(obj.value);

    this.busquedaService.GetComunasRegion(idRegion).subscribe((data: Comuna[]) => {
      this.listaComuna = data;
      console.log('Lista Comunas x Region: ', this.listaComuna);
    })
  }

  cargarCiudades() {
    this.busquedaService.GetCiudades().subscribe((data: Ciudad[]) => {
      this.listaCiudad = data;
      console.log('Lista Ciudad: ', this.listaCiudad);
    });
  }

  cargarTiposOrganizacion() {
    this.busquedaService.GetTipoOrganizacion().subscribe((data: TipoOrganizacion[]) => {
      this.listaTipoOrganizacion = data;
      console.log('Lista TipoOrganizacion: ', data);
    })  ;
  }

  validarNombre() {
    console.log("entro")
    if (this.firstFormGroup.get('nombreCtrl')?.errors?.['required']) {
      Swal.fire("Navega Social","el nombre es requerido", "warning");
    }
  }

  validarRut(control: AbstractControl) {
    const rut = control.value;
    // Eliminar puntos y guión
    const rutLimpio = rut.replace(/\./g, '').replace('-', '');

    // Validar que el RUT tenga un formato válido
    const regex = /^[0-9]+[0-9kK]{1}$/;
    if (!regex.test(rutLimpio)) {
      return { rutInvalido: true };
    }

    // Validar el dígito verificador
    let suma = 0;
    const rutSinDv = parseInt(rutLimpio.slice(0, -1), 10);
    const dv = rutLimpio.slice(-1).toLowerCase();
    for (let i = 0; i < rutSinDv.toString().length; i++) {
      suma += parseInt(rutSinDv.toString().charAt(i), 10) * (9 - (i % 6));
    }
    const dvCalculado = (11 - (suma % 11)).toString();
    const dvEsK = dvCalculado === '10' ? 'k' : dvCalculado;
    if (dv !== dvEsK) {
      console.log('%cerror','background: red');

      return { rutInvalido: true };
    }

    // Si llega hasta aquí, el RUT es válido
    return null;
  }

  onChangeCertificado(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
    this.mostrarCertificado = true;
  }

  onChangeCarta(event: any) {
    this.file2 = event.target.files[0];
    console.log(this.file2)
    this.mostrarCarta = true;
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

  getComuna() {
    return this.secondFormGroup.get('comunaOrgCtrl')!.value
  }

  getCiudad() {
    return this.secondFormGroup.get('ciudadOrgCtrl')!.value
  }

  getCalle() {
    return this.secondFormGroup.get('calleOrgCtrl')!.value
  }

  getNumero() {
    return this.secondFormGroup.get('numeroOrgCtrl')!.value
  }

  getRepresentante() {
    return this.secondFormGroup.get('representanteOrgCtrl')!.value
  }

  getSitioWeb() {
    return this.secondFormGroup.get('sitioWebOrgCtrl')!.value
  }

  createOrganizacion() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
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
        "calle": this.getCalle(),
        "numero": this.getNumero(),
        "idComuna": this.getComuna(),
        "idCiudad": this.getCiudad(),
        "representante": this.getRepresentante(),
        "sitio": this.getSitioWeb()
      } as any).subscribe(response => {
        console.log("resultado",response)
        if (response.idOrganizacion != null) {
          Swal.fire("Navega Social","La organización se registró con éxito", "success");
          //se envía el correo a la organización
          this.organizacionService.sendMail({
            email: this.getEmail(),
            name: this.getNombre()+" "+this.getPaterno(),
            texto: ", su solicitud de registro ha sido recepcionada correctamente, se enviara una respuesta a su solicitud dentro de las próximas 72 horas.",
            asunto: "Solicitud de Registro"
          })
          //Se sube el certificado digital
          this.organizacionService.unloadCertificado(this.file, response.idOrganizacion, this.file.name)
          //Se sube la carta de intención
          this.organizacionService.unloadCartaIntencion(this.file2, response.idOrganizacion, this.file2.name)
        } else {
          Swal.fire("Navega Social","ocurrió un error inesperado, por favor intente de nuevo", "warning");
        }
      })
    } else {
      Swal.fire("Navega Social","por favor, revise los errores de validación del formulario e intente de nuevo", "warning");
    }
    
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.firstFormGroup.invalid) {
      return;
  }
  }

}
