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
      {
        this.cocktailsList = data;
        this.sortedData = this.cocktailsList.slice();
      }
    })
  }
  
  //Variables (properties)
  modalTitle:string = '';
  activateCocktailDetailsComponent:boolean = false;
  activateAddCocktailComponent:boolean = false;
  activateUpdateCocktailComponent:boolean = false;
  cocktail!:CocktailModel;
  selectedSize: number = 0;

  selectSizeHandler (event: any) {
    this.selectedSize = event.target.value;
    this.service.getCocktailsFilters(this.selectedSize).toPromise().then(data => { 
      if (data)
      {
        this.cocktailsList = data;
        this.sortedData = this.cocktailsList.slice();
      }
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

  deleteCocktail(item:CocktailModel){
    if(confirm(`Are you sure you want to delete cocktail ${item.id}?`)){
      this.service.deleteCocktail(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert-cocktail');
      if(showDeleteSuccess){
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showDeleteSuccess){
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.service.getCocktailsList().toPromise().then(data => { 
        if (data)
        {
          this.cocktailsList = data;
          this.sortedData = this.cocktailsList.slice();
        }
      })
      });
    }
  }

  AddCocktail(){
    this.activateAddCocktailComponent=true;
  }
  addModalClose() {
    this.activateAddCocktailComponent=false;
    this.service.getCocktailsList().toPromise().then(data => { 
      if (data)
      {
        this.cocktailsList = data;
        this.sortedData = this.cocktailsList.slice();
      }
    })
  }

  updateCocktail(item:CocktailModel){
    if(item)
    {
    this.cocktail= item;
    this.modalTitle='Update ' + this.cocktail.name;
    this.activateUpdateCocktailComponent=true;
    }
  }
  updateModalClose() {
    this.activateUpdateCocktailComponent=false;
    this.service.getCocktailsList().toPromise().then(data => { 
      if (data)
      {
        this.cocktailsList = data;
        this.sortedData = this.cocktailsList.slice();
      }
    })
  }

  modalDetails(item:CocktailModel){
    this.cocktail= item;
    this.modalTitle=this.cocktail.name + " details";
    this.activateCocktailDetailsComponent=true;
  }
  detailsModalClose() {
    this.activateCocktailDetailsComponent = false;
    this.service.getCocktailsList().toPromise().then(data => { 
        if (data)
        {
          this.cocktailsList = data;
          this.sortedData = this.cocktailsList.slice();
        }
      })
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
