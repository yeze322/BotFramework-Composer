// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import io from 'socket.io-client';
import { Observable } from 'rxjs';

import { RuntimeProjectData, TriggerData, ActionData } from './RuntimeMessageTypes';
import { LoadProject, HitTrigger, HitAction } from './RuntimeSocketEvents';

export default class RuntimeMessageCenter {
  private runtimeUrl = 'http://localhost:4001';
  private socket: SocketIOClient.Socket;

  projectChanged$: Observable<RuntimeProjectData>;
  triggerChanged$: Observable<TriggerData>;
  actionChanged$: Observable<ActionData>;

  constructor() {
    this.socket = io(this.runtimeUrl);

    this.projectChanged$ = this.observeSocketEvent<RuntimeProjectData>(LoadProject);
    this.triggerChanged$ = this.observeSocketEvent<TriggerData>(HitTrigger);
    this.actionChanged$ = this.observeSocketEvent<ActionData>(HitAction);
  }

  private observeSocketEvent = <T>(eventName) => {
    const observable = new Observable<T>(observer => {
      this.socket.on(eventName, payload => observer.next(payload));
    });
    return observable;
  };
}
