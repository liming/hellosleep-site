
import {
  NEXT_STEP,
  PREVIOUS_STEP,
  PREPARE_EVALUATION
} from '../actions/evaluation';

function evaluation(state, action) {
  let newState = Object.assign({}, state);

  switch(action.type) {
  case PREPARE_EVALUATION:
    return Object.assign({}, state, {
      totalStep: action.totalStep,
      stepCounts: action.stepCounts,
      content: action.content,
      question: action.question,
      step: action.step
    });
  case NEXT_STEP:
    return Object.assign({}, state, {
      step: action.step,
      question: action.question
    });
    break;
  case PREVIOUS_STEP:
    if (newState.step > 1) newState.step -= 1;
    break;
  default:
    break;
  }

  return newState;
}

export default evaluation;
