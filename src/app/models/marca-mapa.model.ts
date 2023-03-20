export class MarcaMapa {
    position!:PositionMarca;
    label!:LabelMarca;
    title!:string;
    info!:string;
    options!:OptionsMarpa;
}

export class PositionMarca {
    lat!:number;
    lng!:number;
}

export class LabelMarca {
    color!:string;
    text!:string;    
}

export class OptionsMarpa {
    animation!:number;
}