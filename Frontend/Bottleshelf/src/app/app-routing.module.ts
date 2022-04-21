import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowLiquidsComponent } from './liquid/show-liquids/show-liquids.component';
import { ShowDriesComponent } from './dry/show-dries/show-dries.component';
import { ShowCocktailsComponent } from './cocktail/show-cocktails/show-cocktails.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{ path: 'liquids', component: ShowLiquidsComponent},
{ path: 'dries', component: ShowDriesComponent},
{ path: 'cocktails', component: ShowCocktailsComponent},
{ path: 'sign-in', component: SignInComponent },
{ path: 'register-user', component: SignUpComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
