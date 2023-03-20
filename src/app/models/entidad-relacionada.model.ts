import { Direccion } from "./direccion.model";

export class EntidadRelacionada {
    idEntidadRelacionada!: number;
    idIniciativaCampana!: number;
    idTipoEntidad!: number;
    nombre!: string;
    email!: string;
    telefono!: string;
    idOrganizacion!: number;
    direcciones!: Direccion[];
}
