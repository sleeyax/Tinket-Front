import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { SkillService } from '@app/core/services/skill.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private skillService: SkillService) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get f() { return this.passwordForm.controls; }


  onSubmit() {
    this.loading = true;

    if (this.passwordForm.valid) {
      this.authenticationService.changePassword(this.f.oldpassword.value, this.f.password.value).subscribe(() => {
        this.authenticationService.deteleUserTokens().subscribe(() => {
          this.authenticationService.logout()
          this.router.navigate(['login']);
          this.loading = false;
          this.submitted = false;
        })
      },
        error => {
          this.loading = false;
          this.submitted = false;
          this.error = error
        }
      )
    } else{
      this.loading = false;
    }
  }
}
