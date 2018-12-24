import React, { Component } from 'react';

import getCountries from '../../service/dataCountries';

import './Dropdown.css';
import getRenewables from '../../service/dataRenewables';

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
        .then(data => {
            getRenewables()
                .then(json => json.data.map(
                    country => country.location
                ))
                .then(countries => countries.filter(
                    (v,i) => countries.indexOf(v) === i
                ))
                .then(unique => data.filter(
                    country => unique.includes(country.iso3_code)
                ))
                .then(output => output.sort((a, b) => 
                    (a.country_name > b.country_name) ? 1 : ((b.country_name > a.country_name) ? -1 : 0)
                ))
                .then(final => final.concat(
                    { iso3_code: 'WORLD', country_name: 'World' }
                ))
                .then(result => this.setState({ options: result }))
        })
}

export default Dropdown;