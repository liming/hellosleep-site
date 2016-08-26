/**
 * This is a form follow step by step.
 */
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Question from './Question';
import ResultTable from './ResultTable';
import { validate, asyncValidate, asyncBlurFields } from '../../data/validation';

class EvaluationForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const formStyle = {
      minHeight: '20rem'
    };

    const { results, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className="ui form">
        {this.createQuestions()}
        {results && <ResultTable results={results} />}
        {this.createNavButtons()}
      </form>
    );
  }

  createQuestions() {
    const { question } = this.props;
    const questions = question ? (question.constructor === Array ? question : [question]) : [];

    return questions.map((q, i) =>
      <Question
        key={i}
        question={q}
      />
    );
  }

  createNavButtons() {
    const { onPreviousStep, isLastStep, isFirstStep } = this.props;

    let prevClassName = 'ui left floated button';
    if (isFirstStep) prevClassName += ' disabled';

    const nextText = isLastStep ? '提交' : '下一个';

    return (
      <div className="ui basic segment">
        <button type="button" className={prevClassName} onClick={onPreviousStep}>上一个</button>
        <button type="submit" className="ui right floated button">{nextText}</button>
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  onPreviousStep: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'answers',
  destroyOnUnmount: false,
  validate,
  asyncValidate
})(EvaluationForm);
