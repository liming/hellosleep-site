import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReplyTo from './ReplyTo';

export default class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const author = document.getElementById('comment_author').value;
    const email = document.getElementById('comment_email').value;
    const content = document.getElementById('comment_content').value;

    let newComment = {author, email, content};

    if (this.props.reply) {
      newComment.replyTo = this.props.reply.id;
    }
    this.props.onFormSubmit(newComment);
  }

  render() {

    const { onToggleSubmit, onCancelReply, enabledSubmit, errors, reply, user } = this.props;
    let submitClass = 'btn btn-secondary';
    if (!enabledSubmit) submitClass += ' disabled';

    let contentString = '* 回复内容';
    let contentClass = 'form-group';
    if (errors.content) {
      contentString += ` ( ${errors.content} )`;
      contentClass += ' has-warning';
    }

    const replyElem = reply ? <div className="bg-info">回复{reply.author}</div> : null;

    return (
      <div id="comment-form" className="card">
        <div className="card-block">
          <div className="card-title">
            <h4>添加评论</h4>
          </div>
          <ReplyTo
            reply={reply}
            onCancelReply={onCancelReply}
          />
          <div className="card-text">
            <form>
              {this.getAuthorField(user, errors)}
              {this.getEmailField(user, errors)}

              <fieldset className={contentClass}>
                <label htmlFor="comment_content">{contentString}</label>
                <textarea className="form-control" id="comment_content" rows="3"></textarea>
              </fieldset>

              <div className="checkbox">
                <label>
                  <input
                    onChange={e => onToggleSubmit(e.target.checked)} type="checkbox" /> 我不是机器人
                </label>
              </div>

              <a onClick={this.onSubmit} className={submitClass}>提交</a>
            </form>
          </div>
        </div>
      </div>
    );
  }

  getAuthorField(user, errors) {
    if (user) return false;

    let authorString = '* 用户名';
    let authorClass = 'form-group';
    if (errors.author) {
      authorString += ` ( ${errors.author} )`;
      authorClass += ' has-warning';
    }

    return (
      <fieldset className={authorClass}>
        <label htmlFor="comment_author">{authorString}</label>
        <input type="text" className="form-control" id="comment_author" placeholder="输入名字" />
      </fieldset>
    );
  }

  getEmailField(user, errors) {
    if (user) return false;
    let emailString = '* 邮箱';
    let emailClass = 'form-group';
    if (errors.email) {
      emailString += ` ( ${errors.email} )`;
      emailClass += ' has-warning';
    }

    return (
      <fieldset className={emailClass}>
        <label htmlFor="comment_email">{emailString}</label>
        <input type="email" className="form-control" id="comment_email" placeholder="输入邮件地址" />
        <small className="text-muted">你的邮件地址不会显示。</small>
      </fieldset>
    );
  }
};

CommentForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onToggleSubmit: PropTypes.func.isRequired
};
