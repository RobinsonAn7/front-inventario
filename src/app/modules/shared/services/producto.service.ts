import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  /**
   * get all the products
   * @returns 
   */
  getProducts(){
    const endpoint = `${base_url}/productos`;
    return this.http.get(endpoint);
  }

  /**
   * save products
   * @returns 
   */
   saveProducts(body:any){
    const endpoint = `${base_url}/productos`;
    return this.http.post(endpoint,body)
  }
}
