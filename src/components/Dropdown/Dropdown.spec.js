import React from 'react'
import { mount } from 'enzyme'

import Dropdown from "./Dropdown"

describe('Dropdown', () => {
    it('should render a single select element', () => {
        const dropdown = mount(<Dropdown />)
        const select = dropdown.find('select');
        expect(select.length).toEqual(1);
    });
    it('should render a select option for each option in state', () => {
        const dropdown = mount(<Dropdown />)
        dropdown.setState({
            options: [
                { 
                    country_name: 'United Kingdom',
                    iso3_code: 'GBR'
                }
            ]
        })
        const options = dropdown.find('option');
        expect(options.length).toEqual(1)
        expect(options.getElement().type).toEqual('option')
        expect(options.text()).toEqual('United Kingdom')
    });
})