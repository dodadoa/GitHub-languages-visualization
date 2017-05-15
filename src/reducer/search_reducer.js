import { START_FETCH_GITHUB, FETCH_GITHUB_SUCCESS, LOAD_REPOSITORIES, REMOVE_FETCHED_DATA } from '../actions/types.js';

export default function poll(state={ data: []}, action){
  switch (action.type) {
    case START_FETCH_GITHUB:
      return { ...state, isFetch: true }
    case FETCH_GITHUB_SUCCESS:
      return { ...state, isFetch: false, data: action.payload, animation: true, isSearched: true}
    case LOAD_REPOSITORIES:
      return { ...state, data: action.payload, animation: false}
    case REMOVE_FETCHED_DATA:
      return { ...state, data: [], isSearched: false}
    default:
      return state
  }
}
