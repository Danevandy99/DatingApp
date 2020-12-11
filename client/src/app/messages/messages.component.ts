import { MessageService } from './../_services/message.service';
import { Pagination } from './../models/pagination';
import { Message } from './../models/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  container = 'Outbox';
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe(response => {
        this.messages = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }

}
