import { Component, Input, OnInit } from '@angular/core';
import { CocktailApiService } from 'src/app/cocktail-api.service';
import { CocktailModel } from 'src/models/cocktail.model';
import { IngridientModel } from 'src/models/ingridient.model';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit {

  cocktailsList = [] as CocktailModel[];
  ingridientsTable = [] as IngridientModel[];
  constructor(private service:CocktailApiService) { }

  @Input() cocktail:any;
  id: number = 0;
  name: string = "";
  volumeML:number = 0;
  description:string = "";
  price:number = 0;
  ngOnInit(): void {
    this.id = this.cocktail.id;
    this.name = this.cocktail.name;
    this.volumeML = this.cocktail.volumeML;
    this.description = this.cocktail.description;
    this.service.getIngridients(this.id).toPromise().then(data => { 
      if (data)
      this.ingridientsTable = data;
    });
    this.service.getPrice(this.id).toPromise().then(data => { 
      if (data)
      this.price = data;
    });
  }

}
