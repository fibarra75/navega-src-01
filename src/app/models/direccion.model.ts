import { Ciudad } from "./ciudad.model";
import { Comuna } from "./comuna.model";
import { Region } from "./region.model";

export class Direccion {
    idDireccion!: number;
    idComuna!: number;
    idOrganizacion!: number;
    idCiudad!: number;
    etiqueta!: string;
    calle!: string;
    numero!: string;
    block!: string;
    depto!: string;
    latitud!:number;
    longitud!:number;
    comuna!:Comuna[];
    region!:Region[];
    ciudad!:Ciudad[];
    direccionConcatenada!: string;
}
