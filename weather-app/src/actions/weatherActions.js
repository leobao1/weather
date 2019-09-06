export const setWeather = (temp, condition) =>{
    return {
        type: 'SET_WTHR',
        temp,
        condition
    }
}