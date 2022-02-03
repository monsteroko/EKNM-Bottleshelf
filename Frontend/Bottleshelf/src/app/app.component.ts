import { Component, OnInit } from '@angular/core';
import { Liquid } from './liquid.model';
import { Dry } from './dry.model';
import { LiquidService } from './liquid.service';
import { DryService } from './dry.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [DryService,LiquidService]
})
export class AppComponent implements OnInit {

  dry: Dry = new Dry();
  dries: Dry[];
  tableMode: boolean = true;

  constructor(private dryService: DryService) { }

  ngOnInit() {
      this.loadDries();  
  }
  loadDries() {
      this.dryService.getDries()
          .subscribe(data =>{this.dries = data});
  }
  saveDry() {
      if (this.dry.Id == null) {
          this.dryService.createDry(this.dry)
              .subscribe((data: Dry) => this.dries.push(data));
      } else {
          this.dryService.updateDry(this.dry)
              .subscribe(data => this.loadDries());
      }
      this.cancelDry();
  }
  editDry(p: Dry) {
      this.dry = p;
  }
  cancelDry() {
      this.dry = new Dry();
      this.tableMode = true;
  }
  deleteDry(p: Dry) {
      this.dryService.deleteDry(p.Id!)
          .subscribe(data => this.loadDries());
  }
  addDry() {
      this.cancelDry();
      this.tableMode = false;
  }
}