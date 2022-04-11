import { Component, Input, OnInit } from '@angular/core';
import { CocktailApiService } from 'src/app/services/cocktail-api.service';
import { CocktailModel } from 'src/models/cocktail.model';
import { IngridientModel } from 'src/models/ingridient.model';
import { DryApiService } from 'src/app/services/dry-api.service';
import { LiquidApiService } from 'src/app/services/liquid-api.service';
import { DryModel } from 'src/models/dry.model';
import { LiquidModel } from 'src/models/liquid.model';

@Component({
  selector: 'app-update-cocktails',
  templateUrl: './update-cocktails.component.html',
  styleUrls: ['./update-cocktails.component.scss']
})
export class UpdateCocktailsComponent implements OnInit {

  cocktailsList = [] as CocktailModel[];
  ingridientsTable = [] as IngridientModel[];
  driesList = [] as DryModel[];
  liquidsList = [] as LiquidModel[];

  constructor(private service:CocktailApiService, private dryService:DryApiService, private liqService:LiquidApiService) { }

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
    this.dryService.getDriesList().subscribe(datadry => { 
      if (datadry)
    {
      this.driesList = datadry;
    }
    });

    this.liqService.getLiquidsList().subscribe(dataliq => { 
      if (dataliq)
      this.liquidsList = dataliq;
    })
    this.service.getPrice(this.id).toPromise().then(data => { 
      if (data)
      this.price = data;
    });
    this.service.getDegrees(this.id).toPromise().then(data => { 
      if (data)
      this.degrees = data;
    });
  }

  deleteIngridient(item:IngridientModel){
    if(confirm(`Are you sure you want to delete ingrieint ${item.name}?`)){
      this.service.deleteIngridient(this.id,item.name).toPromise();
      this.service.getIngridients(this.id).toPromise().then(data => { 
        if (data)
        this.ingridientsTable = data;
      });
    };
  }

  updateCocktail(){

    var cocktail = {

      name:this.name,
      description:this.description
    }
    /*this.service.updateCocktail(this.id,cocktail).subscribe(res => {*/
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert-cocktail');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    //})
  }

  addLiquidIngridient(){
    let liqtb = document.getElementById("liqTR");
    let liqtb_prime;
    if(liqtb)
    {
    liqtb_prime = liqtb.cloneNode(true);
    let htmlToAddLiquids = document.getElementById('htmlToAddLiquids');
    if(htmlToAddLiquids)
    htmlToAddLiquids.appendChild(liqtb_prime);
    }
  }

  addDryIngridient(){
    let drytb = document.getElementById("dryTR");
    let drytb_prime;
    if(drytb)
    {
    drytb_prime = drytb.cloneNode(true);
    let htmlToAddDries = document.getElementById('htmlToAddDries');
    if(htmlToAddDries)
    htmlToAddDries.appendChild(drytb_prime);
    }
  }

}
