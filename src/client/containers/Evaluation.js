import React, { Component } from 'react';
import { connect } from 'react-redux';

import EvaluationForm from '../components/EvaluationForm';

class Evaluation extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log('--- submit evaluation form');
  }

  render() {

    const { content } = this.props;
    const meta = this.getMeta();

    return (
      <div className="ui container">
        <h1>
          睡眠评估
        </h1>
        <EvaluationForm
          data={content.data}
          meta={meta}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }

  getMeta() {
    const { content } = this.props;

    let totalStep = 0, stepCounts = [];
    content.data.forEach((v, i) => {
      if (v.page == 'single') {
        totalStep += 1;
        stepCounts.push(1);
      }
      else {
        totalStep += v.data.length;
        stepCounts.push(v.data.length);
      }
    });

    return {
      totalStep, stepCounts
    };
  }
};

export default Evaluation;
