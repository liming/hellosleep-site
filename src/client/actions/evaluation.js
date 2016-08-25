import request from 'superagent';
import calculator from '../../data/calculation';

export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';
export const PREPARE_EVALUATION = 'PREPARE_EVALUATION';
export const SUBMIT_RESULT = "SUBMIT_RESULT";
export const SHOW_CONFIRM_DIALOG = "SHOW_CONFIRM_DIALOG";
export const CLOSE_CONFIRM_DIALOG = "CLOSE_CONFIRM_DIALOG";

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

function checkValid(data, depends, answers) {

  // no dependancy needed
  if (!depends || !answers) return true;

  // find out dependent category and question
  // const category = data.find(cat => cat.name === depends.category);
  // const question = category.data.find(q => q.name === depends.question);

  const result = answers.values[depends.question];

  // check the condition of answer and needed input
  if (result === depends.value) return true;

  return false;
}

// Get the question content from data
function getQuestion(evaluation, answers, inc) {

  const _tracks = evaluation.tracks || [];
  let tracks = _tracks.slice();

  function getStep(orig) {
    let step = orig;
    if (inc === true) step = orig + 1;
    if (inc === false) {
      tracks.pop();
      step = !tracks.length ? 1 : tracks[tracks.length - 1];
    }

    return step;
  }

  const data = evaluation.content.data,
        _step = getStep(evaluation.step),
        stepCounts = evaluation.stepCounts;

  let isValid = false,
      step = _step,
      question,
      category;

  while(!isValid) {
    const { categoryIndex, questionIndex } = getIndexes(step, stepCounts);

    // at first calculate the category and question
    category = data[categoryIndex];

    isValid = checkValid(data, category.depends, answers);

    if (!isValid) {
      inc && (step += stepCounts[categoryIndex]);
      !inc && (step = tracks.pop());
      continue;
    }

    // questions can be single page or spread into multiple pages
    question = category.page == 'single' ? category.data : category.data[questionIndex];

    if (category.page == 'single') {
      isValid = true;
      continue;
    };

    isValid = checkValid(data, question.depends, answers);
    if (!isValid) {
      step = getStep(step);
      continue;
    }
  }

  if (inc !== false) tracks.push(step);

  return {question, step, tracks};
}

/**
 * Get the finnal evaluation result
 */
function calcResult(content, values) {
  const tags = content.tags;
  let outTags = [];

  tags.forEach(tag => {
    const calc = tag.calc;
    let isValid = false;

    if (calc.question && calc.value === values[calc.question]) isValid = true;

    if (calc.func) {
      const args = calc.input.map(arg => values[arg]);
      isValid = calculator[calc.func].apply(this, args);
    }

    if (isValid) outTags.push({name: tag.name, text: tag.text});
  });

  return {tags: outTags};
}

export function changeStep(inc) {
  return (dispatch, getState) => {
    const {evaluation, form} = getState();

    const { step, question, tracks } = getQuestion(evaluation, form.answers, inc);

    dispatch({
      type: NEXT_STEP,
      step: step,
      tracks: tracks,
      question: question
    });
  };
}

export function previousStep() {
  return {
    type: PREVIOUS_STEP
  };
}

function prepareEvaluationData(content, initValues) {
  const { totalStep, stepCounts } = getEvaluationMeta(content);

  const evalData = {
    totalStep,
    stepCounts,
    content,
    step: 1
  };

  const {question, step, tracks} = getQuestion(evalData);

  return {
    totalStep,
    stepCounts,
    content,
    question,
    step,
    tracks,
    initValues,
    type: PREPARE_EVALUATION
  };
}

export function fetchEvaluationData() {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.evaluation.content) {
      // this might come from server side
      const content = require('../../data/evaluation.json');

      // this is for test
      // const initValues = require('../../../test/eva1.json');

      dispatch(prepareEvaluationData(content));
    }
  };
}

function submitResult(results) {
  return {
    results,
    type: SUBMIT_RESULT
  };
}

export function submitEvaluation() {
  return (dispatch, getState) => {
    const state = getState();
    const values = state.form.answers.values;

    const results = calcResult(state.evaluation.content, values);

    // going to save the result to server

    const data = {
      name: values.name,
      email: values.email,
      sex: values.sex,
      birthday: values.birthday,
      status: values.status,
      answers: values,
      tags: results.tags
    };

    return request
      .post('/api/evaluations')
      .send(data)
      .end((err, res) => {
        if (err) {
          // TODO: this is going to open modal dialog prompt the error and then
          // ask user submit again
          return console.error(err);
        }

        // redirect to evaluation page
        window.location.href = `/evaluation/${res.body.id}`;

        // this is for debugging the results
        // dispatch(submitResult(results));
      });
  };
}

export function showConfirmDialog() {
  return {
    type: SHOW_CONFIRM_DIALOG
  };
}

export function closeConfimDialog() {
  return {
    type: CLOSE_CONFIRM_DIALOG
  };
}
