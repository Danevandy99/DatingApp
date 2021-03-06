import { PresenceService } from './_services/presence.service';
import { AccountService } from './_services/account.service';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;

  constructor(
    private accountService: AccountService,
    private presence: PresenceService
  ) { }

  ngOnInit(): void {
    this.setCurrenUser();
  }

  setCurrenUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
      this.accountService.refreshUser().subscribe((partialUser: Partial<User>) => {
        this.accountService.setCurrentUser({
          ...user,
          ...partialUser
        });
      });
    }
  }
}
