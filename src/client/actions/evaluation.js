import request from 'superagent';

export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';
export const PREPARE_EVALUATION = 'PREPARE_EVALUATION';

function getEvaluationMeta(content) {

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

// get the indexes from current step and the question meta data
function getIndexes(step, stepCounts) {
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

// Get the question content from data
function getQuestion(data, step, stepCounts) {
  const { categoryIndex, questionIndex } = getIndexes(step, stepCounts);

  // at first calculate the category and question
  const category = data[categoryIndex];

  // questions can be single page or spread into multiple pages
  const question = category.page == 'single' ? category.data : category.data[questionIndex];

  return question;
}

export function changeStep(inc) {
  return (dispatch, getState) => {
    const evalData = getState().evaluation;
    const step = evalData.step + (inc ? 1 : -1);

    dispatch({
      type: NEXT_STEP,
      step: step,
      question: getQuestion(evalData.content.data, step, evalData.stepCounts)
    });
  };
}

export function previousStep() {
  return {
    type: PREVIOUS_STEP
  };
}

function prepareEvaluationData(content) {
  const { totalStep, stepCounts } = getEvaluationMeta(content);

  const evalData = {
    totalStep,
    stepCounts,
    content,
    step: 1
  };

  const question = getQuestion(evalData.content.data, 1, stepCounts);

  return {
    totalStep,
    stepCounts,
    content,
    question,
    type: PREPARE_EVALUATION,
    step: 1
  };
}

export function fetchEvaluationData() {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.evaluation.content) {
      // this might come from server side
      const content = require('../../data/evaluation.json');

      dispatch(prepareEvaluationData(content));
    }
  };
}
