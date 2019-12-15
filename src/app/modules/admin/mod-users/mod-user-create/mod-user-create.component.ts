import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/core/services/toast.service';
import { ReviewService } from '@app/core/services/review.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { first } from 'rxjs/operators';
import { Mail } from '@app/shared/models/mail';

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
  private isAdmin = true;

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  switchUserProfile() {
    this.isAdmin = this.f.userType.value;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      userType: [false]
    });
  }

  Back() {
    this.router.navigate([""])
  }

  get f() { return this.registerForm.controls; }

  sendMail() {
    const email: Mail = {
      email: this.f.email.value,
      subject: "Nieuw account gegevens",
      html: `<h2>Beste ${this.f.name.value} ${this.f.lastname.value}</h2>
      <br/>
      <p>Er werd zojuist een nieuw account gecreërd voor u!</p>
      <p>Hieronder vindt u de gegevens terug, na het inloggen worden er eerst nog een aantal vragen gesteld zodat wij u beter kunnen leren kennen.</p>
      <p>Vergeet ook zeker niet uw wachtwoord te veranderen onder 'Profiel' -> 'Wachtwoord wijzigen'!</p>
      <br/>
      <p>Email: ${this.f.email.value}</p>
      <p>Wachtwoord: ${this.randomString}</p>
      <br/>
      <p>Klik <a href="http://tinket.netlify.com/login">hier<a/> om in te loggen.
      <p>Veel geluk met het zoeken van toffe uitdagingen!</p>
      <br/>
      <p>Met vriendelijke groeten!</p>
      <p>Het Tinket team</p>
      `,
    }
    this.userService.sendMail(email).subscribe();
  }

  randomString = "";

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.randomString = Math.random().toString(36).slice(-8);

    console.log(this.isAdmin)

    if (this.isAdmin) {
      this.registerAdmin();
    } else {
      this.registrerUser();
    }
  }


  registrerUser() {
    this.authenticationService.register(
      this.f.name.value,
      this.f.lastname.value,
      this.f.email.value,
      this.randomString
    )
      .pipe(first())
      .subscribe(
        data => {
          this.sendMail()
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



  registerAdmin() {
    this.authenticationService.registerAdmin(
      this.f.name.value,
      this.f.lastname.value,
      this.f.email.value,
      this.randomString
    )
      .pipe(first())
      .subscribe(
        data => {
          this.sendMail()
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



