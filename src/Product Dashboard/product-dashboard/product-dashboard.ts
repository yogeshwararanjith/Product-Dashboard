import { Component, inject } from '@angular/core';
import { Products } from '../../Models/products';
import { Product } from '../../services/products';
import { ProductList } from '../product-list/product-list';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-dashboard',
  imports: [ProductList, AsyncPipe],
  templateUrl: './product-dashboard.html',
  styleUrl: './product-dashboard.scss',
})
export class ProductDashboard {  
  productService = inject(Product);
  
  products$ = this.productService.getProducts();


  ngOnInit(){
    console.log(this.products$)
  }
}
