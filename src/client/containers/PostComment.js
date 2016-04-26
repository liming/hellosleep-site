import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import { toggleSubmit } from '../actions/post';

class PostComment extends Component {

  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onToggleSubmit = this.onToggleSubmit.bind(this);
  }

  onFormSubmit() {
    const { dispatch, id } = this.props;
    dispatch(submitComment(id));
  }

  onToggleSubmit(checked) {
    console.log('-------- click is the checkbox checked? ', checked);
    const { dispatch } = this.props;
    dispatch(toggleSubmit(checked));
  }

  render() {
    return (
      <CommentForm
        enabledSubmit={this.props.enabledSubmit}
        onToggleSubmit={this.onToggleSubmit}
        onFormSubmit={this.onFormSubmit}/>
    );
  }
};

function mapStateToProps(state) {
  const postComment = state.postComment;
  return {
    id: postComment.id,
    enabledSubmit: postComment.enabledSubmit,
    commentIds: postComment.commentIds && postComment.commentIds ? postComment.commentIds : []
  };
};

export default connect(mapStateToProps)(PostComment);
