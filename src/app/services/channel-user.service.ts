import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChannelDto } from '../dto/channel.dto';
import { MessageDto } from '../dto/message.dto';
import { UserInChannelDto } from '../dto/user-in-channel.dto';

@Injectable()
export class ChannelUserService {

  constructor(private http: HttpClient) {
  }

  getAllowedChannels(): Observable<ChannelDto[]> {
    return this.http.get<ChannelDto[]>('channels');
  }

  getAllowedChannelsMessages(): Observable<MessageDto[]> {
    return this.http.get<MessageDto[]>('messages');
  }

  getUsersInvitedToChannel(channelId: number): Observable<UserInChannelDto[]> {
    return this.http.get<UserInChannelDto[]>('invitations/' + channelId);
  }

  inviteUserToChannel(userInChannelDto: UserInChannelDto): Observable<Object> {
    return this.http.post('invitations', userInChannelDto);
  }

  removeUserFromChannel(userInChannelDto: UserInChannelDto): Observable<Object> {
    return this.http.delete('invitations/' + userInChannelDto.id);
  }

}
