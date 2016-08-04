import React, { Component } from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import '../style.scss';


class Home extends Component {
  constructor(props) {
    super(props);


    this.onReset = this.onReset.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  onReset() {
    this.props.posts.map((post) => {
      this.props.deletePost(post.id);
    });
  }

  // onReset() {
  //   function reset() {
  //     this.props.posts.map((post) => {
  //       this.props.deletePost(post.id);
  //       return null;
  //     });
  //   }
  //
  //   reset().then(location.reload());
  // }

  render() {
    return (
      <div id="content">
        <h2>Posts</h2>
        <ul>
        {this.props.posts.map((post) => {
          return <Link id="homelink" to={`/posts/${post.id}`} key={post.id}><li> <i id="posttitle">{post.title}</i><i>{post.tags}</i> </li></ Link>;
        })}
        </ul>
        <Link to="/" id="reset"><i className="fa fa-bomb fa" aria-hidden="true" onClick={this.onReset}> RESET BLOG</i></Link>
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
