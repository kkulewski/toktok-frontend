import { Component, OnInit } from '@angular/core';
import { ChannelDto } from '../../dto/channel.dto';
import { MessageDto } from '../../dto/message.dto';
import { ChannelService } from '../../services/channel.service';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: []
})
export class ChannelComponent implements OnInit {

  constructor(
    private channelService: ChannelService,
    private messageService: MessageService,
    private userService: UserService) { }

  channels: ChannelDto[] = [];

  messages: MessageDto[] = [];

  channelName = '';

  errorMessage = '';

  isLogged(): boolean {
    return this.userService.isLogged();
  }

  sortedChannels(): ChannelDto[] {
    return this.channels.sort((c1, c2) => this.channelMessagesCount(c2) - this.channelMessagesCount(c1));
  }

  ngOnInit() {
    this.fetchChannels();
    this.fetchMessages();
  }

  private fetchChannels() {
    this.channelService.getAll().subscribe(
      (channels) => {
        this.channels = channels;
      },
      () => { console.log('Cannot fetch channels!'); }
    );
  }

  private fetchMessages() {
    this.messageService.getAll().subscribe(
      (messages) => {
        this.messages = messages;
      },
      () => { console.log('Cannot fetch messages!'); }
    );
  }

  private createChannel() {
    const channel = {
      id: 0,
      name: this.channelName,
      userName: this.userService.getToken()
    };

    this.channelService.add(channel).subscribe(
      () => { this.fetchChannels(); this.channelName = ''; this.errorMessage = ''; },
      () => { this.errorMessage = 'Channel ' + channel.name + ' already exists.'; }
    );
  }

  private deleteChannel(channel: ChannelDto) {
    this.channelService.delete(channel).subscribe(
      () => this.fetchChannels(),
      () => console.log('Error when deleting channel!')
    );
  }

  private channelMessagesCount(channel: ChannelDto): number {
    return this.messages
      .filter(msg => msg.channelName === channel.name)
      .length;
  }

}
