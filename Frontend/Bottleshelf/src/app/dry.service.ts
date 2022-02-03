import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Dry } from './dry.model';
import { Observable } from 'rxjs';
 
@Injectable()
export class DryService {
    readonly APIUrl="http://localhost:5208/api";
    private DriesUrl = "http://localhost:5208/dries";
 
    constructor(private http: HttpClient) {
    }
 
    getDries():Observable<any[]> {
        return this.http.get<any>(this.APIUrl+'/dries');
    }
     
    getDry(id: number) {
        return this.http.get(this.DriesUrl + '/' + id);
    }
     
    createDry(product: Dry) {
        return this.http.post(this.DriesUrl, product);
    }
    updateDry(product: Dry) {
  
        return this.http.put(this.DriesUrl, product);
    }
    deleteDry(id: number) {
        return this.http.delete(this.DriesUrl + '/' + id);
    }
}