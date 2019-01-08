import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // Angular injects MessageService into private field
  constructor(private messageSerivce: MessageService, private userService: UserService) { }

  // fetched messages (from endpoint)
  messages: Models.Message[];

  // new message data (from HTML input form)
  messageText: string;
  messageAuthor: string;

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
      id: '0',
      text: this.messageText,
      author: this.userService.getToken()
    };
    // send new message to endpoint
    this.messageSerivce.addMessage(message).subscribe(
      () => { console.log('Message sent!'); this.fetchMessages(); this.messageText = ''; }, // on success: fetch messages
      () => { console.log('Cannot send message!'); } // on fail: log error
    );
  }

}
