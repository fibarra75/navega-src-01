import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'displayNombre'
  })
export class DisplayNombrePipe implements PipeTransform {

    transform(value: any, largo:number=15): string {
      return value.toString().substring(0,largo);
    }  
}