import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CocktailApiService {

  readonly APIUrl = 'https://localhost:7208/api';

  constructor(private http:HttpClient) { }

  getCocktailsList(){
    return this.http.get<any>(this.APIUrl + '/cocktails');
  }

  getDriesTable(id:number){
    return this.http.get<any>(this.APIUrl + `/driestable/${id}`);
  }

  getLiquidsTable(id:number){
    return this.http.get<any>(this.APIUrl + `/LiquidsTable/${id}`);
  }

  getLiquid(id:number){
    return this.http.get(this.APIUrl+`/liquids/${id}`);
  }

  getDry(id:number){
    return this.http.get(this.APIUrl+`/dries/${id}`);
  }

}
