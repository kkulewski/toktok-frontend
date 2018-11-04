import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageSerivce: MessageService) { }

  messages: Models.Message[];

  ngOnInit() {
    this.fetchMessages();
  }

  private fetchMessages() {
    this.messageSerivce.getMessages().subscribe(
      (messages) => { this.messages = messages; },
      () => { console.log('Cannot fetch messages!'); }
    );
  }

}
