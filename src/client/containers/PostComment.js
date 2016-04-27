import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import { toggleSubmit, submitComment } from '../actions/post';

class PostComment extends Component {

  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onToggleSubmit = this.onToggleSubmit.bind(this);
  }

  onFormSubmit(comment) {
    const { dispatch, id } = this.props;
    dispatch(submitComment(id, comment));
  }

  onToggleSubmit(checked) {
    const { dispatch } = this.props;
    dispatch(toggleSubmit(checked));
  }

  render() {
    return (
      <CommentForm
        enabledSubmit={this.props.enabledSubmit}
        onToggleSubmit={this.onToggleSubmit}
        errors={this.props.errors}
        onFormSubmit={this.onFormSubmit}/>
    );
  }
};

function mapStateToProps(state) {
  const postComment = state.postComment;
  return {
    id: postComment.id,
    enabledSubmit: postComment.enabledSubmit,
    commentIds: postComment.commentIds && postComment.commentIds ? postComment.commentIds : [],
    errors: postComment.errors || {}
  };
};

export default connect(mapStateToProps)(PostComment);
