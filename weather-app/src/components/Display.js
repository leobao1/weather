import React from 'react'


const importAll = (r) =>{
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

const capitilizeCondition = (str) =>{
    return str.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}

const Display = (props) =>{
    const images = importAll(require.context('../sprites', false, /\.(png|jpe?g|svg)$/));
    console.log(props.data);
    

    let return_value = (props.data.location !== '') ? (
        <div className="center">
            <h2 className="white-text">{props.data.location}</h2>
            <img src={images[props.data.main + '.png']} alt={props.data.main} height='300px'/>
            <p className="white-text">{capitilizeCondition(props.data.condition)}</p>
            <p className="white-text">Temperature: {parseInt(props.data.temp.temp - 273.15)} °C</p>
            <p className="white-text">High of: {parseInt(props.data.temp.temp_max - 273.15)} °C | Low of: {parseInt(props.data.temp.temp_min - 273.15)} °C</p>
            <p className="white-text">Humidity: {props.data.temp.humidity}%</p>
            <p className="white-text">Pressure: {props.data.temp.pressure} hPa</p>
        </div>
    ) : (
        <div className="center">
            <p className="white-text">Choose a Location</p>
        </div>
        
    )
    
    return (
       <div className="container">
           {return_value}
       </div>
    )
}

export default Display;