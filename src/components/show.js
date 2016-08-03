import React, { Component } from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: '',
      tags: '',
      content: '',
    };

    this.onEdit = this.onEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  onSubmit() {
    this.setState({ isEditing: !this.state.isEditing });
    const post = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
      id: this.props.params.id,
    };

    this.props.updatePost(post);
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
          <div id="postcontent" dangerouslySetInnerHTML={{ __html: marked(this.props.current.content || '') }} />
        </div>
      );
    } else {
      return (
        <div id="content">
          <div id="titlebar">
            <Textarea id="titletextarea" defaultValue={this.props.current.title} onChange={(event) => this.setState({ title: event.target.value })} />
            <div id="icons">
              <i id="edit" className="fa fa-check fa-2x" aria-hidden="true" onClick={this.onSubmit}></i>
              <i id="delete" onClick={() => { this.props.deletePost(this.props.params.id); }} className="fa fa-trash-o fa-2x" aria-hidden="true"></i>
            </div>
          </div>
          <div><Textarea id="textarea" defaultValue={this.props.current.tags} onChange={(event) => this.setState({ tags: event.target.value })} /></div>
          <Textarea id="textarea" defaultValue={this.props.current.content} onChange={(event) => this.setState({ content: event.target.value })} />
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
