import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

import { FavoriteService } from './favorite.service';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Brick Red Path                                                   |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| ItemsStatePipe juega con el estado para mostrar o no productos   |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

@Pipe({
  name: 'itemsState'
})
export class ItemsStatePipe implements PipeTransform {

  constructor (private _favoriteService: FavoriteService) { }

  transform(products: Product[], itemsList?: String): Product[] {
    if (typeof products !== 'undefined') {
      return products.filter(product => {
        if (!itemsList) {
          return true;
        } else if (itemsList === 'favorite') {
          return this.isFavorite(product.id);
        } if (product.state === itemsList) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  isFavorite (productoFavoritoId: number) {
   return this._favoriteService.isFavorite(productoFavoritoId);
  }

}
