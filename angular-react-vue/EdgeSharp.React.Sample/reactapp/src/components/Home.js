import React from 'react';
import { useState, useEffect } from 'react';
import { actionClientGet } from '../services/ActionControllerClientService.js';

export default function Home() {

  const [sdkVersion, setSdkVersion] = useState('');
  const [runtimeVersion, setRuntimeVersion] = useState('');

  const getInfoCallback = (res) => {
    setSdkVersion(res.sdk);
    setRuntimeVersion(res.runtime);
  };

  const getInfo = () => {
    actionClientGet('http://edgesharp.com/info', getInfoCallback);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      <div className="text-center mt-5">
        <h1 className="display-3">EdgeSharp</h1>
        <p className="lead text-muted">Build .NET Win32/WinForms/WPF WebView2 HTML5 Desktop Apps</p>

        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td><small className="text-muted">WebView2 SDK Version: {sdkVersion}</small></td>
                </tr>
                <tr>
                  <td><small className="text-muted text-primary">WebView2 Runtime Version: {runtimeVersion}</small></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="text-center">
            <a href="https://github.com/edgesharp/EdgeSharp" className="btn btn-primary btn-sm" role="button" style={{margin: '5px'}}>more info</a>
        </div>
      </div>
  </div>
  );
}