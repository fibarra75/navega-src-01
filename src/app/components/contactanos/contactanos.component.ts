import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
  FormData!: FormGroup;
  nombre = new FormControl('');

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.FormData = this.builder.group({
    Fullname: new FormControl('', [Validators.required]),
    //Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
    Email: new FormControl('', [Validators.required]),
    Comment: new FormControl('', [Validators.required])
    })
  }

  onSubmit(FormData:any) {
    console.log(FormData)
  }

}
