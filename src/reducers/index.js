import {DATA_LOADED, SET_CITY, REMOVE_CITY} from "../constants/action-types";

const initialState = {
    allCities: [],
    selectedCity: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === SET_CITY) {
        return {...state, selectedCity: {...action.payload}, allCities: [...action.arrayOfCities]}
    }

    if (action.type === REMOVE_CITY) {
        return {...state, allCities: [...action.filteredArray]}
    }

    if (action.type === DATA_LOADED) {
        return {...state, allCities:[ ...action.payload]}
    }
    
    return state;
};

export default rootReducer;