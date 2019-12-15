import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/core/services/toast.service';
import { ReviewService } from '@app/core/services/review.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-mod-user-create',
  templateUrl: './mod-user-create.component.html',
  styleUrls: ['./mod-user-create.component.scss']
})
export class ModUserCreateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  Back() {
    this.router.navigate([""])
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    var randomstring = Math.random().toString(36).slice(-8);

    this.authenticationService.register(
      this.f.name.value,
      this.f.lastname.value,
      this.f.email.value,
      randomstring
    )
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['mod/users']);
          this.toastService.toast("Gebruiker aangemaakt")
          this.submitted = false;
          this.loading = false;
        },
        error => {
          this.error = error;
          this.submitted = false;
          if (error === 'User already registered.') this.error =
            'Dit account bestaat al.';

          this.loading = false;
        });
  }
}



