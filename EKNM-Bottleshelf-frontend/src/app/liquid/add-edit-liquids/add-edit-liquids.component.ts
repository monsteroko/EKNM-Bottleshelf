import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LiquidApiService } from 'src/app/services/liquid-api.service';
import { LiquidModel } from 'src/models/liquid.model';

@Component({
  selector: 'app-add-edit-liquids',
  templateUrl: './add-edit-liquids.component.html',
  styleUrls: ['./add-edit-liquids.component.scss']
})
export class AddEditLiquidsComponent implements OnInit {

  liquidsList = [] as LiquidModel[];

  constructor(private service:LiquidApiService) { }

  @Input() liquid:any;
  id: number = 0;
  name: string = "";
  price:number = 0;
  description:string = "";
  amount:number = 0;
  volume:number = 0;
  degree:number = 0;
  bottles:number = 0;

  ngOnInit(): void {
    this.id = this.liquid.id;
    this.name = this.liquid.name;
    this.price = this.liquid.price;
    this.description = this.liquid.description;
    this.amount = this.liquid.amount;
    this.volume = this.liquid.volume;
    this.degree = this.liquid.degree;
    this.bottles = Math.ceil(this.liquid.amount / this.liquid.volume);
  }

  addLiquid(){

    var liquid = {
      name:this.name,
      price:this.price,
      description:this.description,
      amount:this.bottles * this.volume,
      volume:this.volume,
      degree:this.degree,
    }
    this.service.addLiquid(liquid).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert-liquid');
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

  updateLiquid(){
    if(Math.ceil(this.liquid.amount / this.liquid.volume)==this.liquid.bottles)
    {
    var liquid = {
      id:this.id,
      name:this.name,
      price:this.price,
      description:this.description,
      amount:this.volume*this.bottles,
      volume:this.volume,
      degree:this.degree,
    }
  }
  else
  {
    var liquid = {
      id:this.id,
      name:this.name,
      price:this.price,
      description:this.description,
      amount:this.volume*this.bottles,
      volume:this.volume,
      degree:this.degree,
    }
  }
    var id:number = this.id;
    this.service.updateLiquid(id, liquid).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert-liquid');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showUpdateSuccess){
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

}
