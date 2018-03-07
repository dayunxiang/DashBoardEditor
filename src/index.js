import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import LoadableApp from './LoadApp'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            {/* <App/> */}
            <LoadableApp/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
