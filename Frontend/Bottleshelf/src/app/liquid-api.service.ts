import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiquidApiService {

  readonly APIUrl = 'https://localhost:7208/api';

  constructor(private http:HttpClient) { }

  getLiquidsList(){
    return this.http.get<any>(this.APIUrl + '/liquids');
  }

  addLiquid(data:any){
    return this.http.post(this.APIUrl + '/liquids', data);
  }

  updateLiquid(id:number, data:any){
    return this.http.put(this.APIUrl+`/liquids/${id}`, data);
  }

  deleteLiquid(id:number){
    return this.http.delete(this.APIUrl+`/liquids/${id}`);
  }
}
