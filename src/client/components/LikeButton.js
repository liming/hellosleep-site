const React = require('react');

var LikeButton = React.createClass({

  onToggle() {
    
  },

  render() {
    return (
      <span className="like-button" onClick="{this.onToggle.bind(this)}">
        <a className="btn btn-link">
          <i className="fa fa-thumbs-up"></i>有用 <span className="badge">4</span>
        </a>
      </span>
    );
  }

});

module.exports = LikeButton;
