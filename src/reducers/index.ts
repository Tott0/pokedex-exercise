import { combineReducers } from 'redux'
import selectedColor from './selectedColor'
import getColors from './getColors'

export default combineReducers({
  selectedColor,
  getColors
})