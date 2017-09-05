import {Injectable} from '@angular/core';
import * as SocketClient from 'socket.io-client';

import EventBus from '../events/event-bus';
import Events from '../events/events';

@Injectable()
export default class SocketUtil {
  socket: any;

  constructor(private bus: EventBus) {}

  connect() {
    return new Promise((resolve, reject) => {
      this.socket = SocketClient('ws://localhost:4000');

      this.socket.on('connect', () => {
        this.socket.on('INCIDENT_CHANGED', (data: any) => {
          this.incidentChange(data);
        });

        resolve();
      });
    });
  }

  incidentChange(data: any) {
    this.bus.events.next({
      type: Events.INCIDENT_CHANGED,
      incident: data.incident
    });
  }
}
