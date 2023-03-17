import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
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

  onSubmit() {
    console.log("entre")
    this.organizacionService.sendMailContactanos({
      email: this.getName(),
      name: this. getEmail(),
      message: this.getMessage()
    })
  }

  enviarContactanos() {
    this.organizacionService.sendMailContactanos({
      email: this.getName(),
      name: this. getEmail(),
      message: this.getMessage()
    })
  }

}
