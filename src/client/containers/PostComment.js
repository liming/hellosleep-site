import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { fetchCommentsIfNeeded, toggleSubmit, submitComment } from '../actions/post';

class PostComment extends Component {

  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onToggleSubmit = this.onToggleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchCommentsIfNeeded(id));
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
    const { comments, enabledSubmit, errors } = this.props;

    return (
      <div>

        <h4>
          {comments.length}个回应
        </h4>

        <CommentList
          comments={comments}/>

        <CommentForm
          key={comments.length}
          enabledSubmit={enabledSubmit}
          onToggleSubmit={this.onToggleSubmit}
          errors={errors}
          onFormSubmit={this.onFormSubmit}/>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const postComment = state.postComment;
  return {
    id: postComment.id,
    enabledSubmit: postComment.enabledSubmit,
    comments: postComment.comments || [],
    errors: postComment.errors || {}
  };
};

export default connect(mapStateToProps)(PostComment);
