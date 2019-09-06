import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setLocation} from '../actions/locationActions'
import {toggleSearch} from '../actions/searchActions'

class Nav extends Component{
    state = {
        content: ''
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.setLocation(this.state.content);
        this.props.toggleSearch(true);
    }

    handleChange = (e) =>{
        this.setState({
            content: e.target.value
        })
    }

    render(){
        return(
            <nav className="nav-wrapper #274C77">
                <div className="container">
                    <div className="brand-logo">hey there my dude</div>
                    <div className="right">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" id="location" placeholder='Location, eg. Toronto, CA' onChange={this.handleChange}/>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return state;
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setLocation: (loc) => {dispatch(setLocation(loc))},
        toggleSearch: (bool) => {dispatch(toggleSearch(bool))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)