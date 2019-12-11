import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/security/login/login.component';
import { HomeComponent } from './components/landing/home.component';
import { RegisterComponent } from './modules/security/register/register.component';
import { OnboardingComponent } from './modules/onboarding/onboarding/onboarding.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'onboarding', component: OnboardingComponent},

  { path: 'discover', component: HomeComponent},
  { path: 'interests', component: HomeComponent},
  { path: 'profile', component: HomeComponent},
  { path: 'messages', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
