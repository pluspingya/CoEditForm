import 'materialize-css/dist/css/materialize.min.css'
import './style/main.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import Form from './components/Form'
import reducers from './reducers'

window.onload = () => {
    console.log('start')
    const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

    ReactDOM.render(
        <Provider store={store}>
            <Form />
        </Provider>, 
        document.getElementById('root')
    )
}

