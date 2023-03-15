import { PublicoObjetivo } from "./publico-objetivo.model";
import { Direccion } from "./direccion.model";

export class IniciativaCampana {
    idIniciativaCampana!: number;
    idOrganizacion!: number;
    nombre!: string;
    email!: string;
    fechaInicio!: string;
    fechaTermino!: string;
    descripcion!: string;
    publicoObjetivo!: PublicoObjetivo[];
    direcciones!: Direccion[];
}
