import { Direccion } from "./direccion.model";
import { Responsable } from "./entidad-relacionada.model";
import { PublicoObjetivo } from "./publico-objetivo.model";

export class ProgramaProyecto {
    idProgramaProyecto!: number;
    idOrganizacion!: number;
    nombre!: string;
    email!: string;
    fechaCreacion!: string;
    fechaActivacion!: string;
    fechaTermino!: string;
    finalizada!: string;
    fechaFinalizada!: string;
    objetivo!: string;
    publicoObjetivo!: string;
    lugarGeografico!: string;
    responsable!:Responsable[];
    publicosObjetivo!: PublicoObjetivo[];
    direcciones!:Direccion[];
}