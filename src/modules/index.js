import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import editor from './editor'
import translator from './translator'
import amarillo from './amarillo'

export default combineReducers({
  routing: routerReducer,
  counter,
  editor,
  translator,
  amarillo
})