import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    console.log('Prod:', this.products);
    window.scrollTo(0, 0);
  }

  goBack(): void {
    window.history.back();
  }

}
