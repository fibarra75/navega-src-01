import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';
import { Organizacion } from '../models/organizacion.model';
import { RrhhFinanzas } from '../models/rrhh-finanzas.model';

import { environment } from '../../environments/environment'; 
import { IniciativaCampana } from '../models/iniciativa-campana.model';
import { EntidadRelacionada } from '../models/entidad-relacionada.model';
import { ProgramaProyecto } from '../models/programa-proyecto.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };    

  GetOrganizacion(idOrganizacion: number): Observable<Organizacion[]> {
    return this.http
      .get<Organizacion[]>(environment.apiURL + ApiRest.organizacion + '/' + idOrganizacion)
      .pipe(retry(1),catchError(this.errorHandl))
  }

  GetRrhhFinanzas(idOrganizacion: number): Observable<RrhhFinanzas[]> {
    return this.http
      .get<RrhhFinanzas[]>(environment.apiURL + ApiRest.rrhhFinanzas + '/' + idOrganizacion)
      .pipe(retry(1),catchError(this.errorHandl))
  }

  GetProgramaProyectoByIdOrg(idOrganizacion: number): Observable<ProgramaProyecto[]> {
    return this.http
    .get<ProgramaProyecto[]>(environment.apiURL + ApiRest.proyectoPrograma + '/' + idOrganizacion)
    .pipe(retry(1),catchError(this.errorHandl))
  }
  
  GetIniciativaCampanaByIdOrg(idOrganizacion: number): Observable<IniciativaCampana[]> {
    return this.http
    .get<IniciativaCampana[]>(environment.apiURL + ApiRest.iniciativaCampana + '/' + idOrganizacion)
    .pipe(retry(1),catchError(this.errorHandl))
  }  

  GetEntidadRelacionadaByIniciativaCampana(idIniciativaCampana: number): Observable<EntidadRelacionada[]> {
    return this.http
    .get<EntidadRelacionada[]>(environment.apiURL + ApiRest.entidadRelacionada + '/' + idIniciativaCampana)
    .pipe(retry(1),catchError(this.errorHandl))
  }

  createOrganizacion(organizacion: any): Observable<any>{
    console.log("entre",organizacion)
    return this.http
    .post<any>(environment.apiURL + ApiRest.crearOrganizacion, organizacion, this.httpOptions)
    .pipe(retry(1),catchError(this.errorHandl))
  }
  
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
  organizacion: '/dev/api/org',
  rrhhFinanzas: '/dev/api/rrhh',
  proyectoPrograma: '/dev/api/progproy',
  iniciativaCampana: '/dev/api/inicmp',
  entidadRelacionada: '/dev/api/entrel',
  crearOrganizacion: '/dev/api/registro'
};