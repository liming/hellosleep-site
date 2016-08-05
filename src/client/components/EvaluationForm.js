/**
 * This is a form follow step by step.
 */
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Question from './Question';
import ResultTable from './ResultTable';

class EvaluationForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const formStyle = {
      minHeight: '20rem'
    };

    const { results } = this.props;

    return (
      <div className="ui segments">
        <div className="ui segment" style={formStyle}>
          <form className="ui form">
            {this.createQuestions()}
          </form>
          {results && <ResultTable results={results} />}
        </div>
          {this.createNavButtons()}
      </div>
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
    const { onNextStep, onPreviousStep, isLastStep, isFirstStep } = this.props;

    let prevClassName = 'ui left floated button';
    if (isFirstStep) prevClassName += ' disabled';

    const nextText = isLastStep ? '提交' : '下一个';

    return (
      <div className="ui clearing segment">
        <button type="button" className={prevClassName} onClick={onPreviousStep}>上一个</button>
        <button type="button" className="ui right floated button" onClick={onNextStep}>{nextText}</button>
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  onPreviousStep: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'answers',
  destroyOnUnmount: false
})(EvaluationForm);
