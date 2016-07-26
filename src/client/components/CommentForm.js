import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReplyTo from './ReplyTo';

export default class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { user } = this.props;

    let author, email, content;

    if (!user) {
      author = document.getElementById('comment_author').value;
      email = document.getElementById('comment_email').value;
    }

    content = document.getElementById('comment_content').value;

    let newComment = user ? {content} : {author, email, content};

    if (this.props.reply) {
      newComment.replyTo = this.props.reply.id;
    }
    this.props.onFormSubmit(newComment);
  }

  render() {

    const { onToggleSubmit, onCancelReply, enabledSubmit, errors, reply, user } = this.props;
    let submitClass = 'ui button';
    if (!enabledSubmit) submitClass += ' disabled';

    let contentString = '* 回复内容';
    let contentClass = 'field';
    if (errors.content) {
      contentString += ` ( ${errors.content} )`;
      contentClass += ' error';
    }

    const replyElem = reply ? <div className="bg-info">回复{reply.author}</div> : null;

    return (
      <div id="comment-form" className="ui reply form">
        <h3 className="ui header">添加评论</h3>
        <div className="field">
          <ReplyTo
            reply={reply}
            onCancelReply={onCancelReply}
          />
        </div>

        {this.getAuthorField(user, errors)}
        {this.getEmailField(user, errors)}

        <div className={contentClass}>
          <label htmlFor="comment_content">{contentString}</label>
          <textarea id="comment_content" rows="3"></textarea>
        </div>

        <div className="inline field">
          <div className="ui checkbox">
            <input onChange={e => onToggleSubmit(e.target.checked)} type="checkbox" />
            <label>我不是机器人</label>
          </div>
        </div>

        <a onClick={this.onSubmit} className={submitClass}>提交</a>
      </div>
    );
  }

  getAuthorField(user, errors) {
    if (user) return false;

    let authorString = '* 用户名';
    let authorClass = 'field';
    if (errors.author) {
      authorString += ` ( ${errors.author} )`;
      authorClass += ' error';
    }

    return (
      <div className={authorClass}>
        <label htmlFor="comment_author">{authorString}</label>
        <input type="text" className="form-control" id="comment_author" placeholder="输入名字" />
      </div>
    );
  }

  getEmailField(user, errors) {
    if (user) return false;
    let emailString = '* 邮箱';
    let emailClass = 'field';
    if (errors.email) {
      emailString += ` ( ${errors.email} )`;
      emailClass += ' error';
    }

    return (
      <div className={emailClass}>
        <label htmlFor="comment_email">{emailString}</label>
        <input type="email" className="form-control" id="comment_email" placeholder="输入邮件地址" />
        <small className="text-muted">你的邮件地址不会显示。</small>
      </div>
    );
  }
};

CommentForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onToggleSubmit: PropTypes.func.isRequired
};
