import { Component, Input, OnInit } from '@angular/core';
import { DryApiService } from 'src/app/dry-api.service';
import { DryModel } from 'src/models/dry.model';

@Component({
  selector: 'app-show-dries',
  templateUrl: './show-dries.component.html',
  styleUrls: ['./show-dries.component.scss']
})
export class ShowDriesComponent implements OnInit {

  driesList = [] as DryModel[];

  constructor(private service:DryApiService) { }

  ngOnInit(): void {
    this.service.getDriesList().toPromise().then(data => { 
      if (data)
      this.driesList = data;
    })

  }

  //Variables (properties)
  modalTitle:string = '';
  activateAddEditDryComponent:boolean = false;
  dry!:DryModel;

  modalAdd() {
    this.dry = {
      id:0,
      name:'',
      price:0,
      description:'',
      amount:0,
      weight:0
    }
    this.modalTitle="Add Dry";
    this.activateAddEditDryComponent = true;
  }

  deleteDry(item:DryModel){
    if(confirm(`Are you sure you want to delete dry ${item.id}?`)){
      this.service.deleteDry(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert-dry');
      if(showDeleteSuccess){
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showDeleteSuccess){
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.service.getDriesList().toPromise().then(data => { 
        if (data)
        this.driesList = data;
      })
      });
    }
  }
  modalEdit(item:DryModel){
    this.dry= item;
    this.modalTitle="Edit Dry";
    this.activateAddEditDryComponent=true;
  }
  modalClose() {
    this.activateAddEditDryComponent = false;
    this.service.getDriesList().toPromise().then(data => { 
        if (data)
        this.driesList = data;})
  }

}
