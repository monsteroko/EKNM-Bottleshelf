import { Component, Input, OnInit } from '@angular/core';
import { CocktailApiService } from 'src/app/cocktail-api.service';
import { CocktailModel } from 'src/models/cocktail.model';
import { DryTableModel } from 'src/models/drytable.model';
import { LiqTableModel } from 'src/models/liqtable.model';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit {

  cocktailsList = [] as CocktailModel[];
  driesTable = [] as DryTableModel[];
  liquidsTable = [] as LiqTableModel[];
  constructor(private service:CocktailApiService) { }

  @Input() cocktail:any;
  id: number = 0;
  name: string = "";
  volumeML:number = 0;
  description:string = "";
  ngOnInit(): void {
    this.id = this.cocktail.id;
    this.name = this.cocktail.name;
    this.volumeML = this.cocktail.volumeML;
    this.description = this.cocktail.description;
    this.service.getDriesTable(this.id).toPromise().then(data => { 
      if (data)
      this.driesTable = data;
    });
    this.service.getLiquidsTable(this.id).toPromise().then(data => { 
      if (data)
      this.liquidsTable = data;
    });
  }

}
