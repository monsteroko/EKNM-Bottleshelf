import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DryApiService {

  readonly APIUrl = 'https://localhost:7208/api';

  constructor(private http:HttpClient) { }

  getDriesList(){
    return this.http.get<any>(this.APIUrl + '/dries');
  }

  getDriesToBuy(){
    return this.http.get<any>(this.APIUrl + '/dries/buy');
  }

  addDry(data:any){
    return this.http.post(this.APIUrl + '/dries', data);
  }

  updateDry(id:number, data:any){
    return this.http.put(this.APIUrl+`/dries/${id}`, data);
  }

  deleteDry(id:number){
    return this.http.delete(this.APIUrl+`/dries/${id}`);
  }
}
