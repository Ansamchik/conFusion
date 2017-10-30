import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phone = '[\+][0-9() ]{7,}$';
  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: ['' , [Validators.required, Validators.pattern(this.phone)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.pureEmail)]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
    });
  }

}
