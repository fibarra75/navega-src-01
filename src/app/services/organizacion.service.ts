import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';
import { Organizacion } from '../models/organizacion.model';
import { RrhhFinanzas } from '../models/rrhh-finanzas.model';

import { environment } from '../../environments/environment';


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
  rrhhFinanzas: '/dev/api/rrhh'
};