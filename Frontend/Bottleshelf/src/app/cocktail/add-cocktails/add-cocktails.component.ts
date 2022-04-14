import { Component, OnInit, Input} from '@angular/core';
import { CocktailApiService } from 'src/app/services/cocktail-api.service';
import { DryApiService } from 'src/app/services/dry-api.service';
import { LiquidApiService } from 'src/app/services/liquid-api.service';
import { CocktailModel } from 'src/models/cocktail.model';
import { DryModel } from 'src/models/dry.model';
import { LiquidModel } from 'src/models/liquid.model';
import { IngridientModel } from 'src/models/ingridient.model';

@Component({
  selector: 'app-add-cocktails',
  templateUrl: './add-cocktails.component.html',
  styleUrls: ['./add-cocktails.component.scss']
})
export class AddEditCocktailsComponent implements OnInit {

  driesList = [] as DryModel[];
  liquidsList = [] as LiquidModel[];
  dryCount : number = 0;
  liqCount : number = 1;

  constructor(private service:CocktailApiService, private dryService:DryApiService, private liqService:LiquidApiService) {
   }

   @Input() cocktail:any;
    id: number = 0;
    name: string = "";
    description:string = "";


  ngOnInit(): void {

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
  }

  addCocktail(){

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

    let Addcocktail = {
      name:this.name,
      description:this.description,
      drymap: dries,
      liqmap: liquids
    }
    this.service.addCocktail(Addcocktail).subscribe(res => {
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
