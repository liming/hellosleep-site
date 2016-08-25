import React, { Component } from 'react';
import { connect } from 'react-redux';

import EvaluationForm from '../components/EvaluationForm';
import ModalDialog from '../components/ModalDialog';

import { changeStep, fetchEvaluationData, submitEvaluation, showConfirmDialog, closeConfimDialog } from '../actions/evaluation';

class Evaluation extends Component {

  constructor(props) {
    super(props);

    this.onNextStep = this.onNextStep.bind(this);
    this.onPreviousStep = this.onPreviousStep.bind(this);
    this.onCloseConfirmDialog = this.onCloseConfirmDialog.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchEvaluationData());
  }

  onNextStep() {
    const { dispatch, isLastStep } = this.props;

    if (isLastStep) dispatch(showConfirmDialog());
    else dispatch(changeStep(true));
  }

  onPreviousStep() {
    const { dispatch } = this.props;
    dispatch(changeStep(false));
  }

  onCloseConfirmDialog() {
    const { dispatch } = this.props;
    dispatch(closeConfimDialog());
  }

  onSubmit() {
    const { dispatch } = this.props;
    dispatch(submitEvaluation());
  }

  render() {

    const { showConfirmDialog } = this.props;
    const eStyle = {
      marginTop: '10vh'
    };

    return (
      <div className="ui text container" style={eStyle}>
        {this.createConfirmDialog()}
        {this.createEvaluationForm()}
      </div>
    );
  }

  createEvaluationForm() {
    const { question, isLastStep, isFirstStep, results, initialValues, showConfirmDialog } = this.props;

    return (
      <div>
        <h1>
          睡眠评估
        </h1>
        <EvaluationForm
          onSubmit={this.onNextStep}
          onPreviousStep={this.onPreviousStep}
          question={question}
          isLastStep={isLastStep}
          isFirstStep={isFirstStep}
          results={results}
//          initialValues={initialValues}
        />
      </div>
    );
  }

  createConfirmDialog() {
    return (
      <ModalDialog
        title="完成评估"
        description="你想要提交自己的评估吗？"
        onCancel={this.onCloseConfirmDialog}
        isShow={this.props.showConfirmDialog}
        onSubmit={this.onSubmit}
      />
    );
  }
};

const mapStateToProps = (state) => {
  const v = state.evaluation;

  if (!v) return {};

  return {
    isLastStep: v.step === v.totalStep,
    isFirstStep: v.step === 1,
    question: v.question,
    results: v.results,
    initialValues: v.initialValues,
    showConfirmDialog: v.showConfirmDialog || false
  };
};

export default connect(mapStateToProps)(Evaluation);
