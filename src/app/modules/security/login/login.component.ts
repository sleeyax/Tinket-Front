import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  loginForm = this.fb.group({
    email: new FormControl('test@example.com', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('password', Validators.compose([
      Validators.required
    ]))
  });

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          if (!data.representsCompany && !data.isMaker && !data.isAdmin) {
            this.router.navigate(["onboarding"]);
          }
          else if(!data.isAdmin){
            this.router.navigate(["discover"]);
          } else if(data.isAdmin){
            this.router.navigate(["mod/Users"]);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  Back() {
    this.router.navigate([""])
  }

  Login() {
    this.router.navigate(["onboarding"])
  }
}
