import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../shared/comment';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

    commentForm: FormGroup;
    comment: Comment;
    dish: Dish;
    dishIds: number[];
    prev: number;
    next: number;

    formErrors = {
        'author': '',
        'comment': '',
    };

    validationMessages = {
        'author': {
            'required':      'Author Name is required.',
            'minlength':     'First Name must be at least 2 characters long.',
        },
        'comment': {
            'required':      'Comment is required.',
        }
    };

  constructor(private dishservice: DishService,
  private route: ActivatedRoute,
  private location: Location,
  private fb: FormBuilder,
  @Inject('BaseURL') private BaseURL) {
      this.createForm();
  }

  ngOnInit() {
      this.dishservice.getDishIds()
          .subscribe(dishIds => this.dishIds = dishIds);

      this.route.params
          .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
          .subscribe(dish => {
              this.dish = dish;
              this.setPrevNext(dish.id);
          });
  }

  createForm() {
      this.commentForm = this.fb.group({
          author: ['', [Validators.required, Validators.minLength(2)]],
          rating: '5',
          comment: ['', Validators.required]
      });

      this.commentForm.valueChanges
          .subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // re(set) form validation messages
  }

    onValueChanged(data?: any) {
        if (!this.commentForm) {
            return;
        }
        const form = this.commentForm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                console.log(control, field);
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    onSubmit() {
        this.comment = this.commentForm.value;
        this.comment['date'] = String(Date.now());
        this.dish.comments.push(this.comment);
        this.commentForm.reset({
            author: '',
            rating: '5',
            comment: ''
        });
    }

  setPrevNext(dishId: number) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
      this.location.back();
  }

}
