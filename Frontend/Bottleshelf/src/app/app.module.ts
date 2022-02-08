import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DryComponent } from './dry/dry.component';
import { ShowDriesComponent } from './dry/show-dries/show-dries.component';
import { AddEditDriesComponent } from './dry/add-edit-dries/add-edit-dries.component';
import { DryApiService } from './dry-api.service';
import { LiquidComponent } from './liquid/liquid.component';
import { ShowLiquidsComponent } from './liquid/show-liquids/show-liquids.component';
import { AddEditLiquidsComponent } from './liquid/add-edit-liquids/add-edit-liquids.component';
import { LiquidApiService } from './liquid-api.service';
import { CocktailComponent } from './cocktail/cocktail.component';
import { ShowCocktailsComponent } from './cocktail/show-cocktails/show-cocktails.component';
import { AddEditCocktailsComponent } from './cocktail/add-edit-cocktails/add-edit-cocktails.component';
import { CocktailDetailsComponent } from './cocktail/cocktail-details/cocktail-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DryComponent,
    ShowDriesComponent,
    AddEditDriesComponent,
    LiquidComponent,
    ShowLiquidsComponent,
    AddEditLiquidsComponent,
    CocktailComponent,
    ShowCocktailsComponent,
    AddEditCocktailsComponent,
    CocktailDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DryApiService, LiquidApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
