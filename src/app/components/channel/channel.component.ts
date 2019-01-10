import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChannelDto } from '../../dto/channel.dto';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: []
})
export class ChannelComponent implements OnInit {

  constructor(
    private channelService: ChannelService,
    private userService: UserService) { }

  channels: ChannelDto[] = [];

  channelName = '';

  isLogged(): boolean {
    return this.userService.isLogged();
  }

  ngOnInit() {
    this.fetchChannels();
  }

  private fetchChannels() {

    this.channelService.getAll().subscribe(
      (channels) => {
        this.channels = channels;
      },
      () => { console.log('Cannot fetch channels!'); }
    );

  }

  private createChannel() {

    const channel = {
      id: 0,
      name: this.channelName,
      userName: this.userService.getToken()
    };

    this.channelService.add(channel).subscribe(
      () => { console.log('Channel added!'); this.fetchChannels(); this.channelName = ''; },
      () => { console.log('Cannot add channel!'); } // on fail: log error
    );
  }

}
