import React, { Component } from 'react';
import { Link } from 'react-router';

// example class based component (smart component)
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <nav>
        <Link to="/" id="navLink"><i className="fa fa-home fa-2x" aria-hidden="true"></i></Link>
        <Link to="posts/new" id="navLink"><i className="fa fa-plus fa-2x" aria-hidden="true"></i></Link>
      </nav>
    );
  }
}

export default NavBar;
