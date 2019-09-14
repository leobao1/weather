import React, {Component} from 'react'
import Display from './Display'
import SearchList from './SearchList'
import axios from 'axios'
import {connect} from 'react-redux'
import {setWeather} from '../actions/weatherActions'
import {toggleSearch} from '../actions/searchActions'

// INPUT PERSONAL API KEY FOR OPENWEATHER
const api = '';

class WeatherModule extends Component {
    state = {
        location: '',
        temp: NaN,
        main: '',
        condition: '',
        valid_search: true
    }

    determineWeather = (data) =>{
        let weather_id = data.weather[0].id;
        let main_condition
        if (weather_id >= 200 && weather_id <= 232){
            main_condition = 'storm';
        } else if (weather_id >= 300 && weather_id <= 321){
            main_condition = 'drizzle';
        } else if (weather_id >= 500 && weather_id <= 531 && weather_id !== 511){
            main_condition = 'rain';
        } else if (weather_id === 511){
            main_condition = 'hail';
        } else if (weather_id === 600 || weather_id === 612 || weather_id === 615 || weather_id === 620) {
            main_condition = 'light_snow';
        } else if (weather_id === 601 || weather_id === 611 || weather_id === 613 || weather_id === 616 || weather_id === 621) {
            main_condition = 'snow';
        } else if (weather_id === 602 || weather_id === 622) {
            main_condition = 'heavy_snow';
        } else if (weather_id >= 701 && weather_id <= 781) {
            main_condition = 'cloud';
        } else if (weather_id === 800){
            //add heat warning check
            main_condition = 'sun';
        } else if (weather_id === 801){
            main_condition = 'mostly_sun';
        } else if (weather_id === 802 || weather_id === 803){
            main_condition = 'part_cloud';
        } else if (weather_id === 804){
            main_condition = 'cloud';
        }

        this.setState({
            temp: data.main,
            main: main_condition,
            condition: data.weather[0].description
        })
    }

    setLocation = (loc) =>{
        this.setState({
            location: loc
        })

        this.getData(loc)
    }

    determineSimilarity = (city, country, prop_loc) =>{
        const search_compare = prop_loc.replace(/\s+/g, '').toLowerCase();
        const retrieved_compare = (city + ',' + country).toLowerCase();
        
        return (search_compare === retrieved_compare);
    }

    getData = (search_loc) =>{
        let search = ('http://api.openweathermap.org/data/2.5/weather?q=' + search_loc + '&APPID=' + api);
            axios.get(search)
                .then(res =>{
                    console.log(res);
                    if (this.determineSimilarity(res.data.name, res.data.sys.country, search_loc)){
                        const location = (res.data.name + ', ' +  res.data.sys.country);
                        this.setState({
                            location,
                            valid_search: true
                        })
                        console.log(this.state)
                        this.determineWeather(res.data);
                    } else {
                        this.setState({
                            valid_search: false
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        valid_search: false
                    })
                    console.log(error.response);
                });
            this.props.toggleSearch(false);
    }

    render(){
        if(this.props.search === true){
            this.getData(this.props.location);
        }

        console.log(this.state);
        
        let display_component = (this.state.valid_search) ? (<Display data={this.state}/>) : (<SearchList searchTerm={this.props.location} setLocation={this.setLocation}/>);
        return(
            <div>
                {display_component}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        location: state.location,
        search: state.search
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setWeather: (temp, condition) => {dispatch(setWeather(temp, condition))},
        toggleSearch: (bool) => {dispatch(toggleSearch(bool))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherModule)