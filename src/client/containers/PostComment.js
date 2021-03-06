import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import { fetchCommentsIfNeeded, toggleSubmit, submitComment, replyComment, cancelReply } from '../actions/post';

class PostComment extends Component {

  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onToggleSubmit = this.onToggleSubmit.bind(this);
    this.onReplyComment = this.onReplyComment.bind(this);
  }

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchCommentsIfNeeded(id));
  }

  onFormSubmit(comment) {
    const { dispatch, id, user } = this.props;
    dispatch(submitComment(id, comment, user));
  }

  onToggleSubmit(checked) {
    const { dispatch } = this.props;
    dispatch(toggleSubmit(checked));
  }

  onReplyComment(commentId) {
    const { dispatch } = this.props;

    dispatch(replyComment(commentId));
  }

  render() {
    const { dispatch, comments, enabledSubmit, errors, reply, user } = this.props;

    return (
      <div className="ui comments">
        <h2 className="ui dividing header">
          {comments.length}个回应
        </h2>

        {comments.map(comment =>
          <Comment
            key={comment.id}
            onReply={this.onReplyComment}
            {...comment}
           />
         )}

        <CommentForm
          key={comments.length}
          user={user}
          reply={reply}
          enabledSubmit={enabledSubmit}
          onToggleSubmit={this.onToggleSubmit}
          onCancelReply={() => dispatch(cancelReply())}
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
    errors: postComment.errors || {},
    reply: postComment.reply
  };
};

export default connect(mapStateToProps)(PostComment);
