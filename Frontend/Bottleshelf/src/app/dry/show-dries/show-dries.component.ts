import { Component, OnInit } from '@angular/core';
import { DryApiService } from 'src/app/services/dry-api.service';
import { DryModel } from 'src/models/dry.model';
import {Sort} from '@angular/material/sort';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

@Component({
  selector: 'app-show-dries',
  templateUrl: './show-dries.component.html',
  styleUrls: ['./show-dries.component.scss']
})
export class ShowDriesComponent implements OnInit {

  driesList = [] as DryModel[];
  sortedData = [] as DryModel[];
  driesToBuy = [] as DryModel[];

  constructor(private service:DryApiService) {}

  ngOnInit(): void {
    this.service.getDriesList().toPromise().then(data => { 
      if (data)
      this.driesList = data;
      this.sortedData = this.driesList.slice();
    });
    this.service.getDriesToBuy().toPromise().then(data => { 
      if (data)
      this.driesToBuy = data;
    });

  }

  //Variables (properties)
  modalTitle:string = '';
  activateAddEditDryComponent:boolean = false;
  dry!:DryModel;

  buyDries(){
    const head = [['Name', 'Volume', 'Price']]
    const db = [] as RowInput[]; 
    this.driesToBuy.forEach(element =>{
      db.push([element.name,element.weight,element.price] as RowInput);
    }
    );
    const doc = new jsPDF();
    doc.text('Dries to buy',10,10);
    autoTable(doc, {
      head: head,
      body : db,
      didDrawCell: (data: { column: { index: any; }; }) => {
        console.log(data.column.index)
      },
      })
    doc.output('dataurlnewwindow');
  }

  sortData(sort: Sort) {
    const data = this.driesList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'weight':
          return compare(a.weight, b.weight, isAsc);
        case 'amount':
          return compare(a.amount, b.amount, isAsc);
        case 'packs':
          return compare(a.packs, b.packs, isAsc);
        default:
          return 0;
      }
    });
  }

  modalAdd() {
    this.dry = {
      id:0,
      name:'',
      price:0,
      description:'',
      amount:0,
      packs:0,
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
        {
        this.driesList = data;
        this.sortedData = this.driesList.slice();
        }
      });
      this.service.getDriesToBuy().toPromise().then(data => { 
        if (data)
        this.driesToBuy = data;
      });
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
      {
        this.driesList = data;
        this.sortedData = this.driesList.slice();
        };})
    this.service.getDriesToBuy().toPromise().then(data => { 
      if (data)
      this.driesToBuy = data;
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
