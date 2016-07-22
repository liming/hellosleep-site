import React, { Component, PropTypes } from 'react';

class ReplyTo extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    this.props.onCancelReply();
  }

  render() {
    const { onCancelReply, reply } = this.props;

    if (!reply) return false;

    return (
      <div className="reply-to">
        <i className="icon reply"></i>回复给<span className="font-weight-bold">{reply.author}</span>
        <a className="cancel-reply" href="#" onClick={this.onClick}>取消</a>
      </div>
    );
  }
};

export default ReplyTo;
