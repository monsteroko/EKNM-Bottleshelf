import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LiquidApiService } from 'src/app/liquid-api.service';
import { LiquidModel } from 'src/models/liquid.model';

@Component({
  selector: 'app-show-liquids',
  templateUrl: './show-liquids.component.html',
  styleUrls: ['./show-liquids.component.scss']
})
export class ShowLiquidsComponent implements OnInit {

  liquidsList = [] as LiquidModel[];

  constructor(private service:LiquidApiService) { }

  ngOnInit(): void {
    this.service.getLiquidsList().toPromise().then(data => { 
      if (data)
      this.liquidsList = data;
    })

  }

  //Variables (properties)
  modalTitle:string = '';
  activateAddEditLiquidComponent:boolean = false;
  liquid!:LiquidModel;

  modalAdd() {
    this.liquid = {
      id:0,
      name:'',
      price:0,
      description:'',
      amount:0,
      degree:0,
      volume:0
    }
    this.modalTitle="Add Liquid";
    this.activateAddEditLiquidComponent = true;
  }

  deleteLiq(item:LiquidModel){
    if(confirm(`Are you sure you want to delete liquid ${item.id}?`)){
      this.service.deleteLiquid(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess){
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showDeleteSuccess){
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.service.getLiquidsList().toPromise().then(data => { 
        if (data)
        this.liquidsList = data;
      })
      });
    }
  }
  modalEdit(item:LiquidModel){
    this.liquid= item;
    this.modalTitle="Edit Liquid";
    this.activateAddEditLiquidComponent=true;
  }
  modalClose() {
    this.activateAddEditLiquidComponent = false;
    this.service.getLiquidsList().toPromise().then(data => { 
        if (data)
        this.liquidsList = data;})
  }
}
