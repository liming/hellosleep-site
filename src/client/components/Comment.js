import React, { Component, PropTypes } from 'react';

class Comment extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    const { id, onReply } = this.props;

    // scroll to the form
    const formElem = document.getElementById('comment-form');
    formElem.scrollIntoView();

    onReply(id);
  }

  render() {
    const { id, author, formatedDate, content, replyTo } = this.props;

    const titleAuthor = author + (replyTo ? ' 回复给 ' + replyTo.author : '');

    return (
      <div className="comment">
        <div className="content">

          <a className="author">{titleAuthor}</a>
          <div className="metadata">
            <span className="date">
              {formatedDate}
            </span>
          </div>

          <div className="text">
            {content}
          </div>

          <div className="actions">
            <a href="#" className="reply" onClick={this.onClick}>回应</a>
          </div>

        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  onReply: PropTypes.func.isRequired
}

export default Comment;
