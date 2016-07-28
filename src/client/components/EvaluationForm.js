/**
 * This is a form follow step by step.
 */
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Question from './Question';

class EvaluationForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="ui form">
        {this.createQuestions()}
        {this.createNavButtons()}
      </form>
    );
  }

  createQuestions() {
    const { question } = this.props;
    const questions = question.constructor === Array ? question : [question];

    return questions.map((q, i) =>
      <Question
        key={i}
        question={q}
      />
    );
  }

  createNavButtons() {
    const { onNextStep, onPreviousStep, isLastStep, isFirstStep } = this.props;

    let prevClassName = 'ui button';
    if (isFirstStep) prevClassName += ' disabled';

    const nextText = isLastStep ? '提交' : '下一个';

    return (
      <div>
        <button type="button" className={prevClassName} onClick={onPreviousStep}>上一个</button>
        <button type="button" className="ui button" onClick={onNextStep}>{nextText}</button>
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  onPreviousStep: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'evaluation',
  destroyOnUnmount: false
})(EvaluationForm);
