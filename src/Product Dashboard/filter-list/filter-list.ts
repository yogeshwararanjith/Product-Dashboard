import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  imports: [],
  templateUrl: './filter-list.html',
  styleUrl: './filter-list.scss',
})
export class FilterList {
@Input() categories : string[]  = [];

@Output() selectedCat  = new EventEmitter<string>();

selectedCategory :string = '';

onCategoryChange(event:Event){
  const target = event.target as HTMLSelectElement;
  this.selectedCategory =  target.value;
}

onSubmit(){
 this.selectedCat.emit(this.selectedCategory);
}

reset(){
  this.selectedCategory = '';
  this.selectedCat.emit(this.selectedCategory);
}
}
