import { Observable } from 'rxjs';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { ChildActivationStart, Router } from '@angular/router';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = { };
  loggedIn: boolean;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {  }

  login(): void {
    this.accountService.login(this.model)
      .subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/members');
      });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}