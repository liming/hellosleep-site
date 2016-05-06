import React, { Component, PropTypes } from 'react';

export default class LikeButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { onClick, count, disabled } = this.props;

    const btnCls = disabled ? 'btn btn-default disabled' : 'btn btn-default';

    return (
      <span className="like-button">
        <a className={btnCls} onClick={onClick}>
          <i className="fa fa-thumbs-up"></i>有用 <span className="badge">{count}</span>
        </a>
      </span>
    );
  }
};

LikeButton.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
