import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';

import { Region } from '../models/region.model';
import { Comuna } from '../models/comuna.model';
import { TipoOrganizacion } from '../models/tipo-organizacion.model';
import { Ciudad } from '../models/ciudad.model';
import { PublicoObjetivo } from '../models/publico-objetivo.model';
import { AreaTrabajo } from '../models/area-trabajo.model';
import { AreaTrabajoEspecifica } from '../models/area-trabajo-especifica.model';
import { Organizacion } from '../models/organizacion.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) {
    //console.log(environment);
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };  

  /*
  GetRegiones(): Observable<Region[]> {
    return this.htt
      .get<Region[]>(this.baseurl + '/dev')
      .pipe(retry(1),catchError(this.errorHandl))
  }
  */

  GetRegiones(): Observable<Region[]> {
    return this.http
      .get<Region[]>(environment.apiURL + ApiRest.regiones)
      .pipe(retry(1),catchError(this.errorHandl))
  }

  /*
  GetComunasOriginal(): Observable<any> {
    return this.http
      .get<any>(ApiRest.comunasOri)
      .pipe(retry(1),catchError(this.errorHandl))
  }   
  */

  GetComunas(): Observable<Comuna[]> {
    return this.http
      .get<Comuna[]>(environment.apiURL + ApiRest.comunas)
      .pipe(retry(1),catchError(this.errorHandl))
  } 

  GetComunasRegion(idRegion: number): Observable<Comuna[]> {
    return this.http
      .get<Comuna[]>(environment.apiURL + ApiRest.comunasRegion + '/' + idRegion)
      .pipe(retry(1),catchError(this.errorHandl))
  }   

  GetTipoOrganizacion(): Observable<TipoOrganizacion[]> {  
    return this.http
      .get<TipoOrganizacion[]>(environment.apiURL + ApiRest.tipoOrganizacion)
      .pipe(retry(1),catchError(this.errorHandl))
  }

  GetCiudades(): Observable<Ciudad[]> {
    return this.http
      .get<Ciudad[]>(environment.apiURL + ApiRest.ciudades)
      .pipe(retry(1),catchError(this.errorHandl))
  } 

  GetPublicoObjetivo(): Observable<PublicoObjetivo[]> {
    return this.http
      .get<PublicoObjetivo[]>(environment.apiURL + ApiRest.publicoObjetivo)
      .pipe(retry(1),catchError(this.errorHandl))
  }
  
  GetAreaTrabajo(): Observable<AreaTrabajo[]> {
    return this.http
      .get<AreaTrabajo[]>(environment.apiURL + ApiRest.areaTrabajo)
      .pipe(retry(1),catchError(this.errorHandl))
  }    

  GetAreaTrabajoEspefica(): Observable<AreaTrabajoEspecifica[]> {
    return this.http
      .get<AreaTrabajoEspecifica[]>(environment.apiURL + ApiRest.areaTrabajoEsp)
      .pipe(retry(1),catchError(this.errorHandl))
  }

  GetAreaTrabajoEspeficaPorIdAreaTrabajo(idArea:number): Observable<AreaTrabajoEspecifica[]> {
    return this.http
      .get<AreaTrabajoEspecifica[]>(environment.apiURL + ApiRest.areaTrabajoEspPorIdAreaTrabajo + '/' + idArea)
      .pipe(retry(1),catchError(this.errorHandl))
  }
  
  GetOrganizaciones(): Observable<Organizacion[]> {
    return this.http
      .get<Organizacion[]>(environment.apiURL + ApiRest.organizaciones)
      .pipe(retry(1),catchError(this.errorHandl))
  } 

  GetOrganizacionesFiltros(f:Organizacion): Observable<Organizacion[]> {

    console.log('filtros:',f);
    
    return this.http
      .get<Organizacion[]>(environment.apiURL + ApiRest.organizacionesFiltroCompleto + '/' + f.idTipoOrganizacion + '/' + f.idPublicoObjetivo + '/0/0/0/0/0' + '/' + f.nombre)
      .pipe(retry(1),catchError(this.errorHandl))    
  }   

  /*
  GetOrganizacionPorId(idOrg: number): Observable<any> {
    return this.http
      .get<any>(ApiRest.organizacionesPorId + '/' + idOrg)
      .pipe(retry(1),catchError(this.errorHandl))
  }    
  */
  errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

const ApiRest = {
  regiones: '/dev/api/rgn',
  comunas: '/dev/api/cmn',
  comunasRegion: '/dev/api/cmn/idregion',
  tipoOrganizacion: '/dev/api/to',
  ciudades: '/dev/api/cdd',
  publicoObjetivo: '/dev/api/po',
  areaTrabajo: '/dev/api/at',
  areaTrabajoEsp: '/dev/api/ate',  
  areaTrabajoEspPorIdAreaTrabajo: '/dev/api/ate/atid',
  organizaciones: '/dev/api/org',
  organizacionesFiltroCompleto: '/dev/api/org/filtro'
};