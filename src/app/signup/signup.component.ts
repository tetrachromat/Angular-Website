import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.required],
    });

  }

  signup(formData: NgForm) {
    // when there is an observable we subscribe
    return this.auth.signup(formData)
      // subscriber function defines how to obtain or generate values or messages to be published.
      .subscribe((user) => {
        console.log(`added user' ${JSON.stringify(user)}`);
        this.router.navigate(['login'])
      });
  }

}