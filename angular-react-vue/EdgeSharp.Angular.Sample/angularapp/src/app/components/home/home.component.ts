import { Component, OnInit, NgZone } from '@angular/core';
import { ActionClientService } from '../../services/action.controller.client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _sdkVersion: string = '';
  _runtimeVersion: string = '';

  constructor(private _actionClientService: ActionClientService,
             private _zone: NgZone) { 

  }

  public reload() {
    this._actionClientService.execute('http://edgesharp.com/reload');
    return false;
  }

  ngOnInit(): void {
    this._actionClientService.get('http://edgesharp.com/info',  (data: any) => {
      this._zone.run(
          () => {
            this._sdkVersion = data.sdk;
            this._runtimeVersion = data.runtime;
          })
    });
  }
}
