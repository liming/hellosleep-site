import React, { Component } from 'react';
import { connect } from 'react-redux';
import LikeButton from '../components/LikeButton';
import { likePost, fetchPostMeta } from '../actions/post';

class PostMeta extends Component {

  constructor(props) {
    super(props);

    this.onLikeChange = this.onLikeChange.bind(this);
  }

  onLikeChange() {
    const { dispatch, postId } = this.props;
    this.props.dispatch(likePost(postId));
  }

  render() {
    const { likes } = this.props;
    return (
      <div>
        <LikeButton
          count={parseInt(likes)}
          onClick={this.onLikeChange} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    meta: state.meta || { likeCount: 0 }
  };
};

export default connect(mapStateToProps)(PostMeta);
