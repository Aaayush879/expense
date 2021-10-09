
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';
import Provider from './compenent/Context';
import App from "./App";
import './index.css';




ReactDOM.render(
  
    <div>
      <SpeechProvider appId="84562cb1-87d6-45ca-914c-dd56f2a390e0" language="en-US">
    <Provider>
      <App style={{opacity:'0.3'}} />
    </Provider>
  </SpeechProvider>
    </div>,

  
    
  
  document.getElementById('root'),
);
