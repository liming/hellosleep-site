import React, { Component, PropTypes } from 'react';

export default class EvaluationForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { form } = this.props;
    const categories = form.data;

    return (
      {categories.map(category =>
        <Category
          {...category}
        />
      )}
    );
  }
};
