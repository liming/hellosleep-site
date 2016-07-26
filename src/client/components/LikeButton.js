import React, { Component, PropTypes } from 'react';

export default class LikeButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { onClick, count, disabled } = this.props;

    const btnCls = disabled ? 'disabled' : '';

    return (
      <span>
        <a href="#" className={btnCls} onClick={onClick}>
          <i className="icon thumbs up"></i>有用 {count}
        </a>
      </span>
    );
  }
};

LikeButton.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
