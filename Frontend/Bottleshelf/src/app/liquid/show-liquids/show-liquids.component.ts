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

}