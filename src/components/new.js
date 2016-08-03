import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/index';
import { connect } from 'react-redux';


class New extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /* onSubmit={actions.createPost(`{ title: ${document.getElementById('title').value},
                                        tags: ${document.getElementById('tags').value},
                                        content: ${document.getElementById('content').value} }`)}*/

  onSubmit() {
    actions.createPost(`{ title: ${document.getElementById('title').value}, tags: ${document.getElementById('tags').value}, content: ${document.getElementById('content-form').value} }`);
  }

  render() {
    return (
      <div id="content">
        <h2>New Post</h2>
        <form>
          <input type="text" placeholder="title" id="title" />
          <input type="text" placeholder="tags" id="tags" />
          <input type="text" placeholder="content" id="content-form" />
          <div id="cancel-submit">
            <input id="submit" type="Submit" value="Submit" onClick={this.onSubmit} />
            <Link to="/" id="cancel">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {}
);

export default connect(mapStateToProps, actions)(New);
