import { Component, OnInit } from '@angular/core';
import { MessageDto } from '../../dto/message.dto';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dto/user.dto';
import { ChannelDto } from '../../dto/channel.dto';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: []
})
export class MessageComponent implements OnInit {

  // Angular injects MessageService into private field
  constructor(
    private messageService: MessageService,
    private channelService: ChannelService,
    private userService: UserService) { }

  // fetched messages (from endpoint)
  messages: MessageDto[] = [];

  // fetched channels (from endpoint)
  channels: ChannelDto[] = [];

  // new message data (from HTML input form)
  messageText: string;

  // currently selected channel
  selectedChannelName = '';

  // channel messages
  channelMessages(): MessageDto[] {
    return this.messages
      .filter(x => x.channelName === this.selectedChannelName)
      .sort((a, b) => new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime());
  }

  isLogged(): boolean {
    return this.userService.isLogged();
  }

  ngOnInit() {
    // fetch messages and channel list
    this.fetchMessages();
    this.fetchChannels();
  }

  private fetchMessages() {
    // fetch from endpoint (API)
    this.messageService.getAll().subscribe(
      (messages) => { this.messages = messages; }, // on success - assign messages
      () => { console.log('Cannot fetch messages!'); } // on fail - log error
    );
  }

  private fetchChannels() {
    // fetch from endpoint (API)
    this.channelService.getAll().subscribe(
      (channels) => {
        this.channels = channels;
        this.selectedChannelName = this.channels[0].name;
      },
      () => { console.log('Cannot fetch channels!'); }
    );
  }

  private sendMessage() {
    // create new message with form values
    const message = {
      id: 0,
      text: this.messageText,
      sentDate: new Date,
      userName: this.userService.getToken(),
      channelName: this.selectedChannelName
    };
    // send new message to endpoint
    this.messageService.add(message).subscribe(
      () => { console.log('Message sent!'); this.fetchMessages(); this.messageText = ''; }, // on success: fetch messages
      () => { console.log('Cannot send message!'); } // on fail: log error
    );
  }

}
