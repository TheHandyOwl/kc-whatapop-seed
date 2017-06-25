import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Product } from './product';
import { BackendUri } from './app-settings';

@Injectable()
export class SoldProductsResolveService implements Resolve<Product[]> {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri) { }

  resolve(
    route: ActivatedRouteSnapshot
    ): Observable<Product[]> {

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Yellow Path                                                      |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Aquí toca hacer varias cosas:                                    |
    |                                                                  |
    | 1. Necesitamos obtener aquellos productos que están vendidos; es |
    |    decir, aquellos cuyo 'state' es 'sold'. Quizá te ayude el     |
    |    modelo 'ProductFilter'.                                       |
    |                                                                  |
    | 2. Debemos retornar el observable que contiene la colección de   |
    |    productos vendidos. Toca ir a servidor a través del servicio  |
    |    ProductService, que tendrás que inyectar como dependencia.    |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    //return null;
    const queryParams = new URLSearchParams();
    queryParams.set('_sort', 'publishedDate');
    queryParams.set('_order', 'DESC');
    queryParams.set('state', 'sold');

    const options = new RequestOptions({params: queryParams});

    return this._http
      .get(`${this._backendUri}/products`, options)
      .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
  }

}
