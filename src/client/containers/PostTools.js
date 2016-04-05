const React = require('react');
const LikeButton = require('../components/LikeButton');

var PostTools = React.createClass({

  render() {
    return (
      <div>
        <LikeButton />
      </div>
    );
  }
});

module.exports = PostTools;
