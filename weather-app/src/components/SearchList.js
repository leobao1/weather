import React, {Component} from 'react'
import axios from 'axios'

class SearchList extends Component{
    state = {
        search_list: [],
        search_term: ''
    }

    capitilize = (str) =>{
        return str.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }

    handleClick = (e) =>{
        e.preventDefault();
        this.props.setLocation(e.target.innerText)
    }

    createLinks(){
        let search = this.props.searchTerm.replace(/\s+/g, '').toLowerCase();
        if (search !== this.state.search_term){
            axios.get('./city_list.json')
                .then(res =>{
                    let search_list = res.data.reduce((acc, city) =>{
                        let city_name = (city.name + ', ' + city.country).toLowerCase();
                        if (city_name.startsWith(search)){
                            acc.push(
                                <a href="/" className="collection-item" key={city.id} onClick={this.handleClick}>{city.name}, {city.country}</a>
                            )
                        }
                        return acc;
                    }, [])
                    console.log('finished search')
                    this.setState({
                        search_list,
                        search_term: search
                    })
                })
                .catch(error => {
                    console.log(error)
                    console.log('hey')
                });
        }
    }

    render() {
        this.createLinks();
        
        let search = this.props.searchTerm.replace(/\s+/g, '').toLowerCase();
        let return_comp = (search !== this.state.search_term) ? (
            <h4 className="white-text">Please wait...</h4>
        ) : (
            <React.Fragment>
                <h4 className="white-text">Search Results for: {this.state.search_term}</h4>
                <div className="collection">
                    {this.state.search_list}
                </div>
            </React.Fragment>
        )

        return (
            <div className="container">
                {return_comp}
            </div>
        )
    }
}

export default SearchList