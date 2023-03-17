import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  FormData!: FormGroup;
  nombre = new FormControl('');

  constructor(private builder: FormBuilder, public organizacionService: OrganizacionService) { }

  ngOnInit() {
    this.FormData = this.builder.group({
    Fullname: new FormControl('', [Validators.required]),
    //Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
    Email: new FormControl('', [Validators.required]),
    Comment: new FormControl('', [Validators.required])
    })
  }

  getName() {
    return this.FormData.get('Fullname')!.value
  }

  getEmail() {
    return this.FormData.get('Email')!.value
  }

  getMessage() {
    return this.FormData.get('Comment')!.value
  }

  onSubmit(FormData:any) {
    console.log(FormData)
    //Se envía el correo al administrador de Navega Social con la información del usuario
    this.organizacionService.sendMailContactanos({
      email: this. getEmail(),
      name: this.getName(),
      message: this.getMessage()
    })

    //Se envía el correo al usuario informándole que pronto sera atendido
    this.organizacionService.sendMail({
      email: this.getEmail(),
      name: this.getName(),
      texto: ", gracias por tu interés en Navegasocial, recibimos tu correo y uno de nuestros asesores gestionará tu consulta. Pronto te contactaremos!",
      asunto: "Contáctanos"
    })

  }
}
