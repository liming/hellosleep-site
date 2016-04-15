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
    const { dispatch, id } = this.props;
    this.props.dispatch(likePost(id));
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
    id: state.post.id,
    likes: state.post.meta && state.post.meta.likes ? state.post.meta.likes : 0
  };
};

export default connect(mapStateToProps)(PostMeta);
