import { Component, Input, OnInit } from '@angular/core';
import { DryApiService } from 'src/app/services/dry-api.service';
import { DryModel } from 'src/models/dry.model';

@Component({
  selector: 'app-add-edit-dries',
  templateUrl: './add-edit-dries.component.html',
  styleUrls: ['./add-edit-dries.component.scss']
})
export class AddEditDriesComponent implements OnInit {

  driesList = [] as DryModel[];

  constructor(private service:DryApiService) { }

  @Input() dry:any;
  id: number = 0;
  name: string = "";
  price:number = 0;
  description:string = "";
  amount:number = 0;
  weight:number = 0;
  packs:number = 0;

  ngOnInit(): void {
    this.id = this.dry.id;
    this.name = this.dry.name;
    this.price = this.dry.price;
    this.description = this.dry.description;
    this.amount = this.dry.amount;
    this.weight = this.dry.weight;
    this.packs = this.dry.packs;
  }

  addDry(){

    var dry = {
      name:this.name,
      price:this.price,
      description:this.description,
      amount:this.packs * this.weight,
      weight:this.weight
    }
    this.service.addDry(dry).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert-dry');
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

  updateDry(){
    if(Math.ceil(this.dry.amount / this.dry.weight)==this.dry.packs)
    {
    var dry = {
      id:this.id,
      name:this.name,
      price:this.price,
      description:this.description,
      amount:this.amount,
      weight:this.weight,
    }
  }
  else
  {
    var dry = {
      id:this.id,
      name:this.name,
      price:this.price,
      description:this.description,
      amount:this.weight*this.packs,
      weight:this.weight,
    }
  }
    var id:number = this.id;
    this.service.updateDry(id, dry).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert-dry');
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
