import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { Ng2Webstorage } from 'ng2-webstorage';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BackendUriProvider } from './app-settings';
import { CategoryService } from './category.service';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsResolveService } from './product-details-resolve.service';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductResetComponent } from './product-reset/product-reset.component';
import { ProductService } from './product.service';
import { ProductsCollectionComponent } from './products-collection/products-collection.component';
import { SoldProductsResolveService } from './sold-products-resolve.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './user.service';
import { PublicationDatePipe } from './publication-date.pipe';
import { ProductFavoriteComponent } from './product-favorite/product-favorite.component';
import { FavoriteService } from './favorite.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolveService } from 'app/user-detail-resolve.service';
import { ProductsCollectionListComponent } from './products-collection-list/products-collection-list.component';
import { ItemsStatePipe } from './items-state.pipe';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Blue Path                                                        |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| No olvides declarar PublicationDatePipe en el módulo.            |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductFilterComponent,
    ProductResetComponent,
    ProductComponent,
    ProductsCollectionComponent,
    UserProfileComponent,
    PublicationDatePipe,
    ProductFavoriteComponent,
    UserDetailComponent,
    ProductsCollectionListComponent,
    ItemsStatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ConfirmDialogModule,
    AppRoutingModule,
    Ng2Webstorage,
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Google Maps Path                                                 |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Como el usuario tenía latitud y longitud lo he aprovechado       |
    | Notas:                                                           |
    |  - Funcionar, funciona. Pero necesita de una apiKey de goole     |
    |  - Por tiempo no saco esta apiKey a una variable                 |
    |  ya que la percepción de error / no disponible sería la misma    |
    |  - Más info                                                      |
    |     https://angular-maps.com/guides/getting-started/             |
    |  - Si hay tiempo ver comentario de kyranjamie en                 |
    |     https://github.com/SebastianM/angular-google-maps/issues/882 |
    |  - Que lleva a                                                   |
    |     https://github.com/ArikMaor/extended-define-webpack-plugin   |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_API'
    })

  ],
  providers: [
    BackendUriProvider,
    CategoryService,
    ConfirmationService,
    ProductDetailsResolveService,
    ProductService,
    SoldProductsResolveService,
    UserService,
    FavoriteService,
    UserDetailResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
