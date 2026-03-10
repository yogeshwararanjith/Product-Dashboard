import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { Products, ProductsResponse } from '../Models/products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Product {

    // with behaviour subject
 
    // private product = new BehaviorSubject<Products[]>([]);
    // products$ = this.product.asObservable();

    // constructor(private httpClient : HttpClient){
    //   this.fetchProducts();  // auto fetch on service init
    // }

    // getProducts(){
    //   return this.products$;
    // }

    // fetchProducts(){
    //    this.httpClient.get<ProductsResponse>('https://dummyjson.com/products?limit=0').subscribe(data => {
    //     this.product.next(data.products)
    //    })
    // }

    
    // with Share replay

    private products$? : Observable<Products[]>;

    constructor(private httpClient : HttpClient){
    }

    searchProducts(){
      
    }

    getProducts():Observable<Products[]>{
      if(!this.products$){
        this.products$ = this.httpClient.get<ProductsResponse>('https://dummyjson.com/products?limit=0').pipe(
          map(res => res.products),
          shareReplay(1));
      }
      return this.products$;
    }

}
