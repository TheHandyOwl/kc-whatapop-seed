import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './../product';
import { ProductFilter } from './../product-filter';

@Component({
  selector: 'app-products-collection-list',
  templateUrl: './products-collection-list.component.html',
  styleUrls: ['./products-collection-list.component.css']
})
export class ProductsCollectionListComponent {

  @Input() products: Product[];
  @Input() itemsList: ProductFilter;

  constructor( private _router: Router ) { }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Green Path                                                       |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Maneja el evento del componente ProductComponent que indica la   |
  | selección de un producto y navega a la dirección correspondiente.|
  | Recuerda que para hacer esto necesitas inyectar como dependencia |
  | el Router de la app. La ruta a navegar es '/products', pasando   |
  | como parámetro el identificador del producto.                    |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  comprarProducto(productoRecibido: Product): void {
    this._router.navigate(['products', JSON.stringify(productoRecibido.id)]);
  }

}
