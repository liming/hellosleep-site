import React, { Component, PropTypes } from 'react';

export default class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const author = document.getElementById('comment_author').value;
    const email = document.getElementById('comment_email').value;
    const content = document.getElementById('comment_content').value;

    this.props.onFormSubmit({author, email, content});
  }

  render() {

    const { onToggleSubmit, enabledSubmit, errors } = this.props;
    let submitClass = 'btn btn-secondary';
    if (!enabledSubmit) submitClass += ' disabled';

    let authorString = '* 用户名';
    let authorClass = 'form-group';
    if (errors.author) {
      authorString += ` ( ${errors.author} )`;
      authorClass += ' has-warning';
    }

    let emailString = '* 邮箱';
    let emailClass = 'form-group';
    if (errors.email) {
      emailString += ` ( ${errors.email} )`;
      emailClass += ' has-warning';
    }

    let contentString = '* 回复内容';
    let contentClass = 'form-group';
    if (errors.content) {
      contentString += ` ( ${errors.content} )`;
      contentClass += ' has-warning';
    }

    return (
      <div className="card-block">
        <div className="card-title">
          <h4>添加评论</h4>
        </div>
        <div className="card-text">
          <form>
            <fieldset className={authorClass}>
              <label htmlFor="comment_author">{authorString}</label>
              <input type="text" className="form-control" id="comment_author" placeholder="输入名字" />
            </fieldset>

            <fieldset className={emailClass}>
              <label htmlFor="comment_email">{emailString}</label>
              <input type="email" className="form-control" id="comment_email" placeholder="输入邮件地址" />
              <small className="text-muted">你的邮件地址不会显示。</small>
            </fieldset>

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
    );
  }
};

CommentForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onToggleSubmit: PropTypes.func.isRequired
};
