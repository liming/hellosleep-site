import React, { Component, PropTypes } from 'react';
import Comment from './Comment';

export default class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments } = this.props;

    return (
      <div className="card-columns comments-list">
        {comments.map(comment =>
          <Comment
            key={comment.id}
            {...comment}
          />
         )}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    formatedDate: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
    }).isRequired).isRequired
};

