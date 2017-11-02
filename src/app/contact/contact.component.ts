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
  phone = '[\+]?[0-9() ]{5,}$';
  name = '[a-zA-Z]{1,}'

  formErrors = {
      'firstname': '',
      'lastname': '',
      'telnum': '',
      'email': ''
  };

  validationMessages = {
      'firstname': {
          'required':      'First Name is required.',
          'minlength':     'First Name must be at least 2 characters long.',
          'maxlength':     'First Name cannot be more than 25 characters long.',
          'pattern':       'Please, use characters only!'
      },
      'lastname': {
          'required':      'Last Name is required.',
          'minlength':     'Last Name must be at least 2 characters long.',
          'maxlength':     'Last Name cannot be more than 25 characters long.',
          'pattern':       'Please, use characters only!'
      },
      'telnum': {
          'required':      'Tel. number is required.',
          'pattern':       'Tel. number must contain only numbers.'
      },
      'email': {
          'required':      'Email is required.',
          'email':         'Email not in valid format.',
          'pattern':       'Please, check the e-mail address'
      }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(this.name)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(this.name)]],
      telnum: ['' , [Validators.required, Validators.pattern(this.phone)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.pureEmail)]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // re(set) form validation messages
  }

  onValueChanged(data?: any) {
      if (!this.feedbackForm) {
          return;
      }
      const form = this.feedbackForm;

      for (const field in this.formErrors) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                  this.formErrors[field] += messages[key] + ' ';
              }
          }
      }
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
