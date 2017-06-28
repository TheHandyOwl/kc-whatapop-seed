import { Injectable } from '@angular/core';

import { LocalStorageService } from 'ng2-webstorage';
import { ConfirmationService } from 'primeng/primeng';

import { Product } from './product';

@Injectable()
export class FavoriteService {

  constructor(
    private localStorage: LocalStorageService,
    private _confirmationService: ConfirmationService
    ) { }

  addFavorite(listaProductosId, productId: number): void {
    listaProductosId.push(productId);
    this.addFavorites(listaProductosId);
  }

  addFavorites(listaProductosId: number[]): void {
    this.localStorage.store('favorites', JSON.stringify(listaProductosId));
  }

  getFavorites() {
    return JSON.parse(this.localStorage.retrieve('favorites'));
  }

  delFavorite(favoritos: any[], productPosition: number): void {
    favoritos.splice(productPosition, 1);
    this.addFavorites(favoritos);
  }

  isFavorite(productoFavoritoId: number): boolean {
    let favorites: any[] = this.getFavorites();
    let position: number;

    if (favorites) {
      position = favorites.indexOf(productoFavoritoId);

      if (position === -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  switchFavorite(productoFavorito: Product): void {

    let favorites: any[] = this.getFavorites();
    let position: number;

    if (favorites) {
      position = favorites.indexOf(productoFavorito.id);

      if (position === -1) {
        this._confirmationService.confirm({
          message: `¿Deseas añadir '${productoFavorito.name}' a tu lista de favoritos?`,
          accept: () => this.addFavorite(favorites, productoFavorito.id)
        });
      } else {
        this._confirmationService.confirm({
          message: `¿Deseas eliminar '${productoFavorito.name}' de tu lista de favoritos?`,
          accept: () => this.delFavorite(favorites, position)
        });
      }
    } else {
      favorites = [];
      this.addFavorite(favorites, productoFavorito.id);
    }

  }
 
}
