import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShowDriesComponent } from './dry/show-dries/show-dries.component';
import { AddEditDriesComponent } from './dry/add-edit-dries/add-edit-dries.component';
import { DryApiService } from './services/dry-api.service';
import { ShowLiquidsComponent } from './liquid/show-liquids/show-liquids.component';
import { AddEditLiquidsComponent } from './liquid/add-edit-liquids/add-edit-liquids.component';
import { LiquidApiService } from './services/liquid-api.service';
import { ShowCocktailsComponent } from './cocktail/show-cocktails/show-cocktails.component';
import { AddEditCocktailsComponent } from './cocktail/add-cocktails/add-cocktails.component';
import { CocktailDetailsComponent } from './cocktail/cocktail-details/cocktail-details.component';
import { HomeComponent } from './home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateCocktailsComponent } from './cocktail/update-cocktails/update-cocktails.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from "./services/auth.service";

import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowDriesComponent,
    AddEditDriesComponent,
    ShowLiquidsComponent,
    AddEditLiquidsComponent,
    ShowCocktailsComponent,
    AddEditCocktailsComponent,
    CocktailDetailsComponent,
    HomeComponent,
    UpdateCocktailsComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    NoopAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [DryApiService, LiquidApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
