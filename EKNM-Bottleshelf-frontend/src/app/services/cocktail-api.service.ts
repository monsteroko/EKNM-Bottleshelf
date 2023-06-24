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

  getIngridients(id:number){
    return this.http.get<any>(this.APIUrl + `/Cocktails/${id}/recipe`);
  }

  getCocktailsFilters(id:number){
    return this.http.get<any>(this.APIUrl + `/Cocktails/size/${id}`);
  }

  getPrice(id:number){
    return this.http.get<any>(this.APIUrl + `/Cocktails/${id}/price`);
  }

  getDegrees(id:number){
    return this.http.get<any>(this.APIUrl + `/Cocktails/${id}/degree`);
  }

  cook(id:number){
    return this.http.put(this.APIUrl + `/Cocktails/${id}/cook`, null);
  }

  addCocktail(data:any){
    return this.http.post(this.APIUrl + '/Cocktails', data);
  }

  updateCocktail(id:number, data:any){
    return this.http.put(this.APIUrl+`/Cocktails/${id}`, data);
  }

  deleteCocktail(id:number){
    return this.http.delete(this.APIUrl+`/Cocktails/${id}`);
  }

  deleteIngridient(id:number, name:any){
    return this.http.delete(this.APIUrl+`/Cocktails/${id}/ingridient/${name}`);
  }
}
