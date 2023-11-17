import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowLiquidsComponent } from './liquid/show-liquids/show-liquids.component';
import { ShowDriesComponent } from './dry/show-dries/show-dries.component';
import { ShowCocktailsComponent } from './cocktail/show-cocktails/show-cocktails.component';
import { HomeComponent } from './home/home.component';
import { UnsignedPageComponent } from './pages/unsigned-page/unsigned-page.component';

const routes: Routes = [
  { path: '', component: UnsignedPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'liquids', component: ShowLiquidsComponent},
  { path: 'dries', component: ShowDriesComponent},
  { path: 'cocktails', component: ShowCocktailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
