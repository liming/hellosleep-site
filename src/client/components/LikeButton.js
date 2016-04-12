const React, { Component, PropTypes } = require('react');

export default class LikeButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { onClick, count } = this.props;

    return (
      <span className="like-button" onClick={onClick}>
        <a className="btn btn-link">
          <i className="fa fa-thumbs-up"></i>有用 <span className="badge">{count}</span>
        </a>
      </span>
    );
  }
};

LikeButton.propTypes = {
  count: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
