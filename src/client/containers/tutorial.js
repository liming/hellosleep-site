'use strict';

import React from 'react';

var TutorialPage = React.createClass({

  getInitialState() {
    return {
      categories: {}
    };
  },

  componentWillMount() {
  },

  loadCategories() {
  },

  render() {
    return (
        <div>
        Test Tutorial page1
      {JSON.stringify(this.state.categories)}
      </div>
    );
  }
});

module.exports = TutorialPage;

