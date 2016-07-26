/**
 * This is a form follow step by step.
 */
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Question from './Question';

class EvaluationForm extends Component {
  constructor(props) {
    super(props);

    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.state = {
      step: 1
    };
  }

  nextStep() {
    this.setState({ step: this.state.step + 1 });
  }

  previousStep() {
    this.setState({ step: this.state.step - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { step } = this.state;
    const question = this.getQuestion();
    const questions = question.constructor === Array ? question : [question];

    return (
      <form className="ui form">
        {questions.map((q, i) =>
           <Question
             key={i}
             question={q}
             previousStep={step === 1 ? undefined : this.previousStep}
             onSubmit={this.isLastStep() ? onSubmit : this.nextStep}
           />
         )}
      </form>
    );
  }

  // Get the question content from data
  getQuestion() {
    const { data } = this.props;
    const { categoryIndex, questionIndex } = this.getIndexes();

    // at first calculate the category and question
    const category = data[categoryIndex];

    // questions can be single page or spread into multiple pages
    const question = category.page == 'single' ? category.data : category.data[questionIndex];

    return question;
  }

  isLastStep() {
    const { meta } = this.props;
    const { step } = this.state;

    return (step === meta.totalStep);
  }

  // get the indexes from current step and the question meta data
  getIndexes() {
    const { step } = this.state;
    const { meta } = this.props;

    const stepCounts = meta.stepCounts;

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
}

EvaluationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'evaluation'  // a unique identifier for this form
})(EvaluationForm);
