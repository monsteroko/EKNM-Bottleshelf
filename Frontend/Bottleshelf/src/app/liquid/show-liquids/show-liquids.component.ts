import { Component, OnInit } from '@angular/core';
import { LiquidApiService } from 'src/app/services/liquid-api.service';
import { LiquidModel } from 'src/models/liquid.model';
import {Sort} from '@angular/material/sort';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-show-liquids',
  templateUrl: './show-liquids.component.html',
  styleUrls: ['./show-liquids.component.scss']
})
export class ShowLiquidsComponent implements OnInit {

  liquidsList = [] as LiquidModel[];
  sortedData = [] as LiquidModel[];
  liquidsToBuy = [] as LiquidModel[];

  constructor(private service:LiquidApiService) { }

  ngOnInit(): void {
    this.service.getLiquidsList().toPromise().then(data => { 
      if (data)
      {
      this.liquidsList = data;
      this.sortedData = this.liquidsList.slice();
      }
    })

  }

  //Variables (properties)
  modalTitle:string = '';
  activateAddEditLiquidComponent:boolean = false;
  liquid!:LiquidModel;

  sortData(sort: Sort) {
    const data = this.liquidsList.slice();
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
        case 'volume':
          return compare(a.volume, b.volume, isAsc);
        case 'bottles':
          return compare(a.bottles, b.bottles, isAsc);
        case 'degree':
          return compare(a.degree, b.degree, isAsc);
          case 'amount':
            return compare(a.amount, b.amount, isAsc);
        default:
          return 0;
      }
    });
  }

  buyLiquids(){
    this.service.getLiquidsToBuy().toPromise().then(data => { 
      if (data)
      this.liquidsToBuy = data;
    })
    const head = [['Name', 'Volume', 'Price']]
    const db : [[string, number, number]]= [['Buy beer',500,25]];
    this.liquidsToBuy.forEach(element =>{
      var str: [string, number, number] = [element.name,element.volume,element.price];
      db.push(str);
    }
    );
    const doc = new jsPDF()
    doc.text('Liquids to buy',10,10);
    autoTable(doc, {
      head: head,
      body : db,
      didDrawCell: (data: { column: { index: any; }; }) => {
        console.log(data.column.index)
      },
      })
    doc.output('dataurlnewwindow');
  }

  modalAdd() {
    this.liquid = {
      id:0,
      name:'',
      price:0,
      description:'',
      amount:0,
      degree:0,
      bottles:0,
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

      var showDeleteSuccess = document.getElementById('delete-success-alert-liquid');
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
        {
          this.liquidsList = data;
          this.sortedData = this.liquidsList.slice();
          }
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
        {
          this.liquidsList = data;
          this.sortedData = this.liquidsList.slice();
          }
        })
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
