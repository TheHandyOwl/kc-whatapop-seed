import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { User } from './../user';
import { UserService } from './../user.service';
import { Product } from './../product';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  products: Product[];

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('##################################################');
    console.log('##################################################');
    console.log('###');
    console.log('###   GOOGLE MAPS WARNING!!!');
    console.log('###   Not an error, just configuration: Google Maps needs an API key.');
    console.log('###   Configure YOUR_KEY en app.module.ts');
    console.log('###   Go to:');
    console.log('###   https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key');
    console.log('###   Have fun!');
    console.log('###');
    console.log('##################################################');
    console.log('##################################################');

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Brick Red Path                                                   |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Lo importante                                                    |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    this._route.params.subscribe((params) => {
      const userId = +params['userId'];
      this._userService.getUser(userId)
                        .subscribe((data) => {
                          this.user = data;
                        });
    });
    this._route.data.forEach((data: { products: Product[] }) => this.products = data.products);
    window.scrollTo(0, 0);
  }

  goBack(): void {
    window.history.back();
  }

}
