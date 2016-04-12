import React, { Component } from 'react';
import LikeButton from '../components/LikeButton';

class PostTools extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // ready to fetch the post meta data
  }

  onLikeChange() {
    this.props.dispatch(clickChange());
  }

  render() {
    return (
      <div>
        <LikeButton
          count={count}
          onClick={this.onLikeChange} />
      </div>
    );
  }
};

module.exports = PostTools;
