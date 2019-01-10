import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChannelDto } from '../dto/channel.dto';

@Injectable()
export class ChannelService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ChannelDto[]> {
    return this.http.get<ChannelDto[]>('channel');
  }

  add(channel: ChannelDto): Observable<Object> {
    return this.http.post('channel', channel);
  }

}
