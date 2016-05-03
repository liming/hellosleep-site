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
      <div className="card a-comment">
        <div className="card-block">

          <div className="card-title">
            <span className="m-r-1 font-weight-bold">{titleAuthor}</span>
            <span className="m-r-1 pull-xs-right text-muted">{formatedDate}</span>
          </div>

          <div className="card-text">
            {content}
          </div>

          <div className="comment-reply">
            <a href="#" onClick={this.onClick}>回应</a>
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
