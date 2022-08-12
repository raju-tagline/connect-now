import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public contactFrom!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.contactFrom = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.contactFrom.invalid) {
      return;
    }
    this.contactFrom.reset();
  }
}
