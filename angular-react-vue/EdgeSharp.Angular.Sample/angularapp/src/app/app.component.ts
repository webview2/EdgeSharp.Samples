import { Component } from '@angular/core';
import { ServiceConfig } from './services/service.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  _ipcoption: string = '';

  constructor(private _serviceConfig: ServiceConfig) { 
  }

  public changeIpcOption(ipcOption: string) {
    this._serviceConfig.ipcoption = ipcOption;
    this._ipcoption =  this._serviceConfig.ipcoption;
  }

  ngOnInit(): void {
    this._ipcoption =  this._serviceConfig.ipcoption;
  }
}
