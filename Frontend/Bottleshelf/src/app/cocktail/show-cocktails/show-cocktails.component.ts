import { Component, OnInit } from '@angular/core';
import { CocktailApiService } from 'src/app/services/cocktail-api.service';
import { CocktailModel } from 'src/models/cocktail.model';
import {Sort} from '@angular/material/sort';

interface Size {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-show-cocktails',
  templateUrl: './show-cocktails.component.html',
  styleUrls: ['./show-cocktails.component.scss']
})
export class ShowCocktailsComponent implements OnInit {


  cocktailsList = [] as CocktailModel[];
  sortedData = [] as CocktailModel[];


  constructor(private service:CocktailApiService) { }

  ngOnInit(): void {
    this.service.getCocktailsList().toPromise().then(data => { 
      if (data)
      this.cocktailsList = data;
      this.sortedData = this.cocktailsList.slice();
    })
  }
  
  //Variables (properties)
  modalTitle:string = '';
  activateCocktailDetailsComponent:boolean = false;
  cocktail!:CocktailModel;
  selectedSize: number = 0;

  selectSizeHandler (event: any) {
    this.selectedSize = event.target.value;
    this.service.getCocktailsFilters(this.selectedSize).toPromise().then(data => { 
      if (data)
      this.cocktailsList = data;
      this.sortedData = this.cocktailsList.slice();
    })
  }


  sortData(sort: Sort) {
    const data = this.cocktailsList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'volume':
          return compare(a.volumeML, b.volumeML, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        default:
          return 0;
      }
    });
  }

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
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
