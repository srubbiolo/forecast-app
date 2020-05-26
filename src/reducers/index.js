import { SELECT_HERO, DATA_LOADED, HERO_LOADED, SET_CITY, REMOVE_CITY} from "../constants/action-types";

const initialState = {
    selectedHero: {},
    allHeroes: [],
    allCities: [],
    selectedCity: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === SELECT_HERO) {
        return {...state, selectedHero: {...action.payload.hero} }
    }

    if (action.type === SET_CITY) {
        return {...state, selectedCity: {...action.payload}, allCities: [...action.arrayOfCities]}
    }

    if (action.type === REMOVE_CITY) {
        return {...state, allCities: [...action.filteredArray]}
    }

    if (action.type === DATA_LOADED) {
        return {...state, allCities:[ ...action.payload]}
    }

    if (action.type === HERO_LOADED) {
        return {...state, selectedHero: {...action.payload} }
    }
    
    return state;
};

export default rootReducer;