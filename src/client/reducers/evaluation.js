
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
      step: action.step,
      tracks: action.tracks
    });
  case NEXT_STEP:
  case PREVIOUS_STEP:
    return Object.assign({}, state, {
      step: action.step,
      question: action.question,
      tracks: action.tracks
    });
    break;
  default:
    break;
  }

  return newState;
}

export default evaluation;
