import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from './../models/user.model';
import { AppState, selectAuthState } from './../store/app.state';
import { Logout } from './../store/actions/auth.actions';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  user: User;
  getState: Observable<any>;
  isValid: boolean = false;

  constructor(private store: Store<AppState>) { 
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isValid = state.isValid;
      this.user = state.user;
    });
  }

  logout(): void {
    this.store.dispatch(new Logout);
  }

}
