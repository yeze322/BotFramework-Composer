// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import io from 'socket.io-client';
import { Observable } from 'rxjs';

import { RuntimeProjectData } from './RuntimeMessageTypes';
import { LoadProject, HitTrigger, HitAction, BotResponse, UserInput } from './RuntimeSocketEvents';
import { RuntimeUrl } from './config';

type EventMiddleware = (eventName: string, eventPayload: any) => void;

export default class RuntimeMessageCenter {
  private runtimeUrl = RuntimeUrl;
  private socket: SocketIOClient.Socket;
  private onEventMiddleware?: EventMiddleware;

  projectChanged$: Observable<RuntimeProjectData>;
  triggerChanged$: Observable<string>;
  actionChanged$: Observable<string>;
  botResponse$: Observable<string>;
  userInput$: Observable<string>;

  constructor(onEventMiddleware?: EventMiddleware) {
    this.onEventMiddleware = onEventMiddleware;
    this.socket = io(this.runtimeUrl);

    this.projectChanged$ = this.observeSocketEvent<RuntimeProjectData>(LoadProject);
    this.triggerChanged$ = this.observeSocketEvent<string>(HitTrigger);
    this.actionChanged$ = this.observeSocketEvent<string>(HitAction);
    this.botResponse$ = this.observeSocketEvent<string>(BotResponse);
    this.userInput$ = this.observeSocketEvent<string>(UserInput);
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
