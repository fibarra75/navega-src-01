import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AreaTrabajoEspecifica } from 'src/app/models/area-trabajo-especifica.model';
import { AreaTrabajo } from 'src/app/models/area-trabajo.model';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Comuna } from 'src/app/models/comuna.model';
import { Organizacion } from 'src/app/models/organizacion.model';
import { PublicoObjetivo } from 'src/app/models/publico-objetivo.model';
import { Region } from 'src/app/models/region.model';
import { TipoOrganizacion } from 'src/app/models/tipo-organizacion.model';
import { BusquedaService } from 'src/app/services/busqueda.service';

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FichaComponent } from '../ficha/ficha.component';
import { FichaterritorialComponent } from '../fichaterritorial/fichaterritorial.component';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Direccion } from 'src/app/models/direccion.model';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  listaRegion: Region[] = [];
  listaComuna: Comuna[] = [];
  listaComuna2: Comuna[] = [];
  listaTipoOrganizacion: TipoOrganizacion[] = [];
  listaCiudad: Ciudad[] = [];
  listaPublicoObjetivo: PublicoObjetivo[] = [];
  listaAreaTrabajo: AreaTrabajo[] = [];
  listaAreaTrabajoEspecifica: AreaTrabajoEspecifica[] = [];
  listaOrganizacionesTodas: Organizacion[] = [];
  listaOrganizaciones: Organizacion[] = [];
  listaOrganizacionesPadre: any[] = [];
  listaOrganizacionesHijo: Organizacion[] = [];  

  FormData!: FormGroup;

  myRegionControl = new FormControl('');
  optionsRegion: string[] = [];
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  valorOmision: string = "0";
  cargando:boolean=false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, public busquedaService: BusquedaService) { 
    this.valorOmision = "0";
  }

  ngOnInit(): void {

    this.cargando = false;
    this.FormData = this.fb.group({
      TipoOrganizacion: new FormControl('', [Validators.required]),
      PublicoObjetivo: new FormControl('', [Validators.required]),
      AreaTrabajo: new FormControl('', [Validators.required]),
      AreaTrabajoEsp: new FormControl('', [Validators.required]),      
      Region: new FormControl('', [Validators.required]),
      Comuna: new FormControl('', [Validators.required]),
      Ciudad: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', [Validators.required])
    });

    /*
    fetch('./assets/data/regiones.json').then(res => res.json())
      .then(json => {
        this.listaRegion = json;
        console.log('Lista de regiones');
        console.log(this.listaOrganizaciones);
    });
    */

    this.busquedaService.GetOrganizaciones().subscribe((data: Organizacion[]) => {
      console.log("Todas las organizaciones:",data)

      this.listaOrganizacionesTodas = data.filter((obj) => {
        return obj.aprobado === 'S';
      });
    });

    this.cagarFiltros();

    this.FormData.patchValue({TipoOrganizacion : this.valorOmision});
    this.FormData.patchValue({PublicoObjetivo : this.valorOmision});
    this.FormData.patchValue({AreaTrabajo : this.valorOmision});
    this.FormData.patchValue({AreaTrabajoEsp : this.valorOmision});
    this.FormData.patchValue({Region : this.valorOmision});
    this.FormData.patchValue({Comuna : this.valorOmision});
    this.FormData.patchValue({Ciudad : this.valorOmision});
  }

  private _filter(value: any): string[] {

    console.log('Valor:',value);

    const filterValue = value.toLowerCase();

    return this.optionsRegion.filter(option => option.toLowerCase().includes(filterValue));
  } 
  
  truncate(str:any, length:any) {
    if (str.length > 0 && str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;
  }

  cagarFiltros() {
    this.cargarTiposOrganizacion();
    this.cargarPublicoObjetivo();
    this.cargarAreaTrabajo();
    this.cargarAreaTrabajoEspecifica();
    this.cargarRegiones();
    this.cargarComunas();
    this.cargarCiudades();
  }

  cargarTiposOrganizacion() {
    this.busquedaService.GetTipoOrganizacion().subscribe((data: TipoOrganizacion[]) => {
      this.listaTipoOrganizacion = data;
      //console.log('Lista TipoOrganizacion: ', data);
    })  ;
  } 

  cargarPublicoObjetivo() {
    this.busquedaService.GetPublicoObjetivo().subscribe((data: PublicoObjetivo[]) => {
      this.listaPublicoObjetivo = data;
      //console.log('Lista Publico Objetivo: ', data);
    });
  }  

  cargarRegiones() {
    this.busquedaService.GetRegiones().subscribe((data: Region[]) => {
      this.listaRegion = data;
      //console.log('Lista Regiones: ', this.listaRegion);

      for(let i = 0; i < this.listaRegion.length; i++) {
        this.optionsRegion.push(this.listaRegion[i].nombre);
      }

      
      this.filteredOptions = this.myRegionControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );      
      /*
      this.filteredOptions = this.FormData.value.Region.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')
        ),
      );     
      */
    });  
  }

  cargarComunas() {
    this.busquedaService.GetComunas().subscribe((data: Comuna[]) => {     
      this.listaComuna = data;
      //console.log('Lista Comunas: ', this.listaComuna);
    })  
  }

  cargarCiudades() {
    this.busquedaService.GetCiudades().subscribe((data: Ciudad[]) => {
      this.listaCiudad = data;
      //console.log('Lista Ciudad: ', this.listaCiudad);
    });
  }

  cargarAreaTrabajo() {
    this.busquedaService.GetAreaTrabajo().subscribe((data: AreaTrabajo[]) => {
      this.listaAreaTrabajo = data;
      //console.log('Lista Area Trabajo: ', data);      
    });
  }

  cargarAreaTrabajoEspecifica() {
    this.busquedaService.GetAreaTrabajoEspefica().subscribe((data: AreaTrabajoEspecifica[]) => {
      this.listaAreaTrabajoEspecifica = data;
      //console.log('Lista Area Trabajo Especifica: ', this.listaAreaTrabajoEspecifica);
    });
  }  
  
  cargarComunasRegion(obj:any) {
    let idRegion : number;

    idRegion = Number(obj.value);

    this.busquedaService.GetComunasRegion(idRegion).subscribe((data: Comuna[]) => {
      this.listaComuna = data;
      //console.log('Lista Comunas x Region: ', this.listaComuna);
    });
    
    this.onChangeFiltro();
  }

  buscarOrganizaciones(f:Organizacion) {
    this.listaOrganizaciones = [];
    this.listaOrganizacionesPadre = [];
    this.listaOrganizacionesHijo = []; 

    this.busquedaService.GetOrganizacionesFiltros(f).subscribe((data: Organizacion[]) => {
      console.log("data",data)
      this.listaOrganizaciones = data;
      
      //console.log("test",this.listaOrganizaciones[0]["aprobado"])
      //console.log('Busqueda Organizaciones: ', this.listaOrganizaciones);
      this.listaOrganizaciones = data.filter((obj) => {
        return obj.aprobado === 'S';
      });

      this.agruparOrganizaciones();

      console.log("Lista Organizaciones",this.listaOrganizaciones);
      
      //console.log('Busqueda Organizaciones: ', this.listaOrganizaciones);
      //console.log('Busqueda Organizaciones Group: ', this.listaOrganizacionesPadre);

      this.cargando = false;
    });
  }  

  agruparOrganizaciones() {
    let j : number = 1;

    this.listaOrganizacionesPadre = [];
    console.log("Cant de Organizaciones para agrupar",this.listaOrganizaciones.length);
    console.log("ONG Filtradas",this.listaOrganizaciones);

    for(let i = 0; i < this.listaOrganizaciones.length; i++) {
      //console.log('i:',i);
      this.listaOrganizacionesHijo.push(this.listaOrganizaciones[i]);

      //console.log('Array de dos:',this.listaOrganizacionesHijo);
    
      //console.log('j:',j);
      if (j > 0 && j % 2 == 0) {
        //console.log('j%2:',i);
        this.listaOrganizacionesPadre.push(this.listaOrganizacionesHijo);
        this.listaOrganizacionesHijo = [];
      }
      j++;
    }
    
    if (this.listaOrganizacionesHijo.length > 0) {
      this.listaOrganizacionesPadre.push(this.listaOrganizacionesHijo);
      this.listaOrganizacionesHijo = [];        
    }    
  }

  onSubmit() {      
    console.log('filtros:',this.FormData.value);

    this.cargando = true;
    
    let f = new Organizacion;

    f.idTipoOrganizacion = this.FormData.value.TipoOrganizacion;
    f.idPublicoObjetivo = this.FormData.value.PublicoObjetivo;
    f.idAreaTrabajo = this.FormData.value.AreaTrabajo;
    f.idAreaTrabajoSub = this.FormData.value.AreaTrabajoEsp;
    f.nombre = this.FormData.value.Nombre;

    console.log('filtros:',f);

    this.buscarOrganizaciones(f);   
  }
  
  openModalFicha(organizacion: Organizacion) {

    console.log('Organizacion',organizacion);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;    
    dialogConfig.maxWidth = '85vw';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.height = '100%';
    dialogConfig.width = '100%';
    dialogConfig.panelClass = 'full-screen-modal'

    dialogConfig.data = {
      idOrganizacion: organizacion.idOrganizacion,
      nombre: organizacion.nombre
    };

    if (organizacion.territorial == 'N') {
      this.dialog.open(FichaComponent, dialogConfig);
    } else {
      this.dialog.open(FichaterritorialComponent, dialogConfig);
    } 
  }  

  onTipoOrgChange (ob:any) {
    console.log('ob',ob);
    let valor:number;

    this.listaOrganizaciones = [];

    if (ob.value > 0) {
      valor = Number(ob.value)
      this.listaOrganizaciones = this.listaOrganizacionesTodas.filter((obj) => {
        return obj.idTipoOrganizacion === valor;
      });

      this.agruparOrganizaciones();
    }

    console.log("Lista Organizaciones",this.listaOrganizaciones);
  }

  onChangeFiltro () {
    console.log('filtros:',this.FormData.value);

    let f = new Organizacion;

    /*
    if (this.FormData.value.TipoOrganizacion > 0)
      f.idTipoOrganizacion = this.FormData.value.TipoOrganizacion;
    */
    f.idTipoOrganizacion = this.FormData.value.TipoOrganizacion;
    f.idPublicoObjetivo = this.FormData.value.PublicoObjetivo;
    f.idAreaTrabajo = this.FormData.value.AreaTrabajo;
    f.idAreaTrabajoSub = this.FormData.value.AreaTrabajoEsp;
    
    let di:Direccion;
    let re:Region;
    let co:Comuna;
    let ci:Ciudad;

    di = new Direccion();
    re = new Region();
    co = new Comuna();
    ci = new Ciudad();

    f.direcciones = [];  
    
    re.idRegion = Number(this.FormData.value.Region);
    di.region = [];
    di.region.push(re);

    co.idComuna = Number(this.FormData.value.Comuna);
    di.comuna = [];    
    di.comuna.push(co);

    ci.idCiudad = Number(this.FormData.value.Ciudad);
    di.ciudad = [];
    di.ciudad.push(ci);

    f.direcciones.push(di);
    
    f.nombre = this.FormData.value.Nombre;
    
    /*
    this.listaOrganizaciones = this.listaOrganizacionesTodas.filter((obj) => {
      return obj.idTipoOrganizacion === f.idTipoOrganizacion
             && (f.idPublicoObjetivo === 0 || obj.idPublicoObjetivo === f.idPublicoObjetivo);
    });
    */

    console.log('filtros busqueda:',f);

    this.listaOrganizaciones = this.listaOrganizacionesTodas.filter((obj) => {
      return this.validarFiltro(obj,f);
    });

    this.agruparOrganizaciones();
  }

  validarFiltro(obj: Organizacion, f: Organizacion) {
    let ack :boolean = true;

    if (f.idTipoOrganizacion > 0) {
      if (obj.idTipoOrganizacion !== f.idTipoOrganizacion) {
        ack = false;
        return ack;
      }
    }

    if (f.idPublicoObjetivo > 0) {
      if (obj.idPublicoObjetivo !== f.idPublicoObjetivo) {
        ack = false;
        return ack;
      }
    }

    if (f.idAreaTrabajo > 0) {
      if (obj.idAreaTrabajo !== f.idAreaTrabajo) {
        ack = false;
        return ack;
      }
    }

    if (f.idAreaTrabajoSub > 0) {
      if (obj.idAreaTrabajoSub !== f.idAreaTrabajoSub) {
        ack = false;
        return ack;    
      }
    }

    
    let dir : Direccion[];    
    let dirf:Direccion;
    let ref: Region;
    let cof: Comuna;
    let cif: Ciudad;

    dir = obj.direcciones;

    console.log('direccion filtro:',dir);

    dirf = f.direcciones[0];
    ref = dirf.region[0];
    cof = dirf.comuna[0];
    cif = dirf.ciudad[0];

    let r: Region;

    if (ref.idRegion > 0) {
      ack = false;
      for(let i = 0; i < dir.length; i++) {      
        r = dir[i].region[0];

        if (ref.idRegion > 0) {
          if (r.idRegion === ref.idRegion) {
            ack = true;
            break;
          }
        }
      }
    }

    if (!ack) {
      console.log('Filtro region NOK');
      return ack;
    }

    ack = true;

    let c: Comuna;

    if (cof.idComuna > 0) {
      ack = false;
      for(let i = 0; i < dir.length; i++) {
        c= dir[i].comuna[0];

        if (cof.idComuna > 0) {
          if (c.idComuna === cof.idComuna) {
            ack = true;
            break;
          }
        }
      }
    }

    if (!ack) {
      console.log('Filtro comuna NOK');
      return ack;
    }

    ack = true;

    let ci: Ciudad;    

    if (cif.idCiudad > 0) {
      ack = false;
      for(let i = 0; i < dir.length; i++) {
      
        if (dir[i].comuna.length > 0) {
          ci= dir[i].ciudad[0];

          if (cif.idCiudad > 0) {
            if (ci.idCiudad === cif.idCiudad) {
              ack = true;
              break;
            }
          }
        }
      }
    }

    if (!ack) {
      console.log('Filtro ciudad NOK');
      return ack;
    }
    
    if (Boolean(f.nombre)) {
      ack = false;
      console.log('Buscando nombre');
      if (obj.nombre.includes(f.nombre)) {
        ack = true;
      }
    }

    console.log('Llegue al final:', ack);
    return ack;
  }

  limpiarFiltros() {

    console.log('Limpiando filtros');

    this.FormData.get("TipoOrganizacion")?.patchValue('0');
    this.FormData.get("PublicoObjetivo")?.patchValue('0');
    this.FormData.get("AreaTrabajo")?.patchValue('0');
    this.FormData.get("AreaTrabajoEsp")?.patchValue('0');
    this.FormData.get("Region")?.patchValue('0');
    this.FormData.get("Comuna")?.patchValue('0');
    this.FormData.get("Ciudad")?.patchValue('0');
    this.FormData.get("Nombre")?.patchValue('');

    this.listaOrganizacionesPadre = [];
  }

}
