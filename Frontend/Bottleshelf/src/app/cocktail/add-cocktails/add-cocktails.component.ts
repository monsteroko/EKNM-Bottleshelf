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

    var cocktail = {
      name:this.name,
      description:this.description
    }
    const drynamesArr = document.querySelectorAll('.drysel');
    const drygrArr = document.querySelectorAll('.drygr');
    const liqnamesArr = document.querySelectorAll('.liqsel');
    const liqmlArr = document.querySelectorAll('.liqml');
    this.service.addCocktail(cocktail).subscribe(res => {
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
