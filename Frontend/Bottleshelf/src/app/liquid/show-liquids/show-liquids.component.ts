import { Component, OnInit } from '@angular/core';
import { LiquidApiService } from 'src/app/services/liquid-api.service';
import { LiquidModel } from 'src/models/liquid.model';
import {Sort} from '@angular/material/sort';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

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
    });
    this.service.getLiquidsToBuy().toPromise().then(data => { 
      if (data)
      this.liquidsToBuy = data;
    });

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
    const head = [['Name', 'Volume', 'Price']]
    const db = [] as RowInput[]; 
    this.liquidsToBuy.forEach(element =>{
      db.push([element.name,element.volume+' ML',element.price+' UAH'] as RowInput);
    }
    );
    const doc = new jsPDF()
    doc.addFont("../../assets/fonts/Comfortaa.ttf", "Comfortaa", "normal");
    doc.addFont("../../assets/fonts/AlumniSans.ttf", "AlumniSans", "normal");
    doc.setFont("Comfortaa");
    doc.setFontSize(30);
    doc.text('Liquids to buy',55,10);
    autoTable(doc, {
      theme: 'grid',
      styles: {font:'AlumniSans', fontSize: 20},
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
      this.service.getLiquidsToBuy().toPromise().then(data => { 
        if (data)
        this.liquidsToBuy = data;
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
    this.service.getLiquidsToBuy().toPromise().then(data => { 
      if (data)
      this.liquidsToBuy = data;
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
