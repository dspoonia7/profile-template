
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { App, Form1, Form2, Form3, Form4, Profile } from './components'

import 'jquery';
import 'bootstrap-loader';
import * as css from './assets/stylesheets/index.css'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Form1}/>
          <Route path="form2" component={Form2}/>
          <Route path="form3" component={Form3}/>
          <Route path="form4" component={Form4}/>
          <Route path="profile" component={Profile}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('template')
)
