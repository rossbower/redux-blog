import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const newpost = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
    };
    this.props.createPost(newpost);
  }

  render() {
    return (
      <div id="content">
        <h2>New Post</h2>
        <form>
          <input type="text" placeholder="title" id="title" onChange={(event) => this.setState({ title: event.target.value })} />
          <input type="text" placeholder="tags" id="tags" onChange={(event) => this.setState({ tags: event.target.value })} />
          <Textarea id="textarea" placeholder="content" onChange={(event) => this.setState({ content: event.target.value })} />
          <div id="cancel-submit">
            <input id="submit" type="submit" onClick={this.onSubmit} />
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
