import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/index';
import { connect } from 'react-redux';


// example class based component (smart component)
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    if (this.props.auth) {
      return (
        <nav>
          <Link to="/" id="navLink"><i className="fa fa-home fa-2x" aria-hidden="true"></i></Link>
          <input id="signin" type="submit" value="Sign Out" onClick={(event) => this.props.signoutUser()} />
          <Link to="posts/new" id="navLink"><i className="fa fa-plus fa-2x" aria-hidden="true"></i></Link>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to="/" id="navLink"><i className="fa fa-home fa-2x" aria-hidden="true"></i></Link>
          <Link to="signin" id="signin">Sign In</Link>
          <Link to="posts/new" id="navLink"><i className="fa fa-plus fa-2x" aria-hidden="true"></i></Link>
        </nav>
      );
    }
  }
}

const mapStateToProps = (state) => (
  {
    auth: state.auth.authenticated,
  }
);

export default connect(mapStateToProps, actions)(NavBar);
