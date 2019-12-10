import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

// Configure hotmodule replacement
const rootEl = document.getElementById('root');
const render = () => ReactDOM.render(<App />, rootEl);

if (module.hot) {
	module.hot.accept('./app/layout/App', () => setTimeout(render));
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
