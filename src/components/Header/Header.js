import React, { Component } from 'react';
import Dropdown from '../Dropdown/Dropdown';

import './Header.css';

class Header extends Component {
    render() {
      return (
        <header className="header">
            <h1 className="header__title">View on the environment</h1>
            <Dropdown handleChange={this.props.handleChange} />
        </header>
      )
    }
}


export default Header