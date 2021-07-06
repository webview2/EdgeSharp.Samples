import { Injectable } from '@angular/core';
import { ServiceConfig } from './service.config';

declare var executeHostObject: any;
declare var executePostMessage: any;
declare var executeHttpClient: any;


@Injectable({
  providedIn: 'root'
})
export class ActionClientService {

  constructor(private _serviceConfig: ServiceConfig) { 
  }

    public execute(url: string) {
      this.executeLocal(url, null, null, null);
    }

    public get(url: string, callback: Function, onErrorCallback = null) {
      this.executeLocal(url, null, callback, onErrorCallback);
    }

    public post(url: string, request: any, callback: Function, onErrorCallback = null) {
      this.executeLocal(url, request, callback, onErrorCallback);
    }
      /*
    * There are 3 IPC options, developers can choose amongst the options.
    * 1. Host object
    * 2. HtttpClient - Ajax/XHR calls
    * 3. Post Message 
    */
   private executeLocal(url: string, request: any, callback: any, onErrorCallback: any) {

      if (this._serviceConfig.ipcoption === 'httpclient') {
        executeHttpClient(url, request, callback, onErrorCallback);
      } else if (this._serviceConfig.ipcoption === 'postmessage') {
          executePostMessage(url, request, callback, onErrorCallback);
      } else {
          executeHostObject(url, request, callback, onErrorCallback);
      }
    }
}