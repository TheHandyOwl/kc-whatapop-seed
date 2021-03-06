import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsResolveService } from './product-details-resolve.service';
import { ProductResetComponent } from './product-reset/product-reset.component';
import { ProductsCollectionComponent } from './products-collection/products-collection.component';
import { SoldProductsResolveService } from './sold-products-resolve.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolveService } from './user-detail-resolve.service';
const routes: Routes = [
  {
    path: 'products',
    component: ProductsCollectionComponent
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent,
    resolve: {
      product: ProductDetailsResolveService
    }
  },
  {
    path: 'reset',
    component: ProductResetComponent,
    resolve: {
      products: SoldProductsResolveService
    }
  },

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Brick Red Path                                                   |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Ruta nueva para los usuarios, que muestra                        |
  |  - Objetos de este usuario que tenemos marcados como favoritos   |
  |  - Objetos en venta de este usuario                              |
  |  - Objetos vendidos por este usuario                             |
  |  - Todos los objetos de este usuario                             |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  {
    path: 'users/:userId',
    component: UserDetailComponent,
    resolve: {
      products: UserDetailResolveService
    }
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
