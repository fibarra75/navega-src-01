import { AreaTrabajoEspecifica } from "./area-trabajo-especifica.model";
import { AreaTrabajo } from "./area-trabajo.model";
import { PublicoObjetivo } from "./publico-objetivo.model";

export class Organizacion {
    idOrganizacion!: number;
    idTipoOrganizacion!: number;
    idAreaTrabajo!: number;
    idAreaTrabajoSub!: number;
    idPublicoObjetivo!: number;
    rut!: string;
    nombre!: string;
    fechaFundacion!: string;
    web!: string;
    mision!: string;
    descripcion!: string;
    fecu!: string;
    fechaActualizacion!: string;
    aprobado!: string;
    territorial!: string;
    email!: string;
    idOrganizacionPadre!: number;
    facebook!: string;
    twitter!: string;
    instagram!: string;
    areaTrabajo!: AreaTrabajo;
    areaTrabajoEspecifica!: AreaTrabajoEspecifica;
    publicoObjetivo!: PublicoObjetivo;

}
