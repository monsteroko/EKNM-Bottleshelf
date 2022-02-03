import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Liquid } from './liquid.model';
 
@Injectable()
export class LiquidService {
 
    private url = "/api/liquids";
 
    constructor(private http: HttpClient) {
    }
 
    getLiquids() {
        return this.http.get(this.url);
    }
     
    getLiquid(id: number) {
        return this.http.get(this.url + '/' + id);
    }
     
    createLiquid(product: Liquid) {
        return this.http.post(this.url, product);
    }
    updateLiquid(product: Liquid) {
  
        return this.http.put(this.url, product);
    }
    deleteLiquid(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}