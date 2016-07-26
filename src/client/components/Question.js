import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.create()}
      </div>
    );
  }

  create() {
    return (<Field name="email" type="email" component="input" placeholder="Email"/>);
  }
};

export default reduxForm({
  form: 'question',
  destroyOnUnmount: false
})(Question);
