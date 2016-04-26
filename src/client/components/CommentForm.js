import React, { Component, PropTypes } from 'react';

export default class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
  }

  onSubmit() {
    const author = document.getElementById('comment_author').value;
    const email = document.getElementById('comment_email').value;
    const content = document.getElementById('comment_content').value;

    // TODO: validate email
    // var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // regex.test(email);
  }

  onToggle(e) {
    const { onToggleSubmit } = this.props;

    e.preventDefault();

    console.log(`e.target.checked ${e.target.checked}`);

    onToggleSubmit(e.target.checked);
  }

  render() {

    const { onFormSubmit, onToggleSubmit, enabledSubmit } = this.props;
    let submitClass = 'btn btn-secondary';
    if (!enabledSubmit) submitClass += ' disabled';

    return (
      <div className="card-block">
        <div className="card-title">
          <h4>添加评论</h4>
        </div>
        <div className="card-text">
          <form>
            <fieldset className="form-group">
              <label htmlFor="comment_author">名字</label>
              <input type="text" className="form-control" id="comment_author" placeholder="输入名字" />
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="comment_email">邮件地址</label>
              <input type="email" className="form-control" id="comment_email" placeholder="输入邮件地址" />
              <small className="text-muted">你的邮件地址不会显示。</small>
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="comment_content">回复内容</label>
              <textarea className="form-control" id="comment_content" rows="3"></textarea>
            </fieldset>

            <div className="checkbox">
              <label>
                <input
                  checked={enabledSubmit}
                  onChange={this.onToggle} type="checkbox" /> 我不是机器人
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
  onFormSubmit: PropTypes.func.isRequired
};
