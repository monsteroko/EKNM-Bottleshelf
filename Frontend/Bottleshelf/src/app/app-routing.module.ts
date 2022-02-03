import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dry } from './dry.model';
import { Liquid } from './liquid.model';

const routes: Routes = [
  {path:'dry',component:Dry},
  {path:'liquid',component:Liquid},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
