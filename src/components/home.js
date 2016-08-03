import React, { Component } from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import '../style.scss';


class Home extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  // mapDispatchToProps(dispatch) {
  // }

  render() {
    return (
      <div id="content">
        <h2 id="heading">Posts</h2>
        <ul>
        {this.props.posts.map((post) => {
          return <Link id="homelink" to={`/posts/${post.id}`} key={post.id}><li> <i id="posttitle">{post.title}</i><i>{post.tags}</i> </li></ Link>;
        })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, actions)(Home);
