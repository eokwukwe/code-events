import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import './index.css';
import App from './app/layout/App';

import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/util/ScrollToTop';

const store = configureStore();

// Configure hotmodule replacement
const rootEl = document.getElementById('root');
const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<ScrollToTop />
				<ReduxToastr
					position="top-right"
					transitionIn="fadeIn"
					transitionOut="fadeOut"
					timeOut={2000}
				/>
				<App />
			</BrowserRouter>
		</Provider>,
		rootEl,
	);
};

if (module.hot) {
	module.hot.accept('./app/layout/App', () => setTimeout(render));
}

store.firebaseAuthIsReady.then(() => render());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
