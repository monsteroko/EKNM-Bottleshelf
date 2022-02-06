import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

}
