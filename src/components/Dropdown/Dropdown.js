import React, { Component } from 'react';

import getCountries from '../../service/dataCountries';

import './Dropdown.css';

class Dropdown extends Component {
    state = {
        options: []
    }

    componentDidMount() {
        this.setOptions();
    }
    
    render() {
        return (
            <select className='dropdown' onChange={this.props.handleChange}>
                <option value="" disabled selected hidden>Select a country</option>
            { 
                this.state.options.map((option) => 
                    <option value={ option.iso3_code }>
                        { option.country_name }
                    </option>
                ) 
            }
            </select>
        )
    }

    setOptions = () => getCountries()
        .then(json => json.data)
        .then(countries => this.setState({ options: countries }))
}

export default Dropdown;