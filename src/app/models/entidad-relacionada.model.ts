import { Direccion } from "./direccion.model";

export class EntidadRelacionada {
    idEntidadRelacionada!: number;
    idIniciativaCampana!: number;
    idTipoEntidad!: number;
    nombre!: string;
    email!: string;
    telefono!: string;
    tipoEntidad!:TipoEntidad;
    idOrganizacion!: number;
    direcciones!: Direccion[];
    responsable!: Responsable[];
}

export class TipoEntidad {
    idTipoEntidad!:number;
    nombre!:string;
}

export class Responsable {
    idPersona!:number;
    nombre!:string;
    apaterno!:string;
    amaterno!:string;
    email!:string;
    telefono!:string;
}
