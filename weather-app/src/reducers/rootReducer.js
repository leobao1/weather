const initState = {
    temp: NaN,
    condition: null,
    location: '',
    search: false
}

const rootReducer = (state=initState, action) =>{
    if (action.type === 'SET_LOC'){
        return {
            ...state,
            location: action.location
        }
    } else if (action.type === 'SET_WTHR'){
        return {
            ...state,
            temp: action.temp,
            condition: action.condition
        }
    } else if (action.type === 'TOGGLE'){
        return {
            ...state,
            search: action.bool
        }
    }
    return state;
}

export default rootReducer;