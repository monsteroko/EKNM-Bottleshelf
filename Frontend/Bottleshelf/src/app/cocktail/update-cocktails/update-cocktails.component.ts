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
  dryCount : number = 0;
  liqCount : number = 0;

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
    if(confirm(`Are you sure you want to delete ingridient ${item.name}?`)){
      this.service.deleteIngridient(this.id,item.name).toPromise();
      this.service.getIngridients(this.id).toPromise().then(data => { 
        if (data)
        this.ingridientsTable = data;
      });
    };
  }

  updateCocktail(){

    let dries: {[key:number]:number;}={};
    let liquids: {[key:number]:number;}={};

    for (var _i = 0; _i < this.dryCount; _i++) {
      var dryselvalue = (<HTMLSelectElement>document.getElementById("drysel_"+_i)).value;
      var drynumvalue = (<HTMLSelectElement>document.getElementById("drygr_"+_i)).value;
      if(dryselvalue && drynumvalue)
      {
        dries[Number(dryselvalue)]=Number(drynumvalue);
      }
    }

    for (var _i = 0; _i < this.liqCount; _i++) {
      var liqselvalue = (<HTMLSelectElement>document.getElementById("liqsel_"+_i)).value;
      var liqnumvalue = (<HTMLSelectElement>document.getElementById("liqml_"+_i)).value;
      if(liqselvalue && liqnumvalue)
      {
        liquids[Number(liqselvalue)]=Number(liqnumvalue);
      }
    }

    var cocktail = {
      name:this.name,
      description:this.description,
      drymap: dries,
      liqmap: liquids
    }
    this.service.updateCocktail(this.id,cocktail).subscribe(res => {
      var closeModalBtn = document.getElementById('update-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('update-success-alert-cocktail');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

  addLiquidIngridient(){
    this.liqCount++;
  }
  deleteLiquidIngridient(){
    this.liqCount--;
  }

  addDryIngridient(){
    this.dryCount++;
  }
  deleteDryIngridient(){
    this.dryCount--;
  }

}
