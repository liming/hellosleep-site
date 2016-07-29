import React, { Component } from 'react';
import { connect } from 'react-redux';

import EvaluationForm from '../components/EvaluationForm';

import { changeStep, fetchEvaluationData } from '../actions/evaluation';

class Evaluation extends Component {

  constructor(props) {
    super(props);

    this.onNextStep = this.onNextStep.bind(this);
    this.onPreviousStep = this.onPreviousStep.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchEvaluationData());
  }

  onNextStep() {
    const { dispatch } = this.props;
    dispatch(changeStep(true));
  }

  onPreviousStep() {
    const { dispatch } = this.props;
    dispatch(changeStep(false));
  }

  render() {

    const { question, isLastStep, isFirstStep } = this.props;
    const eStyle = {
      marginTop: '10vh'
    };

    return (
      <div className="ui text container" style={eStyle}>
        <h1>
          睡眠评估
        </h1>
        <EvaluationForm
          onNextStep={this.onNextStep}
          onPreviousStep={this.onPreviousStep}
          question={question}
          isLastStep={isLastStep}
          isFirstStep={isFirstStep}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const v = state.evaluation;

  if (!v) return {};

  return {
    isLastStep: v.step === v.totalStep,
    isFirstStep: v.step === 1,
    question: v.question
  };
};

export default connect(mapStateToProps)(Evaluation);
