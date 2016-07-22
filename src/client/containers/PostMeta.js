import React, { Component } from 'react';
import { connect } from 'react-redux';
import LikeButton from '../components/LikeButton';
import { likePost, fetchPostMeta } from '../actions/post';

class PostMeta extends Component {

  constructor(props) {
    super(props);

    this.onLikeChange = this.onLikeChange.bind(this);
  }

  onLikeChange(e) {
    const { dispatch, id } = this.props;

    e.preventDefault();

    dispatch(likePost(id));
  }

  render() {
    const { likes, invalid } = this.props;
    return (
      <div>
        <LikeButton
          count={parseInt(likes)}
          disabled={invalid}
          onClick={this.onLikeChange} />
        <span>
          <a href="/contribute">
            <i className="icon heart"></i>帮助睡吧
          </a>
        </span>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const postMeta = state.postMeta;
  return {
    id: postMeta.id,
    likes: postMeta.meta && postMeta.meta.likes ? postMeta.meta.likes : 0,
    invalid: postMeta.invalid
  };
};

export default connect(mapStateToProps)(PostMeta);
