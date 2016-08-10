import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SignIn: true,
      name: '',
      email: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.SignIn) {
      this.props.signinUser({ email: this.state.email, password: this.state.password });
    } else {
      this.props.signupUser({ name: this.state.name, email: this.state.email, password: this.state.password });
    }
  }

  render() {
    if (this.state.SignIn) {
      return (
        <div id="content">
          <h2>Sign In!</h2>
          <input id="signup" type="submit" value="Don't have an account? Click here to sign up!" onClick={(event) => this.setState({ SignIn: false })} />
          <form>
            <input type="text" placeholder="Email" id="email" onChange={(event) => this.setState({ email: event.target.value })} />
            <input type="text" placeholder="Password" id="password" onChange={(event) => this.setState({ password: event.target.value })} />
            <div id="cancel-submit">
              <input id="submit" type="submit" value="Sign In" onClick={this.onSubmit} />
              <Link to="/" id="cancel">Cancel</Link>
            </div>
          </form>
        </div>
    );
    } else {
      return (
        <div id="content">
          <h2>Sign Up!</h2>
          <input id="signup" type="submit" value="Already have an account? Click here to sign in!" onClick={(event) => this.setState({ SignIn: true })} />
          <form>
            <input type="text" placeholder="Name" id="name" onChange={(event) => this.setState({ name: event.target.value })} />
            <input type="text" placeholder="Email" id="email" onChange={(event) => this.setState({ email: event.target.value })} />
            <input type="text" placeholder="Password" id="password" onChange={(event) => this.setState({ password: event.target.value })} />
            <div id="cancel-submit">
              <input id="submit" type="submit" value="Sign Up" onClick={this.onSubmit} />
              <Link to="/" id="cancel">Cancel</Link>
            </div>
          </form>
        </div>
    );
    }
  }
}

const mapStateToProps = (state) => (
  {}
);

export default connect(mapStateToProps, actions)(SignIn);
