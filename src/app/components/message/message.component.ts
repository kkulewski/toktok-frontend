import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // Angular injects MessageService into private field
  constructor(private messageSerivce: MessageService) { }

  // fetched messages (from endpoint)
  messages: Models.Message[];

  // new message data (from HTML input form)
  messageId: number;
  messageText: string;

  ngOnInit() {
    // fetch messages list
    this.fetchMessages();
  }

  private fetchMessages() {
    // fetch from endpoint (API)
    this.messageSerivce.getMessages().subscribe(
      (messages) => { this.messages = messages; }, // on success - assign messages
      () => { console.log('Cannot fetch messages!'); } // on fail - log error
    );
  }

  private sendMessage() {
    // create new message with form values
    const message = {
      id: this.messageId.toString(),
      text: this.messageText
    };
    // send new message to endpoint
    this.messageSerivce.addMessage(message).subscribe(
      () => { console.log('Message sent!'); this.fetchMessages(); }, // on success: fetch messages
      () => { console.log('Cannot send message!'); } // on fail: log error
    );
  }

}
