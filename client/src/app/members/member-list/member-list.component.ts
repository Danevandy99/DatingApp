import { take } from 'rxjs/operators';
import { AccountService } from './../../_services/account.service';
import { UserParams } from './../../models/user-params';
import { Observable } from 'rxjs';
import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;

  constructor(
    private memberService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1))
      .subscribe(user => {
        this.user = user;
        this.userParams = new UserParams(user);
      })
  }

  ngOnInit(): void {
    // this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams)
      .subscribe(response => {
        this.members = response.result;
        this.pagination = response.pagination;
      })
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }

}
