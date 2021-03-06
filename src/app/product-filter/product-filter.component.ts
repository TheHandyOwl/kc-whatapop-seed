import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ProductFilter } from '../product-filter';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy, OnInit {

  @Output() onSearch: EventEmitter<ProductFilter> = new EventEmitter();

  productFilter: ProductFilter = {};
  categories: Category[];
  private _categoriesSubscription: Subscription;

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoriesSubscription = this._categoryService
      .getCategories()
      .subscribe((data: Category[]) => this.categories = data);
  }

  ngOnDestroy(): void {
    this._categoriesSubscription.unsubscribe();
  }

  notifyHost(): void {
    this.onSearch.emit(this.productFilter);
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Red Wine Path                                                    |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Limpiamos todos los filtros a la vez                             |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  textReady(): void {
    this.notifyHost();
  }
  minPriceReady(): void {
    this.notifyHost();
  }
  maxPriceReady(): void {
    this.notifyHost();
  }

  clearSearch(): void {
    this.productFilter.text = null;
    this.productFilter.category = null;
    this.productFilter.state = null;
    this.productFilter.minPrice = null;
    this.productFilter.maxPrice = null;
    this.productFilter.sort = null;
    this.productFilter.order = null;
    this.onSearch.emit(this.productFilter);
  }

}
