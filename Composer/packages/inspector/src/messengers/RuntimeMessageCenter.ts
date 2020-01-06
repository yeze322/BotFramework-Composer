// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import io from 'socket.io-client';
import { Observable } from 'rxjs';

import { RuntimeProjectData, TriggerData, ActionData } from './RuntimeMessageTypes';
import { LoadProject, HitTrigger, HitAction } from './RuntimeSocketEvents';

type EventMiddleware = (eventName: string, eventPayload: any) => void;

export default class RuntimeMessageCenter {
  private runtimeUrl = 'http://localhost:4001';
  private socket: SocketIOClient.Socket;
  private onEventMiddleware?: EventMiddleware;

  projectChanged$: Observable<RuntimeProjectData>;
  triggerChanged$: Observable<TriggerData>;
  actionChanged$: Observable<ActionData>;

  constructor(onEventMiddleware?: EventMiddleware) {
    this.onEventMiddleware = onEventMiddleware;
    this.socket = io(this.runtimeUrl);

    this.projectChanged$ = this.observeSocketEvent<RuntimeProjectData>(LoadProject);
    this.triggerChanged$ = this.observeSocketEvent<TriggerData>(HitTrigger);
    this.actionChanged$ = this.observeSocketEvent<ActionData>(HitAction);
  }

  private observeSocketEvent = <T>(eventName) => {
    const observable = new Observable<T>(observer => {
      this.socket.on(eventName, payload => {
        this.onEventMiddleware && this.onEventMiddleware(eventName, payload);
        return observer.next(payload);
      });
    });
    return observable;
  };
}
