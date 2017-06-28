import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { FavoriteService } from './../favorite.service';

@Component({
  selector: 'app-product-favorite',
  templateUrl: './product-favorite.component.html',
  styleUrls: ['./product-favorite.component.css']
})
export class ProductFavoriteComponent {

  @Input() data: Product;

  constructor(
    private _route: ActivatedRoute,
    private _favoriteService: FavoriteService
  ) { }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | White Broken Path                                                |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Activa el cambio de estado del favorito                          |
  | También comprubea si es favorito o no, para mostrar los botones  |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  notificarFavorito(productoFavorito: Product) {
    this._favoriteService.switchFavorite(productoFavorito);
  }

  isFavorite (productoFavoritoId: number) {
   return this._favoriteService.isFavorite(productoFavoritoId);
  }

}
