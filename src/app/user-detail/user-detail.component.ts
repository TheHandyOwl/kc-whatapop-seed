import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User } from './../user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  private _userSubscription: Subscription;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Trae datos pero no los muestra en el template
    this._route.data.forEach((data: { user: User }) => this.user = data.user );
    console.log('Data: ', this._route.data);
    window.scrollTo(0, 0);
  }

  goBack(): void {
    window.history.back();
  }

}
