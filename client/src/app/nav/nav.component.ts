import { Observable } from 'rxjs';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = { };
  loggedIn: boolean;

  constructor(
    public accountService: AccountService
  ) { }

  ngOnInit(): void {  }

  login(): void {
    this.accountService.login(this.model)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  logout(): void {
    this.accountService.logout();
  }
}
