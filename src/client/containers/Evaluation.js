import React, { Component } from 'react';
import { connect } from 'react-redux';

class Evaluation extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { form } = this.props;

    return (
      <div>
        <h1>
          睡眠评估
        </h1>
        <EvaluationForm form={form} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  const evaluation = state.evaluation;
  return {
    form: evaluation.form
  };
}

export default connect(mapStateToProps)(Evaluation);
