import { ChangeDetectionStrategy, Component, computed, inject, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { Products } from '../../Models/products';
import { FilterList } from '../filter-list/filter-list';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap, takeUntil } from 'rxjs';
import { Product } from '../../services/products';
import { AppHighlight } from '../../Shared/app-highlight';

@Component({
  selector: 'app-product-list',
  imports: [FilterList, ReactiveFormsModule, AppHighlight],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList implements OnInit, OnDestroy, OnChanges{
@Input() productsList:Products[] | null = []

// private _allProducts : Products[] = [];
private allProducts = signal<Products[]>([]);  // signals way

// filtered : Products[] = [];

filtered = signal<Products[]>([]);  // signals way

categories : string[] | undefined = [];

// page : number = 0;

// size : number = 20;

 // Current page number
pageSignal = signal(0);
  
  // Page size (items per page)
pageSizeSignal = signal(20);

productService = inject(Product)

searchForm = new FormGroup({
    searchControl : new FormControl<string>(''),
})

private destroy$ = new Subject<void>();

ngOnChanges(changes:SimpleChanges){
  if(changes['productsList']){
    // this._allProducts = changes['productsList'].currentValue ?? [];
    // this.filtered = [...this._allProducts];
    // this.page = 0;
    this.allProducts.set(changes['productsList'].currentValue ?? []);
    this.filtered.set([...this.allProducts()]);
    this.pageSignal.set(0);
  }
}

handleCategory(cat:string){
   if (!cat) {
    this.filtered.set([...this.allProducts()]);
  } else {
    let q = cat.toLowerCase();
    this.filtered.set(this.allProducts().filter(prdct => prdct.category.toLowerCase() === q))
  }
  this.pageSignal.set(0);
}

ngOnInit(){
  this.setUpSearch();
}

// paginatedProducts(){
//    if(!this.filtered) return [];
//   const start = this.page * this.size;
//   const end = start+this.size
//   return this.filtered.slice(start,end)
// }

  // ============ COMPUTED SIGNALS (Auto-derive from other signals) ============
paginatedProducts  = computed(()=>{
  const filtered = this.filtered();
    const page = this.pageSignal();
    const size = this.pageSizeSignal();
    const start = page * size;
    return filtered.slice(start, start + size);
})

onPrevious(){
  // if(this.page > 0){
  // this.page--;
  // }
  if(this.pageSignal()>0){
    this.pageSignal.update(p => p-1);
  }
}

onNext(){
  if(this.pageSignal() < this.getTotalPages()-1){
    this.pageSignal.update(p=>p+1);
  }
}

// getTotalPages(){
//   if (!this.filtered) return 0;
//   return Math.ceil(this.filtered?.length / this.size) ;
// }

getTotalPages = computed(()=>{
  const filtered = this.filtered();
  const size = this.pageSizeSignal();
  return Math.ceil(filtered.length/size);
})


// get totalItems(): number {
//     return this.filtered?.length || 0;
// }

totalItems = computed(()=>{
    const filtered = this.filtered();
    return filtered.length || 0;
})

// getCategories(){
//   const filtered = this.filtered();
//   filtered?.map(prdct => prdct.category).filter((cat,idx,arr) => arr.indexOf(cat) === idx )
// }

getCategories = computed(()=>{
  const filtered = this.filtered();
  return [...new Set(filtered?.map(prdct => prdct.category))];
})

// onSearch(){
//   this.searchForm.get('searchControl')!.valueChanges.pipe(
//     debounceTime(100),
//     distinctUntilChanged(),
//     filter((val) => val !== null),
//     // switchMap(searchVal => this.productService.searchProducts()),
//     takeUntil(this.destroy$),
//   ).subscribe((searchVal:string | null) => {
//     console.log(searchVal)
//     if(!searchVal || searchVal?.length === 0){ 
//       this.filtered = [...this._allProducts];
//     }else{
//     this.filtered = this._allProducts!.filter(p => p.title.toLowerCase().includes(searchVal!.toLowerCase()) ||
//           p.category.toLowerCase().includes(searchVal!.toLowerCase()))
//     }
//     this.page = 0;
//   })
// }

private setUpSearch():void{
    this.searchForm.get('searchControl')!.valueChanges.pipe(
    debounceTime(100),
    distinctUntilChanged(),
    filter((val) => val !== null),
    // switchMap(searchVal => this.productService.searchProducts()),
    takeUntil(this.destroy$),
  ).subscribe((searchVal:string | null) => {
    console.log(searchVal)
    if(!searchVal || searchVal?.length === 0){ 
      this.filtered.set([...this.allProducts()]);
    }else{
    this.filtered.set(this.allProducts().filter(p => p.title.toLowerCase().includes(searchVal.toLowerCase()) ||
          p.category.toLowerCase().includes(searchVal.toLowerCase())))
    }
    this.pageSignal.set(0);
  })
}

ngOnDestroy(){
  this.destroy$.next();
  this.destroy$.complete();
}
}
