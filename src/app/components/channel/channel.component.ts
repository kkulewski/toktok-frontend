import { Component, OnInit } from '@angular/core';
import { ChannelDto } from '../../dto/channel.dto';
import { MessageDto } from '../../dto/message.dto';
import { ChannelService } from '../../services/channel.service';
import { UserService } from '../../services/user.service';
import { ChannelUserService } from 'src/app/services/channel-user.service';
import { UserInChannelDto } from 'src/app/dto/user-in-channel.dto';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: []
})
export class ChannelComponent implements OnInit {

  constructor(
    private channelService: ChannelService,
    private channelUserService: ChannelUserService,
    private userService: UserService) { }

  channels: ChannelDto[] = [];

  messages: MessageDto[] = [];

  invitations: UserInChannelDto[] = [];

  channelName = '';

  userNameToInvite = '';

  errorMessage = '';

  isLogged(): boolean {
    return this.userService.isLogged();
  }

  sortedChannels(): ChannelDto[] {
    return this.channels.sort((c1, c2) => this.channelMessagesCount(c2) - this.channelMessagesCount(c1));
  }

  ngOnInit() {
    this.fetchChannels();
  }

  private fetchChannels() {
    this.invitations = [];
    this.channelUserService.getAllowedChannels().subscribe(
      (channels) => {
        this.channels = channels.filter(x => x.userName === this.userService.getStoredUserName());
        this.fetchMessages();
        this.fetchInvitations();
      },
      () => console.log('Cannot fetch channels!')
    );
  }

  private fetchMessages() {
    this.channelUserService.getAllowedChannelsMessages().subscribe(
      (messages) => {
        this.messages = messages;
      },
      () => { console.log('Cannot fetch messages!'); }
    );
  }

  private fetchInvitations() {
    this.channels.forEach(element => {
      this.channelUserService.getUsersInvitedToChannel(element.id).subscribe(
        (invitations) => {
          this.invitations = this.invitations
            .concat(invitations) // add element invitations
            .filter((v, i, self) => self.map(x => x.id).indexOf(v.id) === i); // filter duplicates
        },
        () => console.log('Cannot fetch ' + element.name + ' invitations!')
      );
    });
  }

  private createChannel() {
    const channel = {
      id: 0,
      name: this.channelName,
      userName: this.userService.getStoredUserName() // overriden by backend
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

  private channelInvitations(channel: ChannelDto): UserInChannelDto[] {
    return this.invitations.filter(inv => inv.channelName === channel.name);
  }

  private kick(invitation: UserInChannelDto) {
    this.channelUserService.removeUserFromChannel(invitation).subscribe(
      () => this.fetchChannels(),
      () => console.log('Error when removing user from channel!')
    );
  }

  private invite(channel: ChannelDto) {
    const invitation: UserInChannelDto = {
      id: 0,
      userName: this.userNameToInvite,
      channelName: channel.name
    };

    this.channelUserService.inviteUserToChannel(invitation).subscribe(
      () => {
        this.fetchChannels();
        this.userNameToInvite = '';
      },
      () => console.log('Error when inviting user to channel!')
    );
  }

}
