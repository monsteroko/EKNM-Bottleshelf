import { Component, OnInit } from '@angular/core';
import { CocktailApiService } from 'src/app/services/cocktail-api.service';
import { CocktailModel } from 'src/models/cocktail.model';

@Component({
  selector: 'app-show-cocktails',
  templateUrl: './show-cocktails.component.html',
  styleUrls: ['./show-cocktails.component.scss']
})
export class ShowCocktailsComponent implements OnInit {

  cocktailsList = [] as CocktailModel[];

  constructor(private service:CocktailApiService) { }

  ngOnInit(): void {
    this.service.getCocktailsList().toPromise().then(data => { 
      if (data)
      this.cocktailsList = data;
    })

  }

  
  //Variables (properties)
  modalTitle:string = '';
  activateCocktailDetailsComponent:boolean = false;
  cocktail!:CocktailModel;

  modalDetails(item:CocktailModel){
    this.cocktail= item;
    this.modalTitle="Cocktail details";
    this.activateCocktailDetailsComponent=true;
  }
  modalClose() {
    this.activateCocktailDetailsComponent = false;
    this.service.getCocktailsList().toPromise().then(data => { 
        if (data)
        this.cocktailsList = data;})
  }

}
