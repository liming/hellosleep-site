import React, { Component } from 'react';
import { connect } from 'react-redux';

import EvaluationForm from '../components/EvaluationForm';

import { nextStep, previousStep } from '../actions/evaluation';

class Evaluation extends Component {

  constructor(props) {
    super(props);

    this.onNextStep = this.onNextStep.bind(this);
    this.onPreviousStep = this.onPreviousStep.bind(this);
  }

  onNextStep() {
    const { dispatch, isLastStep } = this.props;
    dispatch(nextStep());
  }

  onPreviousStep() {
    const { dispatch } = this.props;
    dispatch(previousStep());
  }

  render() {

    const { content, isLastStep, isFirstStep } = this.props;
    const question = this.getQuestion();

    return (
      <div className="ui container">
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

  // Get the question content from data
  getQuestion() {
    const { data } = this.props.content;
    const { categoryIndex, questionIndex } = this.getIndexes();

    // at first calculate the category and question
    const category = data[categoryIndex];

    // questions can be single page or spread into multiple pages
    const question = category.page == 'single' ? category.data : category.data[questionIndex];

    return question;
  }

  // get the indexes from current step and the question meta data
  getIndexes() {
    const { step, stepCounts } = this.props;

    // get question data
    let count = 0;
    let categoryIndex = 0;
    let questionIndex = 0;

    stepCounts.some((v, i) => {
      var prev = count;
      count += v;
      if (step <= count && step > prev) {
        categoryIndex = i;
        questionIndex = step - prev - 1;

        return true;
      }
    });

    return {categoryIndex, questionIndex};
  }
};

const mapStateToProps = (state) => {
  const v = state.evaluation;

  return {
    isLastStep: v.step === v.totalStep,
    isFirstStep: v.step === 1,
    step: v.step,
    stepCounts: v.stepCounts
  };
};

export default connect(mapStateToProps)(Evaluation);
