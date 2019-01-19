import { combineReducers } from 'redux'
import getTypes from './getTypes'
import getPokemons from './getPokemons'

export default combineReducers({
  getPokemons,
  getTypes
})