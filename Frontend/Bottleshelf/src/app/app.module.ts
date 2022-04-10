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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [DryApiService, LiquidApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
