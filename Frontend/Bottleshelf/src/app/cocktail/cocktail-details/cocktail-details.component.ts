import { Component, Input, OnInit } from '@angular/core';
import { CocktailApiService } from 'src/app/services/cocktail-api.service';
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
  degrees:number=0;
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
    this.service.getDegrees(this.id).toPromise().then(data => { 
      if (data)
      this.degrees = data;
    });
  }

  Cook(){
    this.service.cook(this.cocktail.id).subscribe(res => {
      if(res.status==200)
      {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn){
          closeModalBtn.click();
        }

        var showAddSuccess = document.getElementById('cook-success-alert-cocktail');
        if(showAddSuccess){
          showAddSuccess.style.display = "block";
        }
        setTimeout(function(){
          if(showAddSuccess){
            showAddSuccess.style.display = "none"
          }
        }, 4000);
      }
      else if(res.status==409){
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn){
          closeModalBtn.click();
        }

        var showAddSuccess = document.getElementById('cook-unsuccess-alert-cocktail');
        if(showAddSuccess){
          showAddSuccess.style.display = "block";
        }
        setTimeout(function(){
          if(showAddSuccess){
            showAddSuccess.style.display = "none"
          }
        }, 4000);
      }
    }
    )
  }

}
