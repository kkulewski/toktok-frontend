import { Component, OnInit } from '@angular/core';
import { MessageDto } from '../../dto/message.dto';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { ChannelDto } from '../../dto/channel.dto';
import { ChannelUserService } from 'src/app/services/channel-user.service';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: []
})
export class MessageComponent implements OnInit {

  // Angular injects MessageService into private field
  constructor(
    private messageService: MessageService,
    private channelUserService: ChannelUserService,
    private userService: UserService) { }

  // fetched messages (from API)
  messages: MessageDto[] = [];

  // fetched channels (from API)
  channels: ChannelDto[] = [];

  // new message data (from HTML input form)
  messageText: string;

  // currently selected channel
  selectedChannelName = '';

  // timer used for continuous API calls
  fetchMessagesTimer: Subscription;
  fetchChannelsTimer: Subscription;

  // flag indicating that API call is in progress
  isFetchingMessages: boolean;
  isFetchingChannels: boolean;

  // channel messages
  channelMessages(): MessageDto[] {
    return this.messages
      .filter(x => x.channelName === this.selectedChannelName)
      .sort((a, b) => new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime());
  }

  isLogged(): boolean {
    return this.userService.isLogged();
  }

  userName(): string {
    return this.userService.getStoredUserName();
  }

  ngOnInit() {
    // fetch channels every 2000 ms
    this.fetchChannelsTimer = timer(100, 2000).subscribe(() => { if (!this.isFetchingChannels) { this.fetchChannels(); }});
    // fetch messages every 500 ms
    this.fetchMessagesTimer = timer(500, 500).subscribe(() => { if (!this.isFetchingMessages) { this.fetchMessages(); }});
  }

  private fetchMessages() {

    if (!this.userService.isLogged()) {
      return;
    }

    this.isFetchingMessages = true;
    this.channelUserService.getAllowedChannelsMessages().subscribe(
      (messages) => {
        this.messages = messages;
        this.isFetchingMessages = false;
      },
      () => {
        console.log('Cannot fetch messages!');
        this.isFetchingMessages = false;
      }
    );
  }

  private fetchChannels() {

    if (!this.userService.isLogged()) {
      return;
    }

    this.isFetchingChannels = true;
    this.channelUserService.getAllowedChannels().subscribe(
      (channels) => {
        this.channels = channels;
        if (this.selectedChannelName === '' && this.channels[0]) { this.selectedChannelName = this.channels[0].name; }
        this.isFetchingChannels = false;
      },
      () => {
        console.log('Cannot fetch channels!');
        this.isFetchingChannels = false;
      }
    );
  }

  private sendMessage() {
    if (this.selectedChannelName === '') { return; }
    // create new message with form values
    const message: MessageDto = {
      id: 0,
      text: this.messageText,
      sentDate: new Date,
      userName: this.userService.getStoredUserName(), // overriden by backend
      channelName: this.selectedChannelName
    };
    // send new message to endpoint
    this.messageService.add(message).subscribe(
      () => { console.log('Message sent!'); this.fetchMessages(); this.messageText = ''; }, // on success: fetch messages
      () => { console.log('Cannot send message!'); } // on fail: log error
    );
  }

  private deleteMessage(message: MessageDto) {
    this.messageService.delete(message).subscribe(
      () => this.fetchMessages(),
      () => console.log('Error when deleting message!')
    );
  }

}
