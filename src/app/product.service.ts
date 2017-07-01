import { Inject, Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BackendUri } from './app-settings';
import { Product } from './product';
import { ProductFilter } from './product-filter';

@Injectable()
export class ProductService {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri) { }

  getProducts(filter: ProductFilter = undefined): Observable<Product[]> {

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pink Path                                                        |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pide al servidor que te retorne los productos ordenados de más   |
    | reciente a menos, teniendo en cuenta su fecha de publicación.    |
    |                                                                  |
    | En la documentación de 'JSON Server' tienes detallado cómo hacer |
    | la ordenación de los datos en tus peticiones, pero te ayudo      |
    | igualmente. La querystring debe tener estos parámetros:          |
    |                                                                  |
    |   _sort=publishedDate&_order=DESC                                |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Red Path                                                         |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pide al servidor que te retorne los productos filtrados por      |
    | texto y/ por categoría.                                          |
    |                                                                  |
    | En la documentación de 'JSON Server' tienes detallado cómo       |
    | filtrar datos en tus peticiones, pero te ayudo igualmente. La    |
    | querystring debe tener estos parámetros:                         |
    |                                                                  |
    |   - Búsqueda por texto:                                          |
    |       q=x (siendo x el texto)                                    |
    |   - Búsqueda por categoría:                                      |
    |       category.id=x (siendo x el identificador de la categoría)  |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Yellow Path                                                      |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pide al servidor que te retorne los productos filtrados por      |
    | estado.                                                          |
    |                                                                  |
    | En la documentación de 'JSON Server' tienes detallado cómo       |
    | filtrar datos en tus peticiones, pero te ayudo igualmente. La    |
    | querystring debe tener estos parámetros:                         |
    |                                                                  |
    |   - Búsqueda por estado:                                         |
    |       state=x (siendo x el estado)                               |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Red Wine Path                                                    |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Añadimos las neuvas condiciones de filtrado                      |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Brick Red Path                                                   |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Añadimos filtro de vendedor                                      |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    const queryParams = new URLSearchParams();
    queryParams.set('_sort', 'publishedDate');
    queryParams.set('_order', 'DESC');

    if ( filter ) {
      if ( filter.text ) {
        queryParams.set('q', filter.text);
      }
      if ( filter.category && filter.category !== '0' ) {
        queryParams.set('category.id', filter.category);
      }
      if ( filter.state && filter.state !== '-') {
        queryParams.set('state', filter.state);
      }
      if (
        (filter.minPrice && +filter.minPrice % 1 === 0)
        &&
        (filter.maxPrice && +filter.maxPrice % 1 === 0)
        &&
        (+filter.minPrice > +filter.maxPrice)
      ) {
        const tempPrice = filter.maxPrice;
        filter.maxPrice = filter.minPrice;
        filter.minPrice = tempPrice;
      }
      if ( filter.minPrice && +filter.minPrice % 1 === 0 ) {
        queryParams.set('price_gte', filter.minPrice.toString());
      }
      if ( filter.maxPrice && +filter.maxPrice % 1 === 0 ) {
        queryParams.set('price_lte', filter.maxPrice.toString());
      }
      if ( filter.sort && filter.sort !== '-') {
        queryParams.set('_sort', filter.sort);
      }
      if ( filter.order && filter.order !== '-') {
        queryParams.set('_order', filter.order);
      }
      if ( filter.seller && +filter.seller % 1 === 0) {
        queryParams.set('seller.id', filter.seller);
      }

    }

    const options = new RequestOptions({params: queryParams});

    return this._http
      .get(`${this._backendUri}/products`, options)
      .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
  }

  getProduct(productId: number): Observable<Product> {
    return this._http
      .get(`${this._backendUri}/products/${productId}`)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  buyProduct(productId: number): Observable<Product> {
    const body: any = { 'state': 'sold' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  setProductAvailable(productId: number): Observable<Product> {
    const body: any = { 'state': 'selling' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

}
