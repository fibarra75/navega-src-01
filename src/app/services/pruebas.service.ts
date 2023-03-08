import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {

  constructor(private http: HttpClient) {}

  test() {
    return this.http.get<any>('https://0zgsvc21wk.execute-api.us-east-1.amazonaws.com/test').toPromise();
    //return this.http.get<any>(environment.apiURL + ApiRest.regiones).toPromise();    
  }

}

const ApiRest = {
  regiones: '/dev/api/rgn',
};
