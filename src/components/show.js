import React, { Component } from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  onChange() {
    this.props.updatePost();
  }

  render() {
    if (!this.state.isEditing) {
      return (
        <div id="content">
          <div id="titlebar">
            <h2 id="heading"> {this.props.current.title} </h2>
            <div>
              <i id="edit" className="fa fa-pencil fa-2x" aria-hidden="true" onClick={this.onEdit}></i>
              <i id="delete" onClick={() => { this.props.deletePost(this.props.params.id); }} className="fa fa-trash-o fa-2x" aria-hidden="true"></i>
            </div>
          </div>
          <h5> tags: {this.props.current.tags} </h5>
          <div id="postcontent">{this.props.current.content}</div>
        </div>
      );
    } else {
      return (
        <div id="content">
          <div id="titlebar">
            <Textarea id="titletextarea" defaultValue={this.props.current.title} onChange={this.onChange} />
            <div id="icons">
              <i id="edit" className="fa fa-check fa-2x" aria-hidden="true" onClick={this.onEdit}></i>
              <i id="delete" onClick={() => { this.props.deletePost(this.props.params.id); }} className="fa fa-trash-o fa-2x" aria-hidden="true"></i>
            </div>
          </div>
          <div><Textarea id="textarea" defaultValue={this.props.current.tags} onChange={this.onChange} /></div>
          <Textarea id="textarea" defaultValue={this.props.current.content} onChange={this.onChange} />
        </div>
      );
    }
  }
}

/* onClick={this.props.deletePost(this.props.params.id)}*/

const mapStateToProps = (state) => (
  {
    current: state.posts.current,
  }
);

export default connect(mapStateToProps, actions)(Show);
